import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { agentPathfinder } from "../agentMotion/agentPathfinder";
import { traverseAgentPath } from "../agentMotion/traverseAgentPath";
import { meetingPlaces } from "../mapGridPositions/meetingPlaces";

// Primary Agent needs an idea to discuss with others, let's get it
const initialMomentPrompt = (primaryAgent, initialPrompt) => {
  return `Persona: ${primaryAgent.name}, ${primaryAgent.age}, ${primaryAgent.career}. ${primaryAgent.personality}
   ${initialPrompt.instruction} ${initialPrompt.context} ${initialPrompt.question}`;
};

// Primary Agent is meeting with others, this is a great way to explain what you would like them to think about
// and get a constructive response
const agentDiscussionPrompt = (primaryAgent, agent, initalIdea) => {
  return `Persona: ${agent.name}, ${agent.age}, ${agent.career}, ${agent.specialty}. ${agent.personality}
  Idea: ${initalIdea} Instruction: Give advice or help using your persona, the idea you will review and the context.
  Context: ${primaryAgent.name} has asked you to review an idea which may require you to think outside the box to help.
  You are happing to help and will give your advice or perform a task to help make the idea happen. Use those special skills.`;
};

/**
 * Choose a random agent from the array list and remove that
 * agent from the list.
 * @param {object array} agentList
 * @returns a single agent from the given list
 */
const getRandomAgent = (agentList) => {
  const randomIndex = Math.floor(Math.random() * agentList.length);
  const [selectedAgent] = agentList.splice(randomIndex, 1);
  return selectedAgent;
};

/**
 * Using the imported meetingPlaces object, get a randome meeting place
 * @returns a single meetingPlace: {x: number, y: number}
 */
const getRandomMeetingPlace = () => {
  return meetingPlaces[
    Object.keys(meetingPlaces)[
      Math.floor(Math.random() * Object.keys(meetingPlaces).length)
    ]
  ];
};

/**
 * This function will play out the discussion of the primary agents moment.
 * Each agent asked to participate will have have an opportunity to give their
 * feedback and based on their persona they will provide help with the given moment.
 * The primary agent will finally use all feedback to create and deliver a speech.
 * @param {object} agents, all agent data
 * @param {object} moment, specific moment
 * @param {string} aiModel, name of the ai model to prompt
 */
export const momentumSpeech = async (agents, moment, aiModel, setAgents) => {
  const primaryAgent = agents.find((agent) => agent.playerControlled === true);
  // const initialPrompt = initialMomentPrompt(primaryAgent, moment.initialPrompt);

  // hold inital idea, all agent discussions, and final phase speech
  const conversations = [];

  // let primaryAgentInitialIdea = await fetchModelResponse(
  //   aiModel,
  //   initialPrompt
  // );

  // for (let index = 0; index < 3; ++index) {
  //   primaryAgentInitialIdea += await fetchModelResponse(
  //     aiModel,
  //     initialPrompt + primaryAgentInitialIdea
  //   );
  // }

  // Create a list of agents (except for primaryAgent)
  let agentList = agents.filter((agent) => agent.uid !== primaryAgent.uid);
  let agent = getRandomAgent(agentList);
  let meetingLocation = getRandomMeetingPlace();

  // Get the path for agent to traverse
  let path = await agentPathfinder(agent, meetingLocation.x, meetingLocation.y)
  // Extract only the {x: number, y: number} from given array of data
  let simplifiedPath = path.map(node => node.state);
  await traverseAgentPath(agent, simplifiedPath, setAgents)


  /**
   *
   * complete the same steps for the primaryAgent, pathfinder and moveAgent(primaryAgent, path)
   *
   * Once both agents reach their destination:
   *    Destination verification - check that agent.x and agent.y === to the destination.x and destination.y for both
   *    1. create the prompt for the agent using agent persona + primaryAgentInitialIdea and wait for response from fetchModelResponse()
   *    2. updateAgent({...primaryAgent, moment: primaryAgentInitalIdea, converse: true}), which will initiate the primaryAgent to share idea in game
   *          then, another updateAgent({...primaryAgent, converse: false}) once the primaryAgent reaches the end of the primaryAgent.moment string.
   *    3. check if primaryAgent.converse === false, then updateAgent({...agent, moment: response, converse: true}) for the discussion replay to begin
   *    4. add the agent response to the conversations += reponse;
   *
   *    5. updateAgent({...agent, moment: `Goodbye, ${primaryAgent.name}`}) and similar for the primaryAgent
   *    6. get path for agent to go back to his/her home location using current agent.x & agent.y position and agent.homePosition.x & agent.homePosition.y as destionation for pathfinder
   *    7. give the path to moveAgent()
   *    8. check the agentList,
   *       if agentList has another agent to find and discuss the idea with then repeat the process
   *       else, move the final phase which breaks out of the discussion loop
   *
   *
   *  Final Phase:
   *    Initiate final prompt using: const finalSpeech = initialPrompt + primaryAgentInitialIdea + moment.finalPrompt.instruction + moment.finalPrompt.context
   *
   *    Choose a random place to give the speech, let finalLocation = randomSpace()
   *    For each agent, including the primaryAgent, use this finalLocation {x, y} + and - for each agent on their destionation {x , y} to spread them out
   *    and get them moving by using the moveAgent() function.
   *
   *    Once all agents have reached the location:
   *    updateAgent({...primaryAgent, moment: finalSpeech}), which initiates the primaryAgent speech bubble to begin giving the speech
   *    updateMoment(agent, conversation)
   *
   *    when primaryAgent is done, begin a random selection of each agent to send them back to their agent.homePosition
   *       using pathfinder and moveAgent() functions.
   */
};
