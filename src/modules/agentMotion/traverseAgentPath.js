import { updateAgent } from "../../firebase/firebaseAgents";
import { delay } from "../momentum/speechModules/helperFunctions";

/**
 * Using the path obtained from agentPathfinder, moves the
 * agent from current position to final destination
 * @param {object} agent
 * @param {number[{x: number, y:number}]} path, array of points from a -> b
 * @param {useState setter} setAgents, sets agent global state
 */
export async function traverseAgentPath(agent, path, setAgents) {
  const NUMBER_OF_SPRITE_COLUMNS = 3;
  let updatedAgent = { ...agent };

  for (let index = 0; index < path.length; ++index) {
    let newDirection = path[index].direction;
    let newFrame = (updatedAgent.frame + 1) % NUMBER_OF_SPRITE_COLUMNS;
    updatedAgent = {
      ...updatedAgent,
      x: path[index].x,
      y: path[index].y,
      direction: newDirection,
      frame: newFrame,
    };

    await updateAgent(updatedAgent, setAgents);
    // The 'await delay()' will slow down the agent to a normal speed
    await delay(30); // adjust up/down as needed for character movement
  }
    agent.x = updatedAgent.x;
    agent.y = updatedAgent.y;
    agent.direction = updatedAgent.direction;
    agent.frame = updatedAgent.frame;
}
