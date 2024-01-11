import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";

const initialMomentPrompt = (primaryAgent, initialPrompt) => {
  return `Persona: ${primaryAgent.name}, ${primaryAgent.age}, ${primaryAgent.career}. ${primaryAgent.personality}
   ${initialPrompt.instruction} ${initialPrompt.context} ${initialPrompt.question}`
}

/**
 * This function will play out the discussion of the primary agents moment.
 * Each agent asked to participate will have have an opportunity to give their
 * feedback and based on their persona they will provide help with the given moment.
 * The primary agent will finally use all feedback to create and deliver a speech.
 * @param {object} agents, all agent data
 * @param {object} moment, specific moment
 * @param {string} aiModel, name of the ai model to prompt
 */
export const momentumSpeech = async (agents, moment, aiModel) => {
  const primaryAgent = agents.find((agent) => agent.playerControlled === true);
  const initialPrompt = initialMomentPrompt(primaryAgent, moment.initialPrompt);

  let conversations = primaryAgent.name + ": ";

  let primaryAgentInitialIdea = await fetchModelResponse(
    aiModel,
    initialPrompt
  );

  for (let index = 0; index < 3; ++index) {
    primaryAgentInitialIdea += await fetchModelResponse(
      aiModel,
      initialPrompt + primaryAgentInitialIdea 
    )
  }

  console.log(initialPrompt, primaryAgentInitialIdea);
};
