import { useState, useEffect } from "react";
import { Controller, CheckCircle } from "react-bootstrap-icons";
import { updateAgent } from "../../../firebase/firebaseDB";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const isRendered = (agent) => {
  return agent.render
    ? "player-render-icon ms-auto"
    : "player-hide-icon ms-auto";
};

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
        <div className="header d-flex">
          <h2>{agent.name}</h2>
          {agent.playerControlled && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={"tooltip-top"}>Player Controlled</Tooltip>}>
              <Controller className="player-controlled-icon ms-auto" />
            </OverlayTrigger>
          )}

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={"tooltip-top"}>Show/Hide Agent</Tooltip>}>
            <CheckCircle
              className={isRendered(agent)}
              onClick={() => updateAgent({ ...agent, render: !agent.render })}
            />
          </OverlayTrigger>
        </div>
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
