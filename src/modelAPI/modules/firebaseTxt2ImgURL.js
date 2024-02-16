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
    const reader = new FileReader();
    reader.readAsDataURL(imageResponse.data);
    const finalResponse = await new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
    return finalResponse;
  } catch (error) {
    throw new Error(`Unable to convert the given image for Firebase ${error}`);
  }
};
