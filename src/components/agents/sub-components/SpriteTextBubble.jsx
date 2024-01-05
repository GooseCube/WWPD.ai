// import { useRef, useEffect } from "react";

// function SpriteTextBubble({ agent }) {
//   const textRef = useRef(null);

//   useEffect(() => {
//     if (textRef.current) {
//       const textWidth = textRef.current.offsetWidth;
//       const containerWidth = textRef.current.parentNode.offsetWidth;
//       const animationDuration = (textWidth / containerWidth) * 30; // Adjust the base speed (30s) as needed

//       textRef.current.style.animationDuration = `${animationDuration}s`;
//     }
//   }, [agent.momentResponse]);

//   return agent.momentResponse ? (
//     <div className="sprite-text-container">
//       {agent.momentResponse && (
//         <div className="scrolling-text" ref={textRef}>
//           {`${agent.name}: ${agent.momentResponse}`}
//         </div>
//       )}
//     </div>
//   ) : (
//     <div className="sprite-text-container">{`${agent.name}`}</div>
//   );
// }

// export default SpriteTextBubble;

import { useRef, useEffect } from "react";

function SpriteTextBubble({ agent }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const containerWidth = textRef.current.parentNode.offsetWidth;
      const animationDuration = Math.max((textWidth / containerWidth) * 30, 30);  // Adjust the base speed (30s) as needed

      textRef.current.style.animationDuration = `${animationDuration}s`;
    }
  }, [agent.momentResponse]);

  return agent.momentResponse ? (
    <div className="sprite-text-container">
      {agent.momentResponse && (
        <div className="scrolling-text" ref={textRef}>
          {`${agent.name}: ${agent.momentResponse}`}
        </div>
      )}
    </div>
  ) : (
    <div className="sprite-text-container">{`${agent.name}`}</div>
  );
}

export default SpriteTextBubble;