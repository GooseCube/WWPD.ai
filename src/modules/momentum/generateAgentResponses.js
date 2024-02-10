import {
  faceDirectionOfOtherAgent,
  getRandomAgent,
} from "./speechModules/helperFunctions";
import { moveAgent } from "./speechModules/helperFunctions";
import { createUpdatedAgent } from "./speechModules/helperFunctions";
import { updateAgentState } from "./speechModules/helperFunctions";
import { agentDiscussionPrompt } from "./speechModules/promptTemplates";
import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { getRandomAudiencePosition } from "./speechModules/helperFunctions";
import { getRandomEmoji } from "./speechModules/helperFunctions";

// Firebase
import { updateAgent } from "../../firebase/firebaseAgents";
import {
  findValidDiscussionPosition,
  validateGridCollision,
} from "../mapGridPositions/gridCollisionDetection";

export const generateAgentResponses = async (
  agent,
  speech,
  setAgents,
  aiModel,
  speechLocation
) => {
  // Declare and initialize all local variables:
  const MAX_DISTANCE = 2; // distance between agents for discussion
  let agentPrompt = ""; // prompt template: string
  let agentResponse = ""; // ai model response: string
  let emojis = ""; // string

  /**
   * Checks if given offset is a valid position
   * - IFF valid { x, y } position then traverse primaryAgent to destination
   * - Else, call findValidDiscussionPosition() which evaluates all possible valid positions
   *    returning the first valid position
   *  NOTE: moveAgent() handles Firebase & Local Context Update for primaryAgent:
   *        'updateAgent(updatedAgent, setAgents)'
   */
  if (!validateGridCollision(agent.x - MAX_DISTANCE, agent.y - MAX_DISTANCE)) {
    const { newX, newY } = findValidDiscussionPosition(
      agent.x - MAX_DISTANCE,
      agent.y - MAX_DISTANCE
    );
    await moveAgent(speech.primaryAgent, newX, newY, setAgents);
  } else {
    await moveAgent(
      speech.primaryAgent,
      agent.x - MAX_DISTANCE,
      agent.y - MAX_DISTANCE,
      setAgents
    );
  }

  /**
   * Update local context and firebase db for primary agent
   * to initiate the paraphrased message in primary agent text bubble.
   */
  await updateAgent(
    {
      ...speech.primaryAgent,
      direction: faceDirectionOfOtherAgent(speech.primaryAgent, agent),
      momentResponse: speech.paraphrasedInitialIdea,
    },
    setAgents
  );

  /**
   * AgentDiscussionPrompt: Create the prompt template that the agent will use to
   * respond to the primary agent. Requires the primaryAgent info,
   * primaryAgents initial idea, and the agent info that will be
   * responding to primary agent.
   *
   * FetchModelResponse: Now, fetch the agents response to the primary agent using the created
   *   agent prompt template from above
   */
  agentResponse = await fetchModelResponse(
    aiModel,
    agentDiscussionPrompt(
      agent,
      speech.primaryAgent,
      speech.primaryAgentInitialIdea
    )
  );

  /**
   * Add the new information with agent and response to the ongoing
   * conversation
   */
  speech.conversations.push({
    agent: agent,
    agentPrompt: agentPrompt,
    agentResponse: agentResponse,
  });

  // Push update for agent to initiate a response to primary agent in text bubble
  await updateAgent(
    {
      ...agent,
      direction: faceDirectionOfOtherAgent(agent, speech.primaryAgent),
      momentResponse: agentResponse,
    },
    setAgents
  );

  /**
   * speechLocation object is created in the Sidebar component before calling momentumSpeech:
   * The audiencePosition object contains a randomly selected number of randomly selected valid
   * audience positions.
   */
  if (speechLocation.audiencePositions.length > 0) {
    let agentAudiencePosition = getRandomAudiencePosition(
      speechLocation.audiencePositions
    );

    speechLocation.audiencePositions = speechLocation.audiencePositions.filter(
      (position) =>
        position.x !== agentAudiencePosition.x &&
        position.y !== agentAudiencePosition.y
    );

    await moveAgent(
      agent,
      agentAudiencePosition.x,
      agentAudiencePosition.y,
      setAgents
    );

    emojis = getRandomEmoji() + getRandomEmoji();

    let updatedAgent = createUpdatedAgent(
      agent,
      agentAudiencePosition.x,
      agentAudiencePosition.y,
      agentAudiencePosition.direction,
      emojis
    );

    await updateAgentState(setAgents, updateAgent, updatedAgent);
  }
};
