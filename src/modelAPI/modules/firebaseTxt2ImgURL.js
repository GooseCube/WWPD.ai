import axios from "axios";

/**
 * The 'image' will be converted to a format that can be
 * used to create a URL for persistent storage in FirebaseDB
 * @param {url} image, a temporary URL from Huggingface response
 */
export const firebaseTxt2Img = async (image) => {
  try {
    const imageResponse = await axios.get(image, {
      responseType: "blob",
    });

    // Returns a data URL representing the image data
    const finalResponse = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageResponse.data);
    });

    if (!finalResponse) {
      throw new Error(
        `firebaseTxt2Img was unable to convert the given image for Firebase ${finalResponse}`
      );
    }
    return finalResponse;
  } catch (error) {
    throw new Error(`Unable to convert the given image for Firebase ${error}`);
  }
};
