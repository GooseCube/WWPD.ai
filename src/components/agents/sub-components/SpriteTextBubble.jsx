import { useRef, useEffect, useState } from "react";

function SpriteTextBubble({ agent }) {
  const textRef = useRef(null);
  const [textArray, setTextArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (agent.momentResponse) {
      const words = agent.momentResponse.split(" ");
      const chunks = [];
      for (let i = 0; i < words.length; i += 3) {
        chunks.push(words.slice(i, i + 3).join(" "));
      }
      setTextArray(chunks);
    }
  }, [agent.momentResponse]);

  const displayTextMessage = () => {
    if (currentIndex < textArray.length) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 2000); // Change this value to adjust the time between text changes
    }
  };

  useEffect(() => {
    displayTextMessage();
  }, [currentIndex, textArray]);

  return agent.momentResponse ? (
    <div className="sprite-text-container">{textArray[currentIndex]}</div>
  ) : (
    <div className="sprite-text-container">{`${agent.name}`}</div>
  );
}

export default SpriteTextBubble;
