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
    <div className={`sprite-text-container ${agent.name}`}>
      {agent.momentResponse}
    </div>
    //<div className={`sprite-text-container ${agent.name}`}>{textArray[currentIndex]}</div>  );
  );
}

export default SpriteTextBubble;
