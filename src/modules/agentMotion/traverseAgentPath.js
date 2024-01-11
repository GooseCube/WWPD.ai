import { handlePlayerMoveEvent } from "../../components/agents/modules/keyPressListener";
import { updateAgent } from "../../firebase/firebaseDB";

// Slows the movement from one position to the next
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Using the path obtained from agentPathfinder, moves the
 * agent from current position to final destination 
 * @param {object} agent, agent.x and agent.y
 * @param {number[{x: number, y:number}]} path 
 */
export async function traverseAgentPath(agent, path) {
  for (let index = 0; index < path.length; ++index) {
    let newFrame = (agent.frame + 1) % 3;
    await updateAgent({...agent, x: path[index].x, y: path[index].y, direction: path[index].direction, frame: newFrame});
    await delay(100);
  }
}