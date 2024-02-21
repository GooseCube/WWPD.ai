/**
 * Validates a template and sets default values for missing fields.
 *
 * @param {Object} template - The template to validate. This should have the same structure as the validationTemplate.
 * @returns {Object} The validated template. This will have the same structure as the input template, but any missing fields will be filled in with default values.
 */
export const validateAndSetTemplateDefaults = (template) => {
  const validationTemplate = {
    title: "No title given",
    initialPrompt: {
      instruction: "No instruction was given",
      context: "No context was given",
      question: "No question or statement has been given",
    },
    finalPrompt: {
      instruction: "No final instruction has been given",
      context: "No final context has been given",
    },
  };

  return { ...validationTemplate, ...template };
};

/**
 * Sorts an object of objects alpha[ A -> Z ] using the 'title' property
 *
 * @param {Object} obj - The object to sort.
 * @returns {Object} The sorted object.
 */
export const sortObjectAtoZ = (obj) => {
  // Convert the object to an array of [key, value] pairs.
  const entries = Object.entries(obj);

  // Sort the array by the 'title' property of the value.
  const sortedEntries = entries.sort((entryA, entryB) => {
    let titleA = "";
    let titleB = "";

    if (entryA[1] && entryB[1]) {
      // Check if 'title' property exists on the objects
      if ("title" in entryA[1] && "title" in entryB[1]) {
        // Extract the 'title' property from the value part of the entry (which is at index 1).
        titleA = entryA[1].title.toUpperCase(); // ignore upper and lowercase
        titleB = entryB[1].title.toUpperCase(); // ignore upper and lowercase
      } else {
        throw new Error("One of the entries does not have a title property");
      }
    } else {
      throw new Error("One of the entries is missing a value");
    }

    // Compare the titles.
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0; // titles must be equal
  });

  // Convert the sorted array back to an object.
  const sortedObject = Object.fromEntries(sortedEntries);

  return sortedObject;
};

/**
 * Converts a title to camel case.
 *
 * @param {string} title - The title to convert.
 * @returns {string} The title converted to camel case.
 */
export const convertTitleToCamelCase = (title) => {
  return title
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};
