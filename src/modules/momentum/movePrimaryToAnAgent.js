import { moveAgent } from "./speechModules/helperFunctions";
import { faceDirectionOfOtherAgent } from "./speechModules/helperFunctions";
import { updateAgent } from "../../firebase/firebaseAgents";

export const movePrimaryAgentToAgentLocation = async (
  agent,
  speech,
  setAgents,
  MAX_OFFSET = 2
) => {
  // const destX = agent.x - MAX_OFFSET;
  // const destY = agent.y - MAX_OFFSET;
  const destX = agent.x;
  const destY = agent.y;

  await moveAgent(speech.primaryAgent, destX, destY, setAgents);
  speech.primaryAgent.x = destX;
  speech.primaryAgent.y = destY;

  /**
   * Update local context and firebase db for primary agent
   * to initiate the paraphrased message in primary agent text bubble.
   */
  // await updateAgent(
  //   {
  //     ...speech.primaryAgent,
  //     // x: destX,
  //     // y: destY,
  //     direction: faceDirectionOfOtherAgent(speech.primaryAgent, agent),
  //     // momentResponse: speech.paraphrasedInitialIdea,
  //   },
  //   setAgents
  // );

  // speech.primaryAgent.x = destX;
  // speech.primaryAgent.y = destY;
};

/**
 * SHIT THAT DOES NOT WORK
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
