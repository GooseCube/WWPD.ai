import {
  getActionPrompt,
  getEmojiPrompt,
  getLocationPrompt,
} from "./modules/actions";
import { filterEmojiResponse } from "./modules/filterResponse";
import fetchModelResponse from "./fetchModelResponse";
import { meetingPlaces } from "../modules/mapGridPositions/meetingPlaces";

const DEBUG = import.meta.env.VITE_DEBUG;
const locationIndexMapping = {};
Object.keys(meetingPlaces).forEach((key, index) => {
  locationIndexMapping[index] = key;
});

/**
 *
 * @param {string} prompt
 * @param {dict} parameters
 * @param {string} id
 * @returns Promise that resolves to a dict with {location, id}
 */
const getInstruction = async (prompt, params, type, id) => {
  try {
    return await fetchModelResponse("Llama", prompt, {
      type: type,
      params,
    });
  } catch (err) {
    return {
      error: err,
    };
  }
};

export const getAgentActions = async (actions) => {
  return new Promise(async (resolve, reject) => {
    try {
      let agentActions = await Promise.all(
        actions.map(async (agent) => {
          //const { persona, worldState=[], uid } = agent;
          //const persona = agent.persona;
          const id = agent.uid; //temp
          const persona = agent; //temp

          const actionDescription = await getActionDescription(
            persona,
            worldState,
            actionLocation,
            id
          );
          return { agent, coordinate, actionDescription, emojis };
        })
      );
      resolve(agentActions);
    } catch (err) {
      reject(err);
    }
  });
};
