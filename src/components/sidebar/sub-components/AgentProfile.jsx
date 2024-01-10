import React, { useState, useEffect } from "react";

/**
 * Display the current player controlled agents profile:
 * Image, Name, and Personality
 * @param {object} agents
 * @returns the agent persona: {name, age, career, personality}
 */
function AgentProfile({ agents }) {
  const [sprite, setSprite] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const userControlledAgent = agents.find(
      (agent) => agent.playerControlled === true
    );
    setAgent(userControlledAgent);
    if (userControlledAgent) {
      const controlledAgent = userControlledAgent.sprite.replace(".png", "");
      import(`../../../assets/characters/${controlledAgent}.png`)
        .then((image) => setSprite(image.default))
        .catch((err) => console.error(err));
    }
  }, [agents]);

  if (!agent) {
    return (
      <div className="agent-profile-error">
        Selected agents you control should be displayed here.
      </div>
    );
  }

  return (
    <div className="agent-profile-container border rounded p-2">
      <h2>{agent.name}</h2>
      {sprite && (
        <div
          className="agent-sprite-image"
          style={{
            backgroundImage: `url(${sprite})`,
            width: "32px",
            height: "32px",
          }}
        />
      )}
      <p>Age: {agent.age}</p>
      <p>Career: {agent.career}</p>
      <p>Personality: {agent.personality}</p>
    </div>
  );
}

export default AgentProfile;
