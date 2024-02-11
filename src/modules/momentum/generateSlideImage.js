import axios from "axios";
import stabilityaiXLAPI from "../../modelAPI/stabilityaiXLAPI";

const createImagePrompt = (response) => {
  return `Generate an image that best represents the the following idea: ${response}`;
};

/**
 * Use each agents response to the primary agent idea to generate
 * an image to be displayed at the end of the moment and in the
 * message interface
 * @param {string} response
 * @param {object} speech
 */
export const generateSlideImage = async (response, speech) => {
  const prompt = createImagePrompt(response);
  const image = await stabilityaiXLAPI(prompt);

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
};
