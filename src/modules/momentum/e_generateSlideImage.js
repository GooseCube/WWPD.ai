import axios from "axios";
import stabilityaiXLAPI from "../../modelAPI/stabilityaiXLAPI";
import { createImagePrompt } from "./speechModules/promptTemplates";

/**
 * Use each agents response to the primary agent idea to generate
 * an image to be displayed at the end of the moment and in the
 * message interface
 * @param {string} response
 * @param {object} speech
 */
export const generateSlideImage = async (response, speech) => {
  try {
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

    // Ensure that a valid response is pushed
    // and not 'null' or 'undefined'
    if (finalResponse) {
      speech.images.push(finalResponse);
    }
  } catch (error) {
    throw new Error(
      `Unable to generate the requested slide image for ${response}: ${error}`
    );
  }
};
