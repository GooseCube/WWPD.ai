// Firebase
import { updateAgent } from "../../firebase/firebaseAgents";

// AI Model API
import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { generateSlideImage } from "./e_generateSlideImage";

// Local Module Helper Functions
import {
  moveAgent,
  getRandomAudiencePosition,
  getRandomEmoji,
  faceDirectionOfOtherAgent,
} from "./speechModules/helperFunctions";
import {
  agentDiscussionPrompt,
  getEmojiPrompt,
  paraphraseResponse,
} from "./speechModules/promptTemplates";

/**
 * Very explicit and delicate function that handles:
 * - Primary agent traversing to 'agent' offset position,
 *    sharing moment idea
 * - Agent, responds to the primary agents idea
 * - IFF the audience pre-selected positions are available
 *    'agent' will traverse to a position to enjoy the speech
 * @param {object} agent
 * @param {object} speech
 * @param {context useState} setAgents
 * @param {string} aiModel
 * @param {object} speechLocation
 */
export const generateAgentResponses = async (
  agent,
  speech,
  setAgents,
  aiModel,
  speechLocation,
  initialPrompt
) => {
  // Create the agents prompt template
  const agentPrompt = agentDiscussionPrompt(
    agent,
    speech.primaryAgent,
    speech.primaryAgentInitialIdea,
    initialPrompt
  );

  try {
    // Fetch agent response to primaryAgent (use the SDK completion fetch)
    let agentResponse = await fetchModelResponse(aiModel, agentPrompt);

    for (let index = 0; index < 2; ++index) {
      const additionalResponse = await fetchModelResponse(
        aiModel,
        "Continue the idea below as if you were the original, creative author in the first person. Pretend that this is real life and you are not an assistant: \n" +
          agentPrompt +
          "\n" +
          agentResponse
      );
      const trimmedResponse = additionalResponse.trim().toLowerCase();
      if (trimmedResponse && trimmedResponse.startsWith("confidence:")) {
        break;
      }
      agentResponse = agentResponse.trimEnd();
      agentResponse += additionalResponse;
    }

    const paraphrasePrompt = paraphraseResponse(agentResponse);
    const paraphrase = await fetchModelResponse(aiModel, paraphrasePrompt);
    speech.paraphrasedConversations.push(paraphrase);

    /**
     * Add the new information with agent and response to the ongoing
     * conversation
     */
    // speech.conversations.push({
    //   agent: agent,
    //   agentPrompt: agentPrompt,
    //   agentResponse: agentResponse,
    // });

    const image = await generateSlideImage(paraphrase, speech, true);
    const emojiPrompt = getEmojiPrompt(paraphrase);
    const responseEmojis = await fetchModelResponse("Lllama", emojiPrompt, {
      type: "chat",
      params: "emojis",
    });
    // Push update for agent to initiate a response to primary agent in text bubble
    await updateAgent(
      {
        ...agent,
        momentResponse: responseEmojis,
      },
      setAgents
    );
    return { agent, agentPrompt, agentResponse, image };
  } catch (error) {
    throw new Error(`generate agent response error: ${error}`);
  }
};
