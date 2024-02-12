import { agentPathfinder } from "../../agentMotion/agentPathfinder";
import { traverseAgentPath } from "../../agentMotion/traverseAgentPath";
import { meetingPlaces } from "../../mapGridPositions/meetingPlaces";
import { agentEmojis } from "../../emoji/emojis";

// Use to prevent the two agents showing discussion text at the same time
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Based on the position of two agents, turn to the direction facing
 * the observedAgent
 * @param {object} primaryAgent
 * @param {object} observedAgent
 * @returns one string direction {"right" || "left" || "up" || "down"}
 */
export const faceDirectionOfOtherAgent = (primaryAgent, observedAgent) => {
  let x = primaryAgent.x - observedAgent.x;
  let y = primaryAgent.y - observedAgent.y;

  if (x < -1) return "right";
  else if (x > 1) return "left";
  else if (x >= -1 && x <= 1 && y > -1) return "up";
  return "down";
};

/**
 * Using the imported meetingPlaces object, get a random meeting place
 * and invite agents to hear the speech
 * @returns a single meetingPlace containing:
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
 * Move agent from current position to the given {x, y} destination
 * @param {object} agent
 * @param {number} destX
 * @param {number} destY
 * @param {context setter} setAgents
 * @param {number} MAX_OFFSET is the length of the path[index - MAX_OFFSET]
 */
export const moveAgent = async (
  agent,
  destX,
  destY,
  setAgents,
  MAX_OFFSET = 0
) => {
  let path = await agentPathfinder(agent, destX, destY);
  let filteredPath = path.map((node) => node.state);
  await traverseAgentPath(agent, filteredPath, setAgents, MAX_OFFSET);
};

// Function to get a random emoji
export const getRandomEmoji = () => {
  const emojis = Object.values(agentEmojis).flat();
  return emojis[Math.floor(Math.random() * emojis.length)];
};

/**
 * After some given time, the agents will be sent to
 * their home locations {x, y}
 * @param {object} agents
 */
export const sendAllAgentsHome = async (agents, setAgents) => {
  agents.forEach(async (agent) => {
    const updatedAgent = {
      ...agent,
      momentResponse: null,
    };
    moveAgent(
      updatedAgent,
      agent.homePosition.x,
      agent.homePosition.y,
      setAgents
    );
  });
};
