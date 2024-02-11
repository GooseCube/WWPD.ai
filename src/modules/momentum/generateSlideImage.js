import axios from "axios";
import stabilityaiXLAPI from "../../modelAPI/stabilityaiXLAPI";

const createImagePrompt = (response) => {
  return `Generate an image that best represents the the following idea: ${response}`;
};

export const generateSlideImage = async (response, speech) => {
  const prompt = createImagePrompt(response);
  const image = await stabilityaiXLAPI(prompt);
  console.log("response before filter for URL: ", image);

  const imageResponse = await axios.get(image, {
    responseType: "blob",
  });

  const finalResponse = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(imageResponse.data);
  });

  speech.images.push(finalResponse);
  console.log("final image pushed to speech.images: ", finalResponse)
};
