import axios from "axios";
import { pushNewMessage } from "../firebase/firebaseMessages";
import { filterMistralResponse } from "./modules/filterResponse";

async function mixtralAPI(prompt) {
  const HUGGINGFACE_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
  const HUGGINGFACE_MIXTRAL_URL =
    "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";
  try {
    const response = await axios.post(
      HUGGINGFACE_MIXTRAL_URL,
      {
        inputs: prompt,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
        },
      }
    );
    return filterMistralResponse(prompt, response.data);
  } catch (error) {
    console.error(
      `Error: unable to fetch prompt: "${prompt}" from the Mixtral API Server`,
      error
    );
    pushNewMessage(
      prompt,
      "That didn't go as planned. Maybe the Mixtral Server is down?"
    );
  }
}

export default mixtralAPI;
