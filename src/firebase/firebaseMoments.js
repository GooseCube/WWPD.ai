// For a complete list of firebase sdk functions see "./README.md"
import { remove, ref, push, set, onValue, update } from "firebase/database";
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
   As a financial analyst, I would approach this post-apocalyptic world with a logical and analytical mindset. I would first assess the current situation and resources available. One scenario I can imagine is scavenging for supplies and trading with other survivors. Another scenario could be forming a community and working together to rebuild society. Lastly, I could see myself using my financial analysis skh generation.
 */
export const createBlankMoment = async () => {
  const blankMoment = {
    timestamp: Date.now(),
    conversation: [],
    images: [],
    messageInProgress: true,
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
export const updateMoment = async (
  momentsRefToUpdate,
  speech,
  messageOngoing = true
) => {
  const updatedMoment = {
    conversation: [...speech.conversations],
    images: [...speech.images],
    messageInProgress: messageOngoing,
  };

  try {
    await update(momentsRefToUpdate, updatedMoment);
    console.log("Moment updated in Firebase: ", updatedMoment);
  } catch (error) {
    console.log("Unable to push new moment to Firebase: ", error);
  }
};

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
