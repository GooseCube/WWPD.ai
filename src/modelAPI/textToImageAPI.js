import axios from 'axios';

async function textToImageAPI(inferenceParams, modelUrl) {
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
        responseType: 'arraybuffer', // tell axios to expect binary data
      }
    );

    // create a Blob from the response data and create an object URL from the Blob
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);

    return url;
  } catch (error) {
    console.error(
      `Error: unable to fetch prompt: "${prompt}" from the text to image Server`,
      error
    );
    return null;
  }
}

export default textToImageAPI;
