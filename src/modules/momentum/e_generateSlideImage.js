import stabilityaiXLAPI from "../../modelAPI/stabilityaiXLAPI";
import { createImagePrompt } from "./speechModules/promptTemplates";
import { firebaseTxt2Img } from "../../modelAPI/modules/firebaseTxt2ImgURL";

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
      throw new Error(`StabilityXL api fetch error\nPrompt: ${prompt}`);
    }

    const finalImage = await firebaseTxt2Img(image);
    if (!finalImage) {
      throw new Error(
        `Final image process error for text 2 image\nPrompt: ${prompt}`
      );
    }
    speech.images.push(finalImage);
  } catch (error) {
    console.error("GenerateSlideImage fetch error");
    throw new Error(
      `Unable to generate the requested slide image for ${response}: ${error}`
    );
  }
};
