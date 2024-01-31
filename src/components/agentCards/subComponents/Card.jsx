function Card({ agent, agentImage, editAgent }) {
  if (!editAgent) {
    return (
      <>
        <div
          className="agent-sprite-image"
          style={{
            backgroundImage: agentImage ? `url(${agentImage.default})` : "none",
            width: "32px",
            height: "32px",
          }}
        />
        <p>AGE: {agent.age}</p>
        <p>CAREER: {agent.career}</p>
        <p>SPECIALTY: {agent.specialty}</p>
        <p>PERSONALITY: {agent.personality}</p>
      </>
    );
  }
}

export default Card;
