import { useState, useEffect } from "react";

function Cards({ agents, cardIndex, maxViews }) {
  const [agentImages, setAgentImages] = useState({});
  const temp = [];
  let count = 0;

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (const agent of Object.values(agents)) {
        const agentName = agent.sprite.replace(".png", "");
        images[agentName] = await import(
          `../../../assets/characters/${agentName}.png`
        );
      }
      setAgentImages(images);
    };

    loadImages();
  }, [agents]);


  // Push all agents to temp[] array
  Object.values(agents).map((agent, index) => {
    const agentName = agent.sprite.replace(".png", "");
    const agentImage = agentImages[agentName];

    temp.push(
      <div className="agent-persona-card border rounded p-2" key={index}>
        <h2>{agent.name}</h2>
        <div
          className="agent-sprite-image"
          style={{
            backgroundImage: agentImage ? `url(${agentImage.default})` : "none",
            width: "32px",
            height: "32px",
          }}
        />
        <p>Age: {agent.age}</p>
        <p>Career: {agent.career}</p>
        <p>Personality: {agent.personality}</p>
      </div>
    );
  });

  return temp.map((card, index) => {
    if (index >= cardIndex && count <= maxViews) {
      ++count;
      return card;
    }
    return null;
  });
}

export default Cards;
