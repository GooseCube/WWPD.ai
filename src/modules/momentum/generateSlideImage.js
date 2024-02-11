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

  const reader = new FileReader();
  let finalResponse = null;

  reader.onloadend = () => {
    finalResponse = reader.result;
    speech.images.push(finalResponse);
  };

  reader.readAsDataURL(imageResponse.data);
};
