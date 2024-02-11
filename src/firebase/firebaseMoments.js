// For a complete list of firebase sdk functions see "./README.md"
import {
  remove,
  ref,
  push,
  set,
  onValue,
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
 * Update firebase with a new 'moment' creation
 * @param {string} prompt
 * @param {string} response
 */
export const pushNewMoment = async (moment) => {
  const newMoment = {
    timestamp: Date.now(),
    conversation: moment.conversation,
    images: moment.images,
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

