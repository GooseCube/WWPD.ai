// For a complete list of firebase sdk functions see "./README.md"
import { update, ref, onValue } from "firebase/database";
import { database, auth } from "./firebaseConfig";

/**
 * Retrieve sidebar properties such as AI Model currently selected
 * @param {useState Setter} setSidebar
 */
export const getSidebarProperties = async (setSidebar) => {
  const userId = auth.currentUser.uid;
  const sidebarRefs = ref(database, `users/${userId}/sidebar`);
  onValue(sidebarRefs, (snapshot) => {
    let sidebar = snapshot.val();
    if (!sidebar) {
      sidebar = {};
    }
    if (!sidebar.aiModel) {
      sidebar.aiModel = {};
      sidebar.aiModel.title = "Mixtral";
      sidebar.aiModel.type = "chat"
      updateSidebar(sidebar);
    }
    setSidebar(sidebar);
    console.log("AI Model Set As: ", sidebar);
  });
};

/**
 * Expects that the sidebar properties are already set when
 * passed for update. If a property is excluded when passed
 * then it will be removed on update.
 * @param {object} sidebar
 */
export const updateSidebar = async (sidebar) => {
  const userId = auth.currentUser.uid;
  const sidebarRef = ref(database, `users/${userId}/sidebar`);
  update(sidebarRef, sidebar);
};
