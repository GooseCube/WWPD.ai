import axios from "axios";
import { pushNewMessage } from "../firebase/firebaseDB";
import { filterMistralResponse } from "./modules/filterResponse";

async function zephyrAPI(prompt) {
  const HUGGINGFACE_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
  const HUGGINGFACE_ZEPHYR_URL =
    "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
  try {
    const response = await axios.post(
      HUGGINGFACE_ZEPHYR_URL,
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
      `Error: unable to fetch prompt: "${prompt}" from the Zephyr API Server`,
      error
    );
    pushNewMessage(
      prompt,
      "That didn't go as planned. Maybe the Zephyr Server is down?"
    );
  }
}

export default zephyrAPI;
