import { updateAgent } from "../../firebase/firebaseAgents";
import { pushNewMoment } from "../../firebase/firebaseMoments";
import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import {
  getRandomAgent,
  getRandomAudiencePosition,
  moveAgent,
  createUpdatedAgent,
  updateAgentState,
  getRandomEmoji,
  sendAllAgentsHome,
} from "./speechModules/helperFunctions";
import {
  agentDiscussionPrompt,
  finalMomentPrompt,
} from "./speechModules/promptTemplates";

// ------------------New Imports for Refactor-------------------------------
import { initializeAgents } from "./initializeAgents";
import { initializePrimaryAgentIdea } from "./initPrimaryAgentIdea";
import { generateAgentResponses } from "./generateAgentResponses";

/**
 * This function will play out the discussion of the primary agents moment.
 * Each agent asked to participate will have have an opportunity to give their
 * feedback and based on their persona they will provide help with the given moment.
 * The primary agent will finally use all feedback to create and deliver a speech.
 * @param {object} agents, all agent data
 * @param {object} moment, specific moment
 * @param {string} aiModel, name of the ai model to prompt
 * @param {context setter} setAgents, setter for context passed from Sidebar
 */
export const momentumSpeech = async (
  agents,
  moment,
  aiModel,
  setAgents,
  speechLocation,
  setShowImageScreen
) => {
  let speech = {
    primaryAgentInitialIdea: "",
    primaryAgentFinalSpeech: "",
    paraphrasedInitialIdea: "",
    primaryAgent: {},
    updatedPrimaryAgent: {},
    agentList: [],
    conversations: [],
  };

  initializeAgents(agents, speech);

  await initializePrimaryAgentIdea(speech, aiModel, moment);

  // Push all primary agents initial moment set up from AI Model
  speech.conversations.push({
    primaryAgent: speech.primaryAgent,
    initialPrompt: moment.initialPrompt,
    initialResponse: speech.primaryAgentInitialIdea,
    paraphrasedResponse: speech.paraphrasedInitialIdea,
  });

  // ------------- Agents Begin Brainstorming with Primary Agent -------------- //

  await generateAgentResponses();

  // ------------- Final Speech by Primary Agent -------------- //

  updatedPrimaryAgent = createUpdatedAgent(
    primaryAgent,
    primaryAgent.x,
    primaryAgent.y,
    "down",
    getRandomEmoji()
  );

  await updateAgentState(setAgents, updateAgent, updatedPrimaryAgent);

  // @prompt: Get initial idea from AI Model
  primaryAgentFinalSpeech = await fetchModelResponse(
    aiModel,
    finalMomentPrompt(primaryAgent, moment.finalPrompt, primaryAgentInitialIdea)
  );

  // @prompt: fetch remaining context from AI Model
  for (let index = 0; index < 3; ++index) {
    primaryAgentFinalSpeech += await fetchModelResponse(
      aiModel,
      `${finalMomentPrompt(
        primaryAgent,
        moment.finalPrompt,
        primaryAgentInitialIdea
      )}
      ${primaryAgentFinalSpeech}`
    );
  }

  const finalSpeech = {
    header: "-------------- MOMENT --------------",
    speech: primaryAgentFinalSpeech,
  };

  conversations.push(finalSpeech);

  await moveAgent(
    primaryAgent,
    speechLocation.primaryAgent.x,
    speechLocation.primaryAgent.y,
    setAgents
  );

  setShowImageScreen(true);

  updatedPrimaryAgent = createUpdatedAgent(
    primaryAgent,
    speechLocation.primaryAgent.x,
    speechLocation.primaryAgent.y,
    speechLocation.primaryAgent.direction,
    primaryAgentFinalSpeech
  );

  updateAgentState(setAgents, updateAgent, updatedPrimaryAgent);
  pushNewMoment(conversations);

  setTimeout(() => {
    setShowImageScreen(false);
    sendAllAgentsHome(agents, setAgents, updateAgent);
  }, 6000); // wait 1-minute and send all agents to home positions
};
