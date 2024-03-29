import { fetchModelResponse } from "../../modelAPI/fetchModelResponse";
import { createImagePrompt } from "./speechModules/promptTemplates";
import { firebaseTxt2Img } from "../../modelAPI/modules/firebaseTxt2ImgURL";
import badImage from "./speechModules/badImage.jpeg";

/**
 * Use each agents response to the primary agent idea to generate
 * an image to be displayed at the end of the moment and in the
 * message interface
 * @param {string} response
 * @param {object} speech
 */
export const generateSlideImage = async (
  response,
  speech,
  waitForImage = false
) => {
  try {
    const shortResponse = response.slice(0, 1000);
    const prompt = createImagePrompt(shortResponse);
    const image = await fetchModelResponse("StabilityXL", prompt, {
      type: "txt2img",
      params: "txt2img",
    });
    if (!image) {
      throw new Error(`StabilityXL api fetch error\nPrompt: ${prompt}`);
    }

    const finalImage = await firebaseTxt2Img(image);
    if (!finalImage) {
      throw new Error(
        `Final image process error for text 2 image\nPrompt: ${prompt}`
      );
    }
    if (waitForImage === true) {
      return finalImage;
    } else {
      speech.images.push(finalImage);
    }
  } catch (error) {
    console.error("GenerateSlideImage fetch error");
    speech.images.push(badImage);
  }
};
