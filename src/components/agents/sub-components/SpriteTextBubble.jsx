import { useEffect, useState } from "react";

function SpriteTextBubble({ agent }) {
  const [textArray, setTextArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayName, setDisplayName] = useState(true);

  useEffect(() => {
    console.log("inside useEffect text bubble", agent.momentResponse)
    if (agent.momentResponse) {
    console.log("inside useEffect agent moment response IF")
      const words = agent.momentResponse.split(" ");
      const chunks = [];
      for (let i = 0; i < words.length; i += 3) {
        chunks.push(words.slice(i, i + 3).join(" "));
      }
      setTextArray(chunks);
      setCurrentIndex(0);
      setDisplayName(false);
    } else {
    console.log("inside useEffect agent moment response ELSE")
      setDisplayName(true);
    }
  }, [agent.momentResponse]);

  const displayTextMessage = () => {
    let timeoutId;
    if (currentIndex < textArray.length) {
      timeoutId = setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        if (currentIndex + 1 >= textArray.length) {
          setDisplayName(true);
        }
      }, 1000); // Change this value to adjust the time between text changes
    }
    return () => clearTimeout(timeoutId)
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
