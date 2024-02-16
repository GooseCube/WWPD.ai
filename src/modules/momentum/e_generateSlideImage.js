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

    if (!image) {
      throw new Error(
        `Unable to build the prompt image for agent\nPrompt: ${prompt}`
      );
    }
    speech.images.push(image);
  } catch (error) {
    throw new Error(
      `Unable to generate the requested slide image for ${response}: ${error}`
    );
  }
};
