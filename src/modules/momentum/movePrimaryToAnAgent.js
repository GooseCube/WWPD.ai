import { findValidOffsetPosition } from "../mapGridPositions/gridCollisionDetection";
import { moveAgent } from "./speechModules/helperFunctions";

/**
 * Use current agent { x, y } position to navigate the
 * primary agent to a valid offset position relative to agent
 * @param {object} agent
 * @param {object} speech
 * @param {context useState} setAgents
 */
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

  findValidOffsetPosition(gridPoint, MAX_OFFSET);
  await moveAgent(speech.primaryAgent, gridPoint.x, gridPoint.y, setAgents);
};
