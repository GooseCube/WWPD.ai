import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Controller } from "react-bootstrap-icons";

/**
 * Display the current player controlled agents profile:
 * Image, Name, and Personality
 * @param {object} agents
 * @returns the agent persona: {name, age, career, personality}
 */
function AgentProfile({ agents, showAgentCards, setShowAgentCards }) {
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
        Player controlled agent will be displayed here.
      </div>
    );
  }

  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id={"tooltip-right"}>Click to View Agents</Tooltip>}>
      <div
        className="agent-profile-container border rounded p-2"
        onClick={() => setShowAgentCards(!showAgentCards)}>
        <div className="profile-header d-flex">
          <h2>{agent.name}</h2>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={"tooltip-top"}>Player Controlled</Tooltip>}>
            <Controller className="player-icon ms-auto" />
          </OverlayTrigger>
        </div>

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
    </OverlayTrigger>
  );
}

export default AgentProfile;
