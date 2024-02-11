// Firebase
import { updateAgent } from "../../firebase/firebaseAgents";

// AI Model API
import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";

// Local Module Helper Functions
import {
  findValidDiscussionPosition,
  validateGridCollision,
} from "../mapGridPositions/gridCollisionDetection";
import {
  moveAgent,
  getRandomAudiencePosition,
  getRandomEmoji,
  faceDirectionOfOtherAgent,
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
  // Declare and initialize all local variables:
  const MAX_DISTANCE = 2; // distance between agents for discussion
  let agentPrompt = ""; // prompt template: string
  let agentResponse = ""; // ai model response: string

  /**
   * Checks if given offset is a valid position
   * - IFF valid { x, y } position then traverse primaryAgent to destination
   * - Else, call findValidDiscussionPosition() which evaluates all possible valid positions
   *    returning the first valid position
   *  NOTE: moveAgent() handles Firebase & Local Context Update for primaryAgent:
   *        'updateAgent(updatedAgent, setAgents)'
   */
  // if (validateGridCollision(agent.x - MAX_DISTANCE, agent.y - MAX_DISTANCE)) {
  //   await moveAgent(
  //     speech.primaryAgent,
  //     agent.x - MAX_DISTANCE,
  //     agent.y - MAX_DISTANCE,
  //     setAgents
  //   );
  // } else {
  //   // If the { x, y } position is NOT valid, try to find the first good location
  //   const { newX, newY } = findValidDiscussionPosition(
  //     agent.x - MAX_DISTANCE,
  //     agent.y - MAX_DISTANCE
  //   );
  //   console.log("newX: ", newX, "  and newY: ", newY)
  //   await moveAgent(speech.primaryAgent, newX, newY, setAgents);
  // }
  await moveAgent(
    speech.primaryAgent,
    agent.x - MAX_DISTANCE,
    agent.y - MAX_DISTANCE,
    setAgents
  );

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
  // TESTING: uncomment after testing motion
  // agentResponse = await fetchModelResponse(
  //   aiModel,
  //   agentDiscussionPrompt(
  //     agent,
  //     speech.primaryAgent,
  //     speech.primaryAgentInitialIdea
  //   )
  // );

  /**
   * Add the new information with agent and response to the ongoing
   * conversation
   */
  // TESTING: uncomment after testing motion
  // speech.conversations.push({
  //   agent: agent,
  //   agentPrompt: agentPrompt,
  //   agentResponse: agentResponse,
  // });

  // Push update for agent to initiate a response to primary agent in text bubble
  await updateAgent(
    {
      ...agent,
      direction: faceDirectionOfOtherAgent(agent, speech.primaryAgent),
      // momentResponse: agentResponse,
    },
    setAgents
  );

  // ---------- @todo If there is no wait time between updateAgent() and the if () statements --------------------
  //  then there is NOT enough time for the agent to display their response before moving to
  //  a designated position

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

    /**
     * Update the agents state to the correct direction to face based on { x, y }
     * Give final emoji to text bubble
     */
    await updateAgent(
      {
        ...agent,
        x: agentAudiencePosition.x,
        y: agentAudiencePosition.y,
        direction: agentAudiencePosition.direction,
        momentResponse: getRandomEmoji() + getRandomEmoji(),
      },
      setAgents
    );
  }
};
