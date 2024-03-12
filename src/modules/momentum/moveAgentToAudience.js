import { updateAgent } from "../../firebase/firebaseAgents";
import { agentEmojis } from "../emoji/emojis";

// Local Module Helper Functions
import {
  moveAgent,
  getRandomAudiencePosition,
  getRandomEmoji,
  faceDirectionOfOtherAgent,
} from "./speechModules/helperFunctions";

export const moveAgentToAudience = async (
  agent,
  speech,
  setAgents,
  speechLocation
) => {
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
    agent.momentResponse = agentEmojis.brainstorming.join("");
    // update agents facing direction and give final text emoji
    await updateAgent(
      {
        ...agent,
        direction: faceDirectionOfOtherAgent(agent, speech.primaryAgent),
      },
      setAgents
    );
  } else {
    // update agents facing direction and give final text emoji
    await updateAgent(
      {
        ...agent,
        direction: faceDirectionOfOtherAgent(agent, speech.primaryAgent),
      },
      setAgents
    );
  }
};
