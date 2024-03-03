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
  const [currentText, setCurrentText] = useState(" ");
  const [infinite, setInfinite] = useState(false);
  const CHUNK_SIZE = 5; // max number of words to display
  const delay = 1000;

  useEffect(() => {
    if (agent.momentResponse && agent.momentResponse.length === 6) {
      setInfinite(true);
      if (currentIndex == 0) {
        const timeout = setTimeout(() => {
          setCurrentText(agent.momentResponse[0] + agent.momentResponse[1]);
          setCurrentIndex(2);
        }, delay);
      } else if (currentIndex < agent.momentResponse?.length) {
        //if there is still text to append, set a timeout to append the next character to currentText
        //after the specified delay amount, append text, move to next character, repeat.
        setCurrentText(
          (prevText) =>
            prevText +
            (agent.momentResponse[currentIndex] +
              agent.momentResponse[currentIndex + 1])
        );
        const timeout = setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex + 2);
        }, delay);
        return () => clearTimeout(timeout);
      } else if (infinite) {
        const timeout = setTimeout(() => {
          setCurrentText(agent.momentResponse[0] + agent.momentResponse[1]);
          setCurrentIndex(0);
        }, delay);
      }
    } else if (agent.momentResponse) {
      setInfinite(false);
      setCurrentText(agent.momentResponse);
    }
  }, [currentIndex, agent.momentResponse]);

  useEffect(() => {
    if (agent.momentResponse) {
      setDisplayName(false);
    } else {
      setDisplayName(true);
    }
  }, [agent.momentResponse]);

  return displayName ? (
    <div
      className={`sprite-text-container ${agent.name}`}
    >{`${agent.name}`}</div>
  ) : (
    //logic for displaying name/displaying "talking" being retained, but text box will contain an elipses rather than the moment speech
    <div className={`sprite-text-container ${agent.name}`}>{currentText}</div>
    //<div className={`sprite-text-container ${agent.name}`}>{textArray[currentIndex]}</div>  );
  );
}

export default SpriteTextBubble;
