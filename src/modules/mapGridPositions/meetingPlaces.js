/**
 * Locations for moment conversation meetings
 */
export const meetingPlaces = {
  groceryStore: {
    title: "Grocery Store",
    primaryAgent: { x: 43, y: 25, direction: "down" },
    audiencePositions: [
      { x: 46, y: 27, direction: "left" },
      { x: 45, y: 29, direction: "left" },
      { x: 47, y: 32, direction: "up" },
      { x: 38, y: 29, direction: "up" },
      { x: 37, y: 33, direction: "up" },
      { x: 42, y: 32, direction: "up" },
      { x: 33, y: 28, direction: "right" },
    ],
    screenStyles: {
      position: "absolute",
      left: "59em",
      top: "0em",
      width: "10em",
      height: "8em",
    },
    overlayStyles: {
      position: "absolute",
      left: "60em",
      top: "1em",
      width: "8em",
      height: "4em",
    },
  },
  plazaTable: {
    title: "The Plaza",
    primaryAgent: { x: 26, y: 16, direction: "down" },
    audiencePositions: [
      { x: 31, y: 29, direction: "up" },
      { x: 30, y: 22, direction: "left" },
      { x: 25, y: 26, direction: "up" },
      { x: 30, y: 30, direction: "up" },
      { x: 30, y: 19, direction: "left" },
      { x: 17, y: 24, direction: "up" },
      { x: 14, y: 19, direction: "right" },
      { x: 20, y: 23, direction: "up" },
      { x: 25, y: 21, direction: "up" },
      { x: 34, y: 25, direction: "left" },
    ],
    screenStyles: {
      position: "absolute",
      left: "32em",
      top: "-20em",
      width: "10em",
      height: "8em",
    },
    overlayStyles: {
      position: "absolute",
      left: "33em",
      top: "-19em",
      width: "8em",
      height: "4em",
    },
  },
  theFlat: {
    title: "The Flat",
    primaryAgent: { x: 67, y: 6, direction: "down" },
    audiencePositions: [
      { x: 68, y: 17, direction: "up" }, //
      { x: 62, y: 18, direction: "up" }, //
      { x: 73, y: 18, direction: "up" },
      { x: 62, y: 12, direction: "up" }, //
      { x: 65, y: 14, direction: "up" }, //
      { x: 71, y: 14, direction: "up" }, //
    ],
    screenStyles: {
      position: "absolute",
      left: "111rem",
      top: "-23em",
      width: "10em",
      height: "8em",
    },
    overlayStyles: {
      position: "absolute",
      left: "112em",
      top: "-22em",
      width: "8em",
      height: "4em",
    },
  },
  theDeck: {
    title: "The Deck",
    primaryAgent: { x: 62, y: 22, direction: "right" },
    audiencePositions: [
      { x: 62, y: 18, direction: "down" },
      { x: 72, y: 18, direction: "left" },
      { x: 67, y: 21, direction: "down" },
      { x: 74, y: 23, direction: "left" },
      { x: 75, y: 19, direction: "left" },
      { x: 69, y: 18, direction: "left" },
    ],
    screenStyles: {
      position: "absolute",
      left: "111rem",
      top: "-23em",
      width: "10em",
      height: "8em",
    },
    overlayStyles: {
      position: "absolute",
      left: "112em",
      top: "-22em",
      width: "8em",
      height: "4em",
    },
  },
  bizarreStreet: {
    primaryAgent: { x: 41, y: 38, direction: "down" },
    audiencePositions: [
      { x: 32, y: 42, direction: "right" },
      { x: 49, y: 39, direction: "left" },
      { x: 37, y: 42, direction: "up" },
      { x: 40, y: 42, direction: "up" },
      { x: 52, y: 42, direction: "left" },
      { x: 47, y: 42, direction: "up" },
      { x: 54, y: 41, direction: "left" },
    ],
    screenStyles: {
      position: "absolute",
      left: "45em",
      top: "19em",
      width: "10em",
      height: "8em",
    },
    overlayStyles: {
      position: "absolute",
      left: "46em",
      top: "20em",
      width: "8em",
      height: "4em",
    },
  },
};
