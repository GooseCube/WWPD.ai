import { updateAgent } from "../../firebase/firebaseAgents";
import {
  createBlankMoment,
  updateMoment,
  pushNewMoment,
} from "../../firebase/firebaseMoments";
import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { moveAgent, sendAllAgentsHome } from "./speechModules/helperFunctions";
import { finalMomentPrompt } from "./speechModules/promptTemplates";
import { getAgentActions } from "../../modelAPI/actionAPI";

// ------------------New Imports for Refactor-------------------------------
import { initializeAgents } from "./a_initializeAgents";
import { initializePrimaryAgentIdea } from "./b_initPrimaryAgentIdea";
import { generateAgentResponses } from "./d_generateAgentResponses";
import { movePrimaryAgentAndTalk } from "./c_movePrimaryToAnAgent";
import { generateSlideImage } from "./e_generateSlideImage";
import { moveAgentToAudience } from "./moveAgentToAudience";
import { disperseAgents } from "./actions";
import { getEmojiPrompt } from "./speechModules/promptTemplates";

/**
 * This function will play out the discussion of the primary agents moment.
 * Each agent asked to participate will have have an opportunity to give their
 * feedback and based on their persona they will provide help with the given moment.
 * The primary agent will finally use all feedback to create and deliver a speech.
 * @param {object} agents, all agent data
 * @param {object} moment, specific moment
 * @param {string} aiModel, name of the ai model to prompt
 * @param {context setter} setAgents, setter for context passed from Sidebar
 * @param {useState setter} setShowImageScreen
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
    primaryAgentGridLocations: [],
    // remove agentList and add:
    attendingAgents: [],
    notAttendingAgents: [],
    conversations: [],
    images: [],
  };

  /**
   * Sets the primaryAgent based on 'playerControlled'
   * Creates a randomized list of the agents rendered to game
   */
  initializeAgents(agents, speech);
  const newMomentRef = await createBlankMoment();

  /**
   * Fetch the initial idea based on user selected 'moment' and
   * fetch the paraphrase of the initial idea
   */
  try {
    await initializePrimaryAgentIdea(speech, aiModel, moment, setAgents);
  } catch (error) {
    console.error("Error Initializing Primary Agent Idea\n", error);
  }

  await disperseAgents(
    speech.notAttendingAgents,
    setAgents,
    speechLocation.title
  );

  await moveAgent(
    speech.primaryAgent,
    speechLocation.primaryAgent.x,
    speechLocation.primaryAgent.y,
    setAgents
  );

  try {
    await Promise.all(
      speech.attendingAgents.map(async (agent) => {
        await moveAgentToAudience(agent, speech, setAgents, speechLocation);
      })
    );
  } catch (error) {
    console.error(error);
  }

  /**
   * Conversation is used to track the entire conversation
   * which will be rendered to the message interface
   */
  speech.conversations.push({
    primaryAgent: speech.primaryAgent,
    initialPrompt: moment.initialPrompt,
    initialResponse: speech.primaryAgentInitialIdea,
    paraphrasedResponse: speech.paraphrasedInitialIdea,
  });
  await updateMoment(newMomentRef, speech);
  /**
   * @ADAM
   * Should be the only place that you will need to remove
   * agentList and replace with attendingAgents[]
   */
  try {
    await Promise.all(
      speech.attendingAgents.map(async (agent) => {
        await generateAgentResponses(
          agent,
          speech,
          setAgents,
          aiModel,
          speechLocation
        );
        await updateMoment(newMomentRef, speech);
      })
    );
  } catch (error) {
    console.error(error);
  }

  // @prompt: Get final speech from AI Model
  speech.primaryAgentFinalSpeech = await fetchModelResponse(
    aiModel,
    finalMomentPrompt(
      speech.primaryAgent,
      moment.finalPrompt,
      speech.primaryAgentInitialIdea
    )
  );

  for (let index = 0; index < 5; ++index) {
    speech.primaryAgentFinalSpeech += await fetchModelResponse(
      aiModel,
      `${finalMomentPrompt(
        speech.primaryAgent,
        moment.finalPrompt,
        speech.primaryAgentInitialIdea
      )} ${speech.primaryAgentFinalSpeech}`
    );
  }

  speech.conversations.push({ finalSpeech: speech.primaryAgentFinalSpeech });

  await updateMoment(newMomentRef, speech, false);
  setShowImageScreen(true);

  speech.primaryAgent.x = speechLocation.primaryAgent.x;
  speech.primaryAgent.y = speechLocation.primaryAgent.y;
  speech.primaryAgent.direction = speechLocation.primaryAgent.direction;
  const emojiPrompt = getEmojiPrompt(speech.primaryAgentFinalSpeech);
  const responseEmojis = await fetchModelResponse("Lllama", emojiPrompt, {
    type: "chat",
    params: "emojis",
  });
  speech.primaryAgent.momentResponse = responseEmojis;

  await updateAgent({ ...speech.primaryAgent }, setAgents);

  await generateSlideImage(speech.primaryAgentFinalSpeech, speech);

  // After the set time (60000 === 60 seconds || 1 minute)
  // send all agents to home position and clear their local
  // momentResponses to ensure no further text during game
  setTimeout(async () => {
    setShowImageScreen(false);
    /**
     * @ADAM
     * Need to add a check to sendAllAgentsHome that are
     * either primaryAgent === true || part of the attendingAgents List
     * This way, 'nonAttendingAgents' can continue their actions until
     * completed.
     */
    await disperseAgents(
      [
        ...speech.attendingAgents,
        ...speech.notAttendingAgents,
        speech.primaryAgent,
      ],
      setAgents
    );
  }, 60000);
};
