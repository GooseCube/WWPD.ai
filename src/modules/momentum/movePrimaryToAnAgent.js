import { findValidOffsetPosition } from "../mapGridPositions/gridCollisionDetection";
import { moveAgent } from "./speechModules/helperFunctions";

export const movePrimaryAgentToAgentLocation = async (
  agent,
  speech,
  setAgents
) => {
  const MAX_OFFSET = 2;
  const gridPoint = {
    x: agent.x,
    y: agent.y,
  };

  findValidOffsetPosition(gridPoint, MAX_OFFSET)
  // console.log("Agent x, y: ", "{", agent.x, ", ", agent.y, "}")
  // console.log("gridPoints x, y: ", "{", gridPoint.x, ", ", gridPoint.y, "}")

  await moveAgent(speech.primaryAgent, gridPoint.x, gridPoint.y, setAgents);
};
