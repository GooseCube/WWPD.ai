/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

/**
 * When agent.momentResponse object is empty or null, displays the agent name in text bubble
 * When an update for agent.momentResponse is made in Firebase, the string text
 * will be displayed in text bubble
 * @param {object} agent
 * @returns the agents text bubble
 */
function SpriteTextBubble({ agent }) {
  const [textArray, setTextArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayName, setDisplayName] = useState(true);
  const CHUNK_SIZE = 5; // max number of words to display

  useEffect(() => {
    if (agent.momentResponse) {
      const words = agent.momentResponse.split(" ");
      const chunks = [];
      for (let i = 0; i < words.length; i += CHUNK_SIZE) {
        chunks.push(words.slice(i, i + CHUNK_SIZE).join(" "));
      }
      setTextArray(chunks);
      setCurrentIndex(0);
      setDisplayName(false);
    } else {
      setDisplayName(true);
    }
  }, [agent.momentResponse]);

  const displayTextMessage = async () => {
    let timeoutId;
    if (currentIndex < textArray.length) {
      timeoutId = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (currentIndex + 1 >= textArray.length) {
          setDisplayName(true);
        }
      }, 1000); // Change this value to adjust the time between text changes
    }
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    displayTextMessage();
  }, [currentIndex, textArray]);

  return displayName ? (
    <div className={`sprite-text-container ${agent.name}`}>{`${agent.name}`}</div>
  ) : (
    <div className={`sprite-text-container ${agent.name}`}>{textArray[currentIndex]}</div>
  );
}

export default SpriteTextBubble;
