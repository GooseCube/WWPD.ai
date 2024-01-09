import axios from "axios";
import { pushNewMessage } from "../firebase/firebaseDB";
import { filterMistralResponse } from "./modules/filterResponse";

async function mistralAPI(prompt) {
  const HUGGINGFACE_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
  const HUGGINGFACE_MISTRAL_URL =
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
  try {
    const response = await axios.post(
      HUGGINGFACE_MISTRAL_URL,
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
      `Error: unable to fetch prompt: "${prompt}" from the Mistral API Server`,
      error
    );
    pushNewMessage(
      prompt,
      "That didn't go as planned. Maybe the Mistral Server is down?"
    );
  }
}

export default mistralAPI;
