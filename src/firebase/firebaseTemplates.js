import { remove, ref, child, set, onValue, get } from "firebase/database";
import { database, auth } from "./firebaseConfig";

// Modules
import { momentTemplates } from "../modules/momentum/speechModules/moments";
import {
  convertTitleToCamelCase,
  sortObjectAtoZ,
  validateAndSetTemplateDefaults,
} from "./modules/templateHelperFunctions";

/**
 * Asynchronously checks if moment templates exist for the current user in Firebase.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean value indicating whether moment templates exist.
 * If moment templates exist, the promise resolves to true. If moment templates do not exist or an error occurs, the promise resolves to false.
 *
 * @throws Will log any errors that occur during the operation to the console.
 */
export const momentTemplatesExist = async () => {
  try {
    const userId = auth.currentUser.uid;
    const templatesRef = ref(database, `users/${userId}/momentTemplates`);

    const snapshot = await get(templatesRef);
    if (snapshot.exists()) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(
      "Unable to check if moment templates exist in Firebase: ",
      error
    );
    return false;
  }
};

/**
 * Asynchronously initializes moment templates from a file, pushes them to Firebase, and sets them globally in the app.
 *
 * @param {Function} setMomentTemplates - The setter function from a useState hook in a React component.
 * This function will be called with the templates as an argument.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @throws Will log any errors that occur during the operation to the console.
 */
export const initializeMomentTemplatesFromFile = async (setMomentTemplates) => {
  try {
    const userId = auth.currentUser.uid;
    const momentTemplateRefs = ref(database, `users/${userId}/momentTemplates`);
    const sortedTemplates = sortObjectAtoZ(momentTemplates);
    await set(momentTemplateRefs, sortedTemplates);
    setMomentTemplates(Object.values(sortedTemplates)); // pass templates as an array
  } catch (error) {
    console.error("Unable to initialize moment templates from file: ", error);
  }
};

/**
 * Asynchronously retrieves the moment templates for the current user from Firebase.
 *
 * @param {Function} setMomentTemplates - The setter function from a useState hook in a React component.
 * This function will be called with the retrieved templates as an argument.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean value indicating the success or failure of the operation.
 * If the operation is successful, the promise resolves to true. If an error occurs, the promise resolves to false.
 *
 * @throws Will log any errors that occur during the operation to the console.
 */
export const getMomentTemplates = async (setMomentTemplates) => {
  try {
    const userId = auth.currentUser.uid;
    const momentTemplateRefs = ref(database, `users/${userId}/momentTemplates`);

    // Then set up the onValue listener to listen for changes
    onValue(momentTemplateRefs, (snapshot) => {
      const updatedTemplates = snapshot.val();
      setMomentTemplates(sortObjectAtoZ(updatedTemplates));
    });

    return true;
  } catch (error) {
    console.error("Unable to retrieve moment templates from Firebase: ", error);
    return false;
  }
};

/**
 * Asynchronously pushes a new moment template to Firebase for the current user.
 *
 * @param {Object} template - The moment template to be pushed to Firebase. This object should contain the data for the new moment.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean value indicating the success or failure of the operation.
 * If the operation is successful, the promise resolves to true. If an error occurs, the promise resolves to false.
 *
 * @throws Will log any errors that occur during the operation to the console.
 */
export const pushNewMomentTemplate = async (template) => {
  try {
    const userId = auth.currentUser.uid;
    const templatesRef = ref(database, `users/${userId}/momentTemplates`);

    // Validate the given template and set default values for missing fields
    const validatedTemplate = validateAndSetTemplateDefaults(template)

    // Convert the title to camel case
    const key = convertTitleToCamelCase(validatedTemplate.title);

    // Use the camel case title as the key in Firebase
    const newMomentsTemplateRef = child(templatesRef, key);
    await set(newMomentsTemplateRef, template);

    console.log("New moment template pushed to Firebase: ", template);
    return true;
  } catch (error) {
    console.error("Unable to push new moment template to Firebase: ", error);
    return false;
  }
};

/**
 * Asynchronously removes a moment template with a specific id from Firebase for the current user.
 *
 * @param {string} id - The id of the moment template to be removed from Firebase.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean value indicating the success or failure of the operation.
 * If the operation is successful, the promise resolves to true. If an error occurs, the promise resolves to false.
 *
 * @throws Will log any errors that occur during the operation to the console.
 */
export const removeMomentTemplate = async (templateId) => {
  try {
    const userId = auth.currentUser.uid;
    const templateRef = ref(
      database,
      `users/${userId}/momentTemplates/${templateId}`
    );
    await remove(templateRef);
    return true;
  } catch (error) {
    console.error(
      `Unable to remove the moment template ${templateId} from Firebase: `,
      error
    );
    return false;
  }
};
