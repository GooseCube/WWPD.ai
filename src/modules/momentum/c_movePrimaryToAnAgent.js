import { generateSlideImage } from "./e_generateSlideImage";
import { moveAgent } from "./speechModules/helperFunctions";

/**
 * Use current agent { x, y } position to navigate the
 * primary agent to a valid offset position relative to agent
 * @param {object} agent
 * @param {object} speech
 * @param {context useState} setAgents
 */
export const movePrimaryAgentAndTalk = async (agent, speech, setAgents) => {
  // Offset for primary agent when sharing idea with 'agent'
  const MAX_OFFSET = 3;
  try {
    await moveAgent(speech.primaryAgent, agent.x, agent.y, setAgents, MAX_OFFSET);

    /**
     * @ADAM
     * This is were the primary agent could introduce themselves to the 'agent'
     * and relay paraphrased idea
     */

    await generateSlideImage(speech.paraphrasedInitialIdea, speech);
  } catch (error) {
    throw new Error(
      `Failed to move primary agent or fetch general discussion ${error.message}`
    );
  }
};
