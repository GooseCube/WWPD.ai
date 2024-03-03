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
const getInstruction = async (prompt, params, id) => {
  try {
    return await fetchModelResponse("Llama", prompt, {
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
      const locations = Object.values(meetingPlaces).map((item) => item.title);
      const prompt = getLocationPrompt(persona, worldState, locations);
      const response = await getInstruction(prompt, "location", id);
      if (response.startsWith("Error:")) {
        reject(response);
      }
      const match = response.match(/\d+/);
      let locationNum = Math.floor(Math.random() * locations.length);
      if (match && match >= 0 && match < locations.length) {
        locationNum = parseInt(match[0], 10);
      }
      const actionLocation = locationIndexMapping[locationNum];
      resolve({ ...meetingPlaces[actionLocation] });
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
        location.title
      );
      const response = await getInstruction(actionPrompt, "action", id);
      if (response.startsWith("Error:")) {
        reject(response);
      }
      //return first sentence of response
      resolve(response.split(".")[0]);
    } catch (err) {
      reject(err);
    }
  });
};

export const getActionEmoji = async (persona, action, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //get emojis based on action descriptionconsole.logrompt, "emojis", id);
      const response = await fetchModelResponse(
        "Llama",
        getEmojiPrompt(persona, action),
        {
          type: "chat",
          params: "emojis",
        }
      );
      if (response.startsWith("Error:")) {
        reject(response);
      }
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const getRandomLocation = (speechLocation) => {
  const keys = Object.keys(meetingPlaces).filter(
    (place) => place !== speechLocation
  );
  return meetingPlaces[keys[(keys.length * Math.random()) << 0]];
};

export const getAgentActions = async (actions, speechLocation) => {
  return new Promise(async (resolve, reject) => {
    try {
      let agentActions = await Promise.all(
        actions.map(async (agent) => {
          //const { persona, worldState=[], uid } = agent;
          //const persona = agent.persona;
          const id = agent.uid; //temp
          const worldState = []; //temp
          const persona = agent; //temp
          //const actionLocation = await getLocation({ persona, worldState, id });
          const actionLocation = getRandomLocation(speechLocation);
          const coordinate =
            actionLocation.audiencePositions[
              Math.floor(
                Math.random() * actionLocation.audiencePositions.length
              )
            ];
          if (DEBUG) {
            console.log(
              `Location Prompt:\nPersona ${JSON.stringify(
                persona
              )}\n${worldState}\nLocation: ${actionLocation.title}`
            );
          }
          const actionDescription = await getActionDescription(
            persona,
            worldState,
            actionLocation,
            id
          );
          if (DEBUG) {
            console.log(`Action: ${actionDescription}`);
          }
          const emojis = await getActionEmoji(persona, actionDescription, id);
          if (DEBUG) {
            console.log(`Emojist: ${emojis}`);
          }
          return { agent, coordinate, actionDescription, emojis };
        })
      );
      resolve(agentActions);
    } catch (err) {
      reject(err);
    }
  });
};
