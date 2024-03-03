import { updateAgent } from "../../firebase/firebaseAgents";
import {
  createBlankMoment,
  updateMoment,
  pushNewMoment,
} from "../../firebase/firebaseMoments";
import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import {
  delay,
  moveAgent,
  sendAllAgentsHome,
} from "./speechModules/helperFunctions";
import { finalMomentPrompt, paraphraseResponse } from "./speechModules/promptTemplates";
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
    agentList: [],
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

  await Promise.all([
    moveAgent(
      speech.primaryAgent,
      speechLocation.primaryAgent.x,
      speechLocation.primaryAgent.y,
      setAgents
    ),
    Promise.all(
      speech.attendingAgents.map(async (agent) => {
        await moveAgentToAudience(agent, speech, setAgents, speechLocation);
      })
    ),
    disperseAgents(speech.notAttendingAgents, setAgents, speechLocation.title),
  ]);

  // try {
  //   await Promise.all(
  //     speech.attendingAgents.map(async (agent) => {
  //       await moveAgentToAudience(agent, speech, setAgents, speechLocation);
  //     })
  //   );
  // } catch (error) {
  //   console.error(error);
  // }

  /**
   * Fetch the initial idea based on user selected 'moment' and
   * fetch the paraphrase of the initial idea
   */
  try {
    await initializePrimaryAgentIdea(speech, aiModel, moment, setAgents);
  } catch (error) {
    console.error("Error Initializing Primary Agent Idea\n", error);
  }

  // await disperseAgents(
  //   speech.notAttendingAgents,
  //   setAgents,
  //   speechLocation.title
  // );

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
  const momentDetails = [];
  try {
    await Promise.all(
      speech.attendingAgents.map(async (agent) => {
        const momentDetail = await generateAgentResponses(
          agent,
          speech,
          setAgents,
          aiModel,
          speechLocation
        );
        const agentInfo = {
          agent: momentDetail.agent,
          agentPrompt: momentDetail.agentPrompt,
          agentResponse: momentDetail.agentResponse,
        };
        const { image } = momentDetail;

        momentDetails.push({ response: momentDetail, image });
      })
    );
  } catch (error) {
    console.error(error);
  }

  for (const detail of momentDetails) {
    speech.conversations.push(detail.response);
    speech.images.push(detail.image);
    await updateMoment(newMomentRef, speech);
    await delay(detail.response.agentResponse.length * 5);
  }

  // @prompt: Get final speech from AI Model
  let primaryAgentFinalSpeech = await fetchModelResponse(
    aiModel,
    finalMomentPrompt(
      speech.primaryAgent,
      moment.initialPrompt,
      speech.primaryAgentInitialIdea,
      speech.conversations
    )
  );

  for (let index = 0; index < 3; ++index) {
    primaryAgentFinalSpeech += await fetchModelResponse(
      aiModel,
      `${finalMomentPrompt(
        speech.primaryAgent,
        moment.initialPrompt,
        speech.primaryAgentInitialIdea,
        speech.conversations
      )} ${primaryAgentFinalSpeech}`
    );
  }

  let paraphrase = paraphraseResponse(primaryAgentFinalSpeech);
  paraphrase = await fetchModelResponse(aiModel, paraphrase);

  await generateSlideImage(paraphrase, speech);

  speech.conversations.push({ finalSpeech: primaryAgentFinalSpeech });

  await updateMoment(newMomentRef, speech);
  setShowImageScreen(true);

  speech.primaryAgent.x = speechLocation.primaryAgent.x;
  speech.primaryAgent.y = speechLocation.primaryAgent.y;
  speech.primaryAgent.direction = speechLocation.primaryAgent.direction;
  const emojiPrompt = getEmojiPrompt(primaryAgentFinalSpeech);
  const responseEmojis = await fetchModelResponse("Lllama", emojiPrompt, {
    type: "chat",
    params: "emojis",
  });
  speech.primaryAgent.momentResponse = responseEmojis;

  await updateAgent({ ...speech.primaryAgent }, setAgents);

  // After the set time (60000 === 60 seconds || 1 minute)
  // send all agents to home position and clear their local
  // momentResponses to ensure no further text during game
  setTimeout(async () => {
    await updateMoment(newMomentRef, speech, false);
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
