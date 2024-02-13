/* eslint-disable react/prop-types */

import SpinnerAnimation from "../../loadAnimations/Spinner";

// Builds a single agent card
function Card({ agent, agentImage }) {
  const animationAttributes = {
    className: "agent-loading-animation",
    animation: "grow", // you can also use "border" for circle
  };

  return (
    <>
      {!agentImage ? (
        <SpinnerAnimation attributes={animationAttributes} />
      ) : (
        <div
          className="agent-sprite-image"
          style={{
            backgroundImage: agentImage ? `url(${agentImage.default})` : "none",
            width: "32px",
            height: "32px",
          }}
        />
      )}
      <p>AGE: {agent.age}</p>
      <p>CAREER: {agent.career}</p>
      <p>SPECIALTY: {agent.specialty}</p>
      <p>PERSONALITY: {agent.personality}</p>
    </>
  );
}

export default Card;
