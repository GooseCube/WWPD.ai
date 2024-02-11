import { moveAgent } from "./speechModules/helperFunctions";

/**
 * Use current agent { x, y } position to navigate the
 * primary agent to a valid offset position relative to agent
 * @param {object} agent
 * @param {object} speech
 * @param {context useState} setAgents
 */
export const movePrimaryAgentAndTalk = async (agent, speech, setAgents) => {
  await moveAgent(speech.primaryAgent, agent.x, agent.y, setAgents);

  /**
   * @ADAM
   * This is were the primary agent could introduce themselves to the 'agent'
   * and relay paraphrased idea
   */
};
