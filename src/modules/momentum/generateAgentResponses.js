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
  if (!validateGridCollision(agent.x - 2, agent.y - 2)) {
    const { newX, newY } = findValidDiscussionPosition(
      agent.x - 2,
      agent.y - 2
    );
    // NOTE: moveAgent() will 'updateAgent(updatedAgent, setAgents)'
    await moveAgent(speech.primaryAgent, newX, newY, setAgents);
  } else {
    // NOTE: moveAgent() will 'updateAgent(updatedAgent, setAgents)'
    await moveAgent(speech.primaryAgent, agent.x - 2, agent.y - 2, setAgents);
  }

  /**
   * Update primary agent facing direction to align with the agent
   * they are talking to about the moment idea. Then, pass the idea
   * to the primaryAgent which will automatically render the text to
   * primaryAgent text bubble.
   */
  const updatedPrimaryAgent = {
    ...speech.primaryAgent,
    direction: faceDirectionOfOtherAgent(speech.primaryAgent, agent),
    momentResponse: speech.paraphrasedInitialIdea,
  }

  /**
   * Update local context and firebase db for primary agent
   * to initiate the message in primary agent text bubble.
   */
  await updateAgent(updatedPrimaryAgent, setAgents)

  // @prompt: create the AI Model prompt template
  agentPrompt = agentDiscussionPrompt(
    speech.primaryAgent,
    agent,
    speech.primaryAgentInitialIdea
  );

  // @prompt fetch ai model response
  agentResponse = await fetchModelResponse(aiModel, agentPrompt);

  speech.conversations.push({
    agent: agent,
    agentPrompt: agentPrompt,
    agentResponse: agentResponse,
  });

  // Local state context is not updated here as agent does not move on {x, y}
  // This update initiates agent response in text bubble
  await updateAgent({
    ...agent,
    direction: "left",
    momentResponse: agentResponse,
  });

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
