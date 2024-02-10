import { getRandomAgent } from "./speechModules/helperFunctions";
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
  speech,
  setAgents,
  aiModel,
  speechLocation
) => {
  while (speech.agentList.length > 0) {
    // Hoist and initialize all local variables:
    let agentPrompt = ""; // prompt template: string
    let agentResponse = ""; // ai model response: string
    let emojis = ""; // string
    let goalX = -2; // primary agent offset for destination to an agent.x
    let goalY = -2; // primary agent offset for destination to an agent.y

    /**
     * Grab a random agent from the list:
     * - each moment should be different such that different agents may or may not attend the moment
     * - a specific agent will give the primary agent the { x, y } position goal to traverse
     */
    let agent = getRandomAgent(speech.agentList);
    speech.agentList = speech.agentList.filter((a) => a.uid !== agent.uid);

    /**
     * This will use the 'traverse' function to move the primary agent to the chosen agent
     * - An offset of any direction at this point may cause the primary agent to be located in
     *     a wall or other obstructed { x, y } position. This will cause the (teleport) issue
     * - Resolutions: implement a check for a valid position within { x: -2, y: -2 } of the goal
     *     IF found, then submit this new position as goal
     *     Else, try { x: current agent.x, y: -2 } or some other combination of possible positions
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

    speech.updatedPrimaryAgent = createUpdatedAgent(
      speech.primaryAgent,
      // agent.x - 1,
      // agent.y - 1,
      "right",
      `${agent.name}: ${speech.paraphrasedInitialIdea}`
    );

    // This will initiate the text for momentResponse for primaryAgent
    await updateAgentState(setAgents, updateAgent, speech.updatedPrimaryAgent);

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

      speechLocation.audiencePositions =
        speechLocation.audiencePositions.filter(
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
  }
};
