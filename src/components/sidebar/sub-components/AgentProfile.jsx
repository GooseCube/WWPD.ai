import React, { useState, useEffect } from "react";

/**
 * Display the current player controlled agents profile:
 * Image, Name, and Personality 
 * @param {object} agents
 * @returns the agent profile
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
      import(`../../../assets/characters/${userControlledAgent.sprite}`)
        .then((image) => setSprite(image.default))
        .catch((err) => console.error(err));
    }
  }, [agents]);

  if (!agent) {
    return <div className="agent-profile-error">Selected agents you control should be displayed here.</div>
  }

  return (
    <div className="agent-profile-container border rounded p-2 col-sm-6">
      <h2>{agent.name}</h2>
      {sprite && <img src={sprite} alt={agent.name} />}
      <p>{agent.personality}</p>
    </div>
  );
}

export default AgentProfile;
