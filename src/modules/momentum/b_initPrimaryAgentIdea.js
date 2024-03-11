import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { initialMomentPrompt } from "./speechModules/promptTemplates";
import { paraphraseResponse } from "./speechModules/promptTemplates";
import { agentEmojis } from "../emoji/emojis";
import { updateAgent } from "../../firebase/firebaseAgents";

/**
 * Initialize the primary agent idea, and paraphrase
 * the idea
 * @param {object} speech
 * @param {string} aiModel
 * @param {object} moment
 */
export const initializePrimaryAgentIdea = async (
  speech,
  aiModel,
  moment,
  setAgents
) => {
  speech.primaryAgent.momentResponse = agentEmojis.brainstorming.join("");

  await updateAgent(
    {
      ...speech.primaryAgent,
    },
    setAgents
  );

  speech.primaryAgentInitialIdea = await fetchModelResponse(
    aiModel,
    initialMomentPrompt(speech.primaryAgent, moment.initialPrompt)
  );

  for (let index = 0; index < 2; ++index) {
    let idea = speech.primaryAgentInitialIdea;
    speech.primaryAgentInitialIdea = speech.primaryAgentInitialIdea?.trimEnd();
    speech.primaryAgentInitialIdea += await fetchModelResponse(
      aiModel,
      `Continue the idea below as if you were the original, creative author in the first person.. Pretend that this is real life and you are not an assistant: \n ${initialMomentPrompt(
        speech.primaryAgent,
        moment.initialPrompt
      )}
      ${idea}`
    );
  }

  speech.primaryAgent.momentResponse = agentEmojis.idea.join("");

  await updateAgent(
    {
      ...speech.primaryAgent,
    },
    setAgents
  );

  speech.paraphrasedInitialIdea = await fetchModelResponse(
    aiModel,
    paraphraseResponse(speech.primaryAgentInitialIdea)
  );

  // for (let index = 0; index < 3; ++index) {
  //   speech.paraphrasedInitialIdea += await fetchModelResponse(
  //     aiModel,
  //     `${paraphraseResponse(speech.primaryAgentInitialIdea)}
  //     ${speech.paraphrasedInitialIdea}`
  //   );
  // }
};
