import axios from "axios";

async function txt2imgAPI(prompt) {
  const HUGGINGFACE_API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
  const HUGGINGFACE_MISTRAL_URL =
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
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
        responseType: "arraybuffer", // tell axios to expect binary data
      }
    );

    // create a Blob from the response data and create an object URL from the Blob
    const blob = new Blob([response.data], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);

    return url;
  } catch (error) {
    console.error(
      `Error: unable to fetch prompt: "${prompt}" from the Mistral API Server`,
      error
    );
    return null;
  }
}

export default txt2imgAPI;
