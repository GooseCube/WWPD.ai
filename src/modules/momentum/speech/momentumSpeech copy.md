```js
import { updateAgent } from "../../firebase/firebaseDB";
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

// Use to prevent the two agents showing discussion text at the same time
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
 * Using the imported meetingPlaces object, get a random meeting place
 * and invite agents to hear the speech
 * @returns a single meetingPlacde containing:
 * {primaryAgent: {x: number, y: number, direction: string},
 *  audiencePositions: [{x:number, y:number}, {...}, . . .]}
 */
const getRandomMeetingPlace = () => {
  return meetingPlaces[
    Object.keys(meetingPlaces)[
      Math.floor(Math.random() * Object.keys(meetingPlaces).length)
    ]
  ];
};

/**
 * Get a random audience location for agent to attend the speech
 * @param {array[{x: number, y: number, direction: string}]} audienceLocations
 * @returns one object audience location from the given audienceLocations array
 */
const getRandomAudiencePosition = (audienceLocations) => {
  return audienceLocations[
    Math.floor(Math.random() * audienceLocations.length)
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
 * @param {context setter} setAgents, setter for context passed from Sidebar
 */
export const momentumSpeech = async (agents, moment, aiModel, setAgents) => {
  // Get a random meeting location
  const speechLocation = getRandomMeetingPlace();
  // Set primaryAgent to the agent currently playercontrolled
  const primaryAgent = agents.find((agent) => agent.playerControlled === true);
  // const initialPrompt = initialMomentPrompt(primaryAgent, moment.initialPrompt);

  // hold inital idea, all agent discussions, and final phase speech
  const conversations = [];

  let primaryAgentInitialIdea =
    "I'm creating a play about pirates! Do you think you can help with this?";
  // let primaryAgentInitialIdea = "";

  // for (let index = 0; index < 3; ++index) {
  //   primaryAgentInitialIdea += await fetchModelResponse(
  //     aiModel,
  //     initialPrompt + primaryAgentInitialIdea
  //   );
  // }

  // Create a list of agents (except for primaryAgent)
  let agentList = agents.filter((agent) => agent.uid !== primaryAgent.uid);

  while (agentList.length > 0) {
    // Choose random agent from list and remove this agent so they are not
    // chosen again
    let agent = getRandomAgent(agentList);

    // Remove chosen agent from agentList
    agentList = agentList.filter((a) => a.uid !== agent.uid);

    // Get a path to the chosen designated meeting place
    // offset the meeting place so agents do not overlap
    let path = await agentPathfinder(primaryAgent, agent.x - 2, agent.y - 1);
    // Filters the path object to container only 'state'
    let simplifiedPath = path.map((node) => node.state);
    // Moves the agent using the filtered path array
    await traverseAgentPath(primaryAgent, simplifiedPath, setAgents);

    // ------------- Discussion Between Agents Begins -------------- //

    // Update primaryAgent's location
    primaryAgent.x = agent.x - 2;
    primaryAgent.y = agent.y - 1;
    primaryAgent.direction = "right";
    primaryAgent.momentResponse = `${agent.name} ${primaryAgentInitialIdea}`;
    let updatedPrimaryAgent = { ...primaryAgent };

    await setAgents((prevAgents) =>
      prevAgents.map((a) =>
        a.uid === updatedPrimaryAgent.uid ? updatedPrimaryAgent : a
      )
    );
    // Primary Agent will 'share' the idea
    await updateAgent(updatedPrimaryAgent);

    await delay(3000);
    // Remove after testing complete
    let agentTestingResponse =
      "Love the idea, I can get started on helping you with that.";
    // Set up prompt for agent using primary agents idea and agents persona
    // let agentResponsePrompt = agentDiscussionPrompt(
    //   primaryAgent,
    //   agent,
    //   primaryAgentInitialIdea
    // );

    await updateAgent({
      ...agent,
      direction: "left",
      momentResponse: agentTestingResponse,
    });
    await delay(3000);

    if (speechLocation.audiencePositions.length > 0) {
      let agentAudiencePosition = getRandomAudiencePosition(
        speechLocation.audiencePositions
      );

      speechLocation.audiencePositions =
        speechLocation.audiencePositions.filter(
          (position) =>
            position.x !== agentAudiencePosition.x &&
            position.y !== agentAudiencePosition.y
        );

      let agentPath = await agentPathfinder(
        agent,
        agentAudiencePosition.x,
        agentAudiencePosition.y
      );
      // Filters the path object to container only 'state'
      let agentSimplifiedPath = agentPath.map((node) => node.state);
      // Moves the agent using the filtered path array
      await traverseAgentPath(agent, agentSimplifiedPath, setAgents);

      agent.x = agentAudiencePosition.x;
      agent.y = agentAudiencePosition.y;
      agent.direction = agentAudiencePosition.direction;
      let updatedAgent = { ...agent };

      await setAgents((prevAgents) =>
        prevAgents.map((a) => (a.uid === updatedAgent.uid ? updatedAgent : a))
      );

      await updateAgent({ ...updatedAgent });
    }
  }

  // ------------- Final Speech by Primary Agent -------------- //

  let finalSpeech;
  // Prompt model for final speech
  // for (let index = 0; index < 4; ++index) {
  // finalSpeech += fetch();
  // }

  let finalSpeechPath = await agentPathfinder(
    primaryAgent,
    speechLocation.primaryAgent.x,
    speechLocation.primaryAgent.y
  );
  // Filters the path object to container only 'state'
  let finalSpeechSimplifiedPath = finalSpeechPath.map((node) => node.state);
  // Moves the agent using the filtered path array
  await traverseAgentPath(primaryAgent, finalSpeechSimplifiedPath, setAgents);

  // Update primaryAgent's location
  primaryAgent.x = speechLocation.primaryAgent.x;
  primaryAgent.y = speechLocation.primaryAgent.y;
  primaryAgent.direction = speechLocation.primaryAgent.direction;
  // primaryAgent.momentResponse = `${primaryAgentInitialIdea}`;
  let updatedPrimaryAgent = { ...primaryAgent };

  await setAgents((prevAgents) =>
    prevAgents.map((a) =>
      a.uid === updatedPrimaryAgent.uid ? updatedPrimaryAgent : a
    )
  );
  // Primary Agent will 'share' the idea
  await updateAgent(updatedPrimaryAgent);
};
```
