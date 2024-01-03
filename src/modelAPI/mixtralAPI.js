import axios from "axios";
import { pushNewMessage } from "../firebase/firebaseDB";
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
    console.log("Mixtral API Called")
    return filterMistralResponse(prompt, response.data);
    // pushNewMessage(prompt, filterMistralResponse(prompt, response.data));
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
