/**
 * Set up the primary agent and agent list which will be used for
 * the remainder of the moment.
 * Get the initial idea from ai model and a generalized statement
 * for the idea.
 */

import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { initialMomentPrompt } from "./speechModules/promptTemplates";
import { paraphraseResponse } from "./speechModules/promptTemplates";

export const momentPartOne = async (speech, aiModel, moment) => {
  speech.primaryAgentInitialIdea = await fetchModelResponse(
    aiModel,
    initialMomentPrompt(speech.primaryAgent, moment.initialPrompt)
  );

  for (let index = 0; index < 3; ++index) {
    speech.primaryAgentInitialIdea += await fetchModelResponse(
      aiModel,
      `${initialMomentPrompt(speech.primaryAgent, moment.initialPrompt)}
      ${speech.primaryAgentInitialIdea}`
    );
  }

  speech.paraphrasedInitialIdea = await fetchModelResponse(
    aiModel,
    paraphraseResponse(speech.primaryAgentInitialIdea)
  );


  // Push all primary agents initial moment set up from AI Model
  speech.conversations.push({
    primaryAgent: speech.primaryAgent,
    initialPrompt: moment.initialPrompt,
    initialResponse: speech.primaryAgentInitialIdea,
    paraphrasedResponse: speech.paraphrasedInitialIdea,
  });
};
