import { agentPathfinder } from "../../agentMotion/agentPathfinder";
import { traverseAgentPath } from "../../agentMotion/traverseAgentPath";
import { meetingPlaces } from "../../mapGridPositions/meetingPlaces";

// Primary Agent needs an idea to discuss with others, let's get it
export const initialMomentPrompt = (primaryAgent, initialPrompt) => {
  return `Persona: ${primaryAgent.name}, ${primaryAgent.age}, ${primaryAgent.career}. ${primaryAgent.personality}
   ${initialPrompt.instruction} ${initialPrompt.context} ${initialPrompt.question}`;
};

// Primary Agent is meeting with others, this is a great way to explain what you would like them to think about
// and get a constructive response
export const agentDiscussionPrompt = (primaryAgent, agent, initalIdea) => {
  return `Persona: ${agent.name}, ${agent.age}, ${agent.career}, ${agent.specialty}. ${agent.personality}
  Idea: ${initalIdea} Instruction: Give advice or help using your persona, the idea you will review and the context.
  Context: ${primaryAgent.name} has asked you to review an idea which may require you to think outside the box to help.
  You are happing to help and will give your advice or perform a task to help make the idea happen. Use those special skills.`;
};

// Use to prevent the two agents showing discussion text at the same time
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Choose a random agent from the array list and remove that
 * agent from the list.
 * @param {object array} agentList
 * @returns a single agent from the given list
 */
export const getRandomAgent = (agentList) => {
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
export const getRandomMeetingPlace = () => {
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
export const getRandomAudiencePosition = (audienceLocations) => {
  return audienceLocations[
    Math.floor(Math.random() * audienceLocations.length)
  ];
};

/**
 * Move agent to the given destionation {x, y} position
 * @param {object} agent
 * @param {number} destX
 * @param {number} destY
 * @param {context setter} setAgents
 */
export const moveAgent = async (agent, destX, destY, setAgents) => {
  let path = await agentPathfinder(agent, destX, destY);
  let filteredPath = path.map((node) => node.state);
  await traverseAgentPath(agent, filteredPath, setAgents);
};

/**
 * Creates a copy of the agents updated state
 * @param {object} agent 
 * @param {number} newX
 * @param {number} newY
 * @param {string} direction
 * @param {string} momentResponse
 * @returns copy of updated agent object
 */
export const createUpdatedAgent = (
  agent,
  newX,
  newY,
  direction,
  momentResponse
) => {
  agent.x = newX;
  agent.y = newY;
  agent.direction = direction;
  agent.momentResponse = momentResponse;
  return { ...agent };
};

/**
 * Set the agent global context state and update in Firebase
 * @param {context setter} setAgents
 * @param {firebase function} updateAgent
 * @param {object} agent
 */
export const updateAgentState = async (setAgents, updateAgent, agent) => {
  await setAgents((prevAgents) =>
    prevAgents.map((a) => (a.uid === agent.uid ? agent : a))
  );
  await updateAgent(agent);
};
