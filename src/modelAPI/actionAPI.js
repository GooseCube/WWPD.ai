import {
  getActionPrompt,
  getEmojiPrompt,
  getLocationPrompt,
} from "./modules/actions";
import { filterEmojiResponse } from "./modules/filterResponse";
import fetchModelResponse from "./fetchModelResponse";

const accessToken = import.meta.env.VITE_HUGGINGFACE_API_TOKEN === "TRUE";

const DEBUG = import.meta.env.VITE_DEBUG;

const locationCoordinates = {
  0: {
    name: "the bedroom",
    x: 10,
    y: 5,
  },
  1: {
    name: "the restaurant",
    x: 24,
    y: 5,
  },
  2: {
    name: "work",
    x: 40,
    y: 30,
  },
  3: {
    name: "the kitchen",
    x: 20,
    y: 29,
  },
};

const model = "meta-llama/Llama-2-70b-chat-hf";

/**
 *
 * @param {string} prompt
 * @param {dict} parameters
 * @param {string} id
 * @returns Promise that resolves to a dict with {location, id}
 */
const getInstruction = async (prompt, params, id) => {
  try {
    return await fetchModelResponse(model, prompt, {
      type: "chat",
      params,
    });
  } catch (err) {
    return {
      error: err,
    };
  }
};

export const getLocation = async (params) => {
  let { persona, worldState, id } = params;
  return new Promise(async (resolve, reject) => {
    try {
      //temp for testing
      const locations = Object.values(locationCoordinates).map(
        (item) => item.name
      );
      const prompt = getLocationPrompt(persona, worldState, locations);
      const { text, error } = await getInstruction(prompt, "location", id);
      if (error) {
        reject(error);
      }
      const match = text.match(/\d+/);
      let locationNum = Math.floor(Math.random() * locations.length);
      //temporarily only use random numbers so agents move to different locations
      // if (match && match >= 0 && match < locations.length) {
      //   locationNum = parseInt(match[0], 10);
      // }
      resolve({ ...locationCoordinates[locationNum] });
    } catch (err) {
      reject(err);
    }
  });
};

export const getActionDescription = async (
  persona,
  worldState,
  location,
  id
) => {
  return new Promise(async (resolve, reject) => {
    try {
      //using location and known state, get description of agents action
      const actionPrompt = await getActionPrompt(
        persona,
        worldState,
        location.name
      );
      const { text, error } = await getInstruction(actionPrompt, "action", id);
      if (error) {
        reject(error);
      }
      //return first sentence of response
      resolve(text.split(".")[0]);
    } catch (err) {
      reject(err);
    }
  });
};

export const getActionEmoji = async (persona, action, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //get emojis based on action descriptionconsole.logrompt, "emojis", id);
      if (error) {
        reject(error);
      }
      const emojis = filterEmojiResponse(text);
      resolve(emojis);
    } catch (err) {
      reject(err);
    }
  });
};

export const getAgentActions = async (actions) => {
  return new Promise(async (resolve, reject) => {
    try {
      let agentActions = await Promise.all(
        actions.map(async (act) => {
          const { persona, worldState, id } = act;
          const location = await getLocation({ persona, worldState, id });
          if (DEBUG) {
            console.log(
              `Location Prompt:\nPersona ${JSON.stringify(
                persona
              )}\n${worldState}\nLocation: ${location.name}`
            );
          }
          const actionDescription = await getActionDescription(
            persona,
            worldState,
            location,
            id
          );
          if (DEBUG) {
            console.log(`Action: ${actionDescription}`);
          }
          const emojis = await getActionEmoji(persona, actionDescription, id);
          if (DEBUG) {
            console.log(`Emojist: ${emojis}`);
          }
          return { ...location, actionDescription, emojis };
        })
      );
      resolve(agentActions);
    } catch (err) {
      reject(err);
    }
  });
};
