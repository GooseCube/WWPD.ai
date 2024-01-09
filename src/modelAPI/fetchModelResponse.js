import mistralAPI from "./mistralAPI";
import mixtralAPI from "./mixtralAPI";
import zephyrAPI from "./zephyrAPI";

/**
 * Requires the model to be used and the a non-empty text string
 * @param {string} model
 * @param {string} prompt
 * @returns an awaited response from the specified ai model
 */
export const fetchModelResponse = async (model, prompt) => {
  if (prompt === "" || !prompt) {
    return "Prompt given is undefined or an empty string";
  }

  switch (model) {
    case "Mistral":
      console.log("Prompted the Mistral AI")
      return await mistralAPI(prompt);
    case "Mixtral":
      console.log("Prompted the Mixtral AI")
      return await mixtralAPI(prompt);
    case "Zephyr":
      console.log("Prompted the Zephyr AI")
      return await zephyrAPI(prompt);
    default:
      return "That didn't go as planned.";
  }
};

/**
 * NOTE: when adding another model to the switch:
 * - Create the modelNameAPI.js file using the same name listed here
 * - go to Sidebar.jsx and add the name used in the switch case to the dropdown list
 */