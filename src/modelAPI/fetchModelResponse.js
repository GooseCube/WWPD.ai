import generationParams from "./parameters.json";
import { filterEmojiResponse, filterResponse } from "./modules/filterResponse";
import textToImageAPI from "./textToImageAPI";
import chatAPI from "./chatAPI";

const HUGGINGFACE_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
const DEBUG = import.meta.env.VITE_DEBUG;

const models = {
  Mistral:
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
  Mixtral:
    "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
  StabilityXL:
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
  Zephyr:
    "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
  Llama:
    "https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf",
};

const options = {
  use_cache: false,
  // wait_for_model: true,
};

/**
 * Requires the model to be used and the a non-empty text string
 * @param {string} model
 * @param {string} prompt
 * @param {object: {type: string, params: string}} config An object containing the type of model and inference parameters to use
 * @returns an awaited response from the specified ai model
 */
export const fetchModelResponse = async (modelName, prompt, config = {}) => {
  const { type = "chat", params = generationParams["basic_generation"] } =
    config;
  const modelUrl = models[modelName] || models["Llama"];
  const parameters =
    typeof params === "string" ? generationParams[params] : params;

  const inferenceParams = {
    inputs: prompt,
    parameters,
    options,
  };

  if (prompt === "" || !prompt) {
    return "Prompt given is undefined or an empty string";
  }

  console.log(`Prompted the ${modelName} AI`);
  if (DEBUG === "TRUE") {
    console.log(`Prompt: ${prompt}`);
  }
  switch (type) {
    case "txt2img": {
      return await textToImageAPI(inferenceParams, modelUrl);
    }
    case "textToSpeech": {
      return "Text to speech not yet implemented";
    }
    case "chat": {
      const generation = await chatAPI(inferenceParams, modelUrl);
      const text =
        params === "emojis"
          ? filterEmojiResponse(generation.generated_text)
          : filterResponse(generation.generated_text);
      if (DEBUG === "TRUE") {
        console.log(`Response: ${text}`);
      }
      return text;
    }
    default: {
      console.log(
        "Inference type not selected or supported, defaulting to chat."
      );
      const text = chatAPI(inferenceParams, modelUrl);
      return filterResponse(response);
    }
  }
};

export default fetchModelResponse;

/**
 * NOTE: when adding another inference type (chat, textToSpeech, etc...) to the switch:
 * - Create the inferenceTypeAPI.js file using the same name listed here
 * - go to Sidebar.jsx and add the model name to the dropdown list
 */
