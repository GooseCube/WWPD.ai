// Firebase
import { updateAgent } from "../../firebase/firebaseAgents";

// AI Model API
import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";

// Local Module Helper Functions
import {
  moveAgent,
  getRandomAudiencePosition,
  getRandomEmoji,
  faceDirectionOfOtherAgent,
  delay,
} from "./speechModules/helperFunctions";
import { agentDiscussionPrompt } from "./speechModules/promptTemplates";

/**
 * Very explicit and delicate function that handles:
 * - Primary agent traversing to 'agent' offset position,
 *    sharing moment idea
 * - Agent, responds to the primary agents idea
 * - IFF the audience pre-selected positions are available
 *    'agent' will traverse to a position to enjoy the speech
 * @param {object} agent
 * @param {object} speech
 * @param {context useState} setAgents
 * @param {string} aiModel
 * @param {object} speechLocation
 */
export const generateAgentResponses = async (
  agent,
  speech,
  setAgents,
  aiModel,
  speechLocation
) => {
  // Create the agents prompt template
  const agentPrompt = agentDiscussionPrompt(
    agent,
    speech.primaryAgent,
    speech.primaryAgentInitialIdea
  );

  // Fetch agent response to primaryAgent
  const agentResponse = await fetchModelResponse(aiModel, agentPrompt);

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

  await delay(3000);

  /**
   * speechLocation object is selected by the user and set in the /Sidebar component.
   * The number of valid { x, y } positions available for agents is randomly selected in /Sidebar.
   */
  if (speechLocation.audiencePositions.length > 0) {
    // Select an audience position for the agent
    let agentAudiencePosition = getRandomAudiencePosition(
      speechLocation.audiencePositions
    );

    // Find the selected audience position and remove it from the list
    speechLocation.audiencePositions = speechLocation.audiencePositions.filter(
      (position) =>
        position.x !== agentAudiencePosition.x &&
        position.y !== agentAudiencePosition.y
    );

    /**
     * Traverse the agent to the selected audience position { x, y }
     * and set Firebase DB && local context state
     */
    await moveAgent(
      agent,
      agentAudiencePosition.x,
      agentAudiencePosition.y,
      setAgents
    );

    // update agents facing direction and give final text emoji
    await updateAgent(
      {
        ...agent,
        // x: agentAudiencePosition.x,
        // y: agentAudiencePosition.y,
        direction: agentAudiencePosition.direction,
        momentResponse: getRandomEmoji() + getRandomEmoji(),
      },
      setAgents
    );
  } else {
    // update agents facing direction and give final text emoji
    await updateAgent(
      {
        ...agent,
        momentResponse: getRandomEmoji() + getRandomEmoji(),
      },
      setAgents
    );
  }
};
