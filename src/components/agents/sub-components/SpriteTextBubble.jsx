import { useEffect, useState } from "react";

function SpriteTextBubble({ agent }) {
  const [textArray, setTextArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayName, setDisplayName] = useState(true);

  useEffect(() => {
    if (agent.momentResponse) {
      const words = agent.momentResponse.split(" ");
      const chunks = [];
      for (let i = 0; i < words.length; i += 3) {
        chunks.push(words.slice(i, i + 3).join(" "));
      }
      setTextArray(chunks);
      setDisplayName(false);
    } else {
      setDisplayName(true);
    }
  }, [agent.momentResponse]);

  const displayTextMessage = () => {
    if (currentIndex < textArray.length) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        if (currentIndex + 1 >= textArray.length) {
          setDisplayName(true);
        }
      }, 2000); // Change this value to adjust the time between text changes
    }
  };

  useEffect(() => {
    displayTextMessage();
  }, [currentIndex, textArray]);

  return displayName ? (
    <div className="sprite-text-container">{`${agent.name}`}</div>
  ) : (
    <div className="sprite-text-container">{textArray[currentIndex]}</div>
  );
}

export default SpriteTextBubble;
