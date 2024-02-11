import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { initialMomentPrompt } from "./speechModules/promptTemplates";
import { paraphraseResponse } from "./speechModules/promptTemplates";

/**
 * Initialize the primary agent idea, and paraphrase
 * the idea
 * @param {object} speech
 * @param {string} aiModel
 * @param {object} moment
 */
export const initializePrimaryAgentIdea = async (speech, aiModel, moment) => {
  speech.primaryAgentInitialIdea = await fetchModelResponse(
    aiModel,
    initialMomentPrompt(speech.primaryAgent, moment.initialPrompt)
  );

  // for (let index = 0; index < 3; ++index) {
  //   speech.primaryAgentInitialIdea += await fetchModelResponse(
  //     aiModel,
  //     `${initialMomentPrompt(speech.primaryAgent, moment.initialPrompt)}
  //     ${speech.primaryAgentInitialIdea}`
  //   );
  // }

  speech.paraphrasedInitialIdea = await fetchModelResponse(
    aiModel,
    paraphraseResponse(speech.primaryAgentInitialIdea)
  );
};
