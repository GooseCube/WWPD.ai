import axios from 'axios';
import { pushNewMessage } from '../firebase/firebaseMessages';

async function chatAPI(inferenceParams, modelUrl) {
  const HUGGINGFACE_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
  try {
    const response = await axios.post(
      modelUrl,
      JSON.stringify(inferenceParams),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
        },
      }
    );
    return (
      response?.data[0] || {
        generated_text: 'Error with the chat inference server',
      }
    );
  } catch (error) {
    console.error(
      `Error: unable to fetch prompt: "${prompt}" from the chat Inference Server`,
      error
    );
    pushNewMessage(
      prompt,
      "That didn't go as planned. Maybe the chat inference server is down?"
    );
    //to prevent uncaught error
    return {
      generated_text: `Error: unable to fetch prompt: "${prompt}" from the chat Inference Server`,
    };
  }
}

export default chatAPI;
