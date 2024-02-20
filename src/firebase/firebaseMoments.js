// For a complete list of firebase sdk functions see "./README.md"
import {
  remove,
  ref,
  push,
  set,
  onValue,
  update,
} from "firebase/database";
import { database, auth } from "./firebaseConfig";

/**
 * Retrieve the firebase 'moments', if any
 * @param {useState setter} setMoments
 */
export const getUserMoments = async (setMoments) => {
  const userId = auth.currentUser.uid;
  const momentRefs = ref(database, `users/${userId}/moments`);
  onValue(momentRefs, (snapshot) => {
    const moments = snapshot.val();
    setMoments(moments);
  });
};

/**
 * Create a blank moment that can be continuously updated during agent speech generation.
 */
export const createBlankMoment = async () => {
  const blankMoment = {
    timestamp: Date.now(),
    conversation: [],
    images: [],
  };

  const userId = auth.currentUser.uid;
  const momentsRef = ref(database, `users/${userId}/moments`);
  const newMomentsRef = push(momentsRef);

  try {
    await set(newMomentsRef, blankMoment);
    console.log("Blank Moment Pushed to Firebase: ", blankMoment);
    return newMomentsRef;
  } catch (error) {
    console.log("Unable to push new moment to Firebase: ", error);
    return "error"; //let's fix this later...
  }
};

/**
 * Push changes to an existing moment
 * @param {*} momentsRefToUpdate 
 * @param {*} speech 
 */
export const updateMoment = async(momentsRefToUpdate, speech) => {
  const updatedMoment = {
    conversation: [...speech.conversations], 
    images: [...speech.images],
  };

  try {
    await update(momentsRefToUpdate, updatedMoment);
    console.log("New Moment Pushed to Firebase: ", updatedMoment);
  } catch (error) {
    console.log("Unable to push new moment to Firebase: ", error);
  }
}

/**
 * Update firebase with a new 'moment' creation
 * @param {string} prompt
 * @param {string} response
 * Currently no longer used, replaced by createBlankMoment and updateMoment
 */
export const pushNewMoment = async (speech) => {
  const newMoment = {
    timestamp: Date.now(),
    conversation: [...speech.conversations],
    images: [...speech.images],
  };
  const userId = auth.currentUser.uid;
  const momentsRef = ref(database, `users/${userId}/moments`);
  const newMomentsRef = push(momentsRef);

  try {
    await set(newMomentsRef, newMoment);
    console.log("New Moment Pushed to Firebase: ", newMoment);
  } catch (error) {
    console.log("Unable to push new moment to Firebase: ", error);
  }
};

/**
 * Using the uid for the 'moment' created by Firebase
 * on push(), remove it from Firebase
 * @param {uuid: string} id
 */
export const removeMoment = async (id) => {
  const userId = auth.currentUser.uid;
  const momentsRef = ref(database, `users/${userId}/moments/${id}`);
  await remove(momentsRef);
};

