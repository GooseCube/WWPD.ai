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
  /**
   * @ADAM
   * Add a fetch to the model to be displayed using updateAgent({...speech.primary, momentResponse: response}, setAgents)
   * to show that the agent is having an initial idea. Do NOT await the updateAgent() for this to allow the next fetch
   * to occur while the emoji(s) or other text are being displayed. This will serve as a loading animation after
   * a user selects the 'moment' from the Sidebar.jsx
   */
  speech.primaryAgentInitialIdea = await fetchModelResponse(
    aiModel,
    initialMomentPrompt(speech.primaryAgent, moment.initialPrompt)
  );

  // This for loop can be removed when using the SDK ai model fetch for completion
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
