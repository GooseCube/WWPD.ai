import { updateAgent } from "../../firebase/firebaseAgents";
import { pushNewMoment } from "../../firebase/firebaseMoments";
import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { moveAgent, sendAllAgentsHome } from "./speechModules/helperFunctions";
import { finalMomentPrompt } from "./speechModules/promptTemplates";

// ------------------New Imports for Refactor-------------------------------
import { initializeAgents } from "./initializeAgents";
import { initializePrimaryAgentIdea } from "./initPrimaryAgentIdea";
import { generateAgentResponses } from "./generateAgentResponses";
import { movePrimaryAgentAndTalk } from "./movePrimaryToAnAgent";
import { findValidOffsetPosition } from "../mapGridPositions/gridCollisionDetection";

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
    agentList: [],
    conversations: [],
    images: [],
  };

  /**
   * Sets the primaryAgent based on 'playerControlled'
   * Creates a randomized list of the agents rendered to game
   */
  initializeAgents(agents, speech);

  /**
   * Fetch the initial idea based on user selected 'moment' and
   * fetch the paraphrase of the initial idea
   */
  try {
    await initializePrimaryAgentIdea(speech, aiModel, moment);
  } catch (error) {
    console.error("Error Initializing Primary Agent Idea\n", error);
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

  // For each agent current position, set an offset { x, y } for
  // the primary agent destination location
  // for (const agent of speech.agentList) {
  //   const MAX_OFFSET = 2;
  //   const gridPoint = {
  //     x: agent.x,
  //     y: agent.y,
  //   };
  //   console.log(
  //     "gridPoint Before Call: { ",
  //     gridPoint.x,
  //     ", ",
  //     gridPoint.y,
  //     " }"
  //   );
  //   findValidOffsetPosition(gridPoint, MAX_OFFSET);
  //   console.log(
  //     "gridPoint After Call: { ",
  //     gridPoint.x,
  //     ", ",
  //     gridPoint.y,
  //     " }"
  //   );
  //   speech.primaryAgentGridLocations.push({ x: gridPoint.x, y: gridPoint.y });
  // }

  /**
   * For each agent, traverse the primaryAgent to 'agent' position and share
   * paraphrased idea. Agent will then fetch an ai response
   */
  // for (
  //   let index = 0;
  //   speech.agentList &&
  //   speech.primaryAgentGridLocations &&
  //   index < speech.agentList.length &&
  //   index < speech.primaryAgentGridLocations.length;
  //   ++index
  // ) {
  for (const agent of speech.agentList) {
    try {
      await movePrimaryAgentAndTalk(agent, speech, setAgents);
      await generateAgentResponses(
        agent,
        speech,
        setAgents,
        aiModel,
        speechLocation
      );
    } catch (error) {
      console.error("Error while generating agent responses\n", error);
    }
  }

  /**
   * At this point the primary agent is at the { x, y } of the last agent to share their idea with.
   * Their properties should be updated correctly to Firebase and local context.
   * Next, set up and then deliver the final moment speech in front of those agents
   * lucky enough to have attended.
   * NOTE: Agents that are not attending could have other things to do during this time . . .
   */

  // @prompt: Get final speech from AI Model
  speech.primaryAgentFinalSpeech = await fetchModelResponse(
    aiModel,
    finalMomentPrompt(
      speech.primaryAgent,
      moment.finalPrompt,
      speech.primaryAgentInitialIdea
    )
  );

  const finalSpeech = {
    header: "---------- MOMENT: Final Speech ----------",
    speech: speech.primaryAgentFinalSpeech,
  };

  speech.conversations.push(finalSpeech);

  await moveAgent(
    speech.primaryAgent,
    speechLocation.primaryAgent.x,
    speechLocation.primaryAgent.y,
    setAgents
  );

  await pushNewMoment(speech);
  setShowImageScreen(true);

  speech.primaryAgent.x = speechLocation.primaryAgent.x;
  speech.primaryAgent.y = speechLocation.primaryAgent.y;
  speech.primaryAgent.direction = speechLocation.primaryAgent.direction;
  speech.primaryAgent.momentResponse = speech.primaryAgentFinalSpeech;

  await updateAgent({ ...speech.primaryAgent }, setAgents);

  // After the set time (30000 === 30 seconds)
  // send all agents to home position and clear their local
  // momentResponses to ensure no further text during game
  setTimeout(async () => {
    setShowImageScreen(false);
    await sendAllAgentsHome(agents, setAgents, updateAgent);

    agents.forEach(async (agent) => {
      updateAgent({ ...agent, momentResponse: null }, setAgents);
    });
  }, 30000);
};
