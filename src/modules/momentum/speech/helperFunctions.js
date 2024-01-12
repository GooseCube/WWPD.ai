import { agentPathfinder } from "../../agentMotion/agentPathfinder";
import { traverseAgentPath } from "../../agentMotion/traverseAgentPath";
import { meetingPlaces } from "../../mapGridPositions/meetingPlaces";
import { agentEmojis } from "../../emoji/emojis";

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

// Function to get a random emoji
export const getRandomEmoji = () => {
  const emojis = Object.values(agentEmojis).flat();
  return emojis[Math.floor(Math.random() * emojis.length)];
};

/**
 * @TODO need to filter out agents that did not attent the speech
 * @TODO need to reduce the time between displaying the momentResponse
 * for emoji and the switch back to agent name in Agent/SpriteTextBubble
 * 
 * During a moment, the agents that are not giving the speech
 * should display some interaction with the speaker
 * @param {object} agents
 * @param {firebase function} updateAgent
 */
export const groupSpeechInteraction = (agents, updateAgent) => {
  const nonPlayerAgents = agents.filter((agent) => !agent.playerControlled);

  const intervalId = setInterval(() => {
    nonPlayerAgents.forEach(async (agent) => {
      const updatedAgent = {
        ...agent,
        momentResponse: getRandomEmoji() + getRandomEmoji(),
      };
      await updateAgent(updatedAgent);
      // setAgents(prevAgents => prevAgents.map(a => a.uid === agent.uid ? updatedAgent : a));
    });
  }, 1000);

  // Stop updating after one minute
  setTimeout(() => {
    clearInterval(intervalId);
  }, 60000);
};

/**
 * After some given time, the agents will be sent to
 * their home locations {x, y}
 * @param {object} agents
 */
export const sendAllAgentsHome = (agents, setAgents) => {
  agents.forEach(async (agent) => {
    moveAgent(agent, agent.homePosition.x, agent.homePosition.y, setAgents);
  });
};
