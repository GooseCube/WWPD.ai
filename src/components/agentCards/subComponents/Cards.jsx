import { useState, useEffect } from "react";
import { Controller, CheckCircle, PencilSquare } from "react-bootstrap-icons";
import { updateAgent } from "../../../firebase/firebaseDB";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Sub Component
import Card from "./Card";
import EditCard from "./EditCard";

const isRendered = (agent) => {
  return agent.render
    ? "player-render-icon ms-auto"
    : "player-hide-icon ms-auto";
};

function Cards({ agents, cardIndex, setCardIndex, maxViews, editAgent, setEditAgent }) {
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

    if (editAgent && editAgent.uid === agent.uid) {
      temp.push(
        <EditCard
        index={agent.uid}
          agent={agent}
          agentImage={agentImage}
          editAgent={editAgent}
          setEditAgent={setEditAgent}
        />
      );
    }

    if (!editAgent) {
      temp.push(
        <div className="agent-persona-card border rounded" key={index}>
          <div className="header d-flex">
            <h2>{agent.name}</h2>

            {/* Icons for OnClick() Events */}
            {agent.playerControlled && (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={"tooltip-top"}>Player Controlled</Tooltip>
                }>
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

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={"tooltip-top"}>Edit Agent Persona</Tooltip>
              }>
              <PencilSquare
                className="edit-icon ms-auto"
                onClick={() => 
                  {
                  setCardIndex(0)
                  setEditAgent(agent)
                  }
                }
              />
            </OverlayTrigger>
          </div>

          {/* Agent Persona Information and Sprite Image */}
          <Card agent={agent} agentImage={agentImage} />
        </div>
      );
    }
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
