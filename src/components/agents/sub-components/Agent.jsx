import { useEffect } from "react";

import SpriteTextBubble from "./SpriteTextBubble";

// Local Modules
import { handlePlayerMoveEvent } from "../modules/keyPressListener";

// Sprite Styles
import { Sprite } from "../styles/Sprite";

function Agent({
  agent,
  setAgents,
  changePlayerControlled,
  prevPlayerControlled,
}) {
  useEffect(() => {
    // If playerControlled hasn't changed from false to true, return early
    if (
      prevPlayerControlled &&
      prevPlayerControlled.uid === agent.uid &&
      prevPlayerControlled.playerControlled &&
      !agent.playerControlled
    ) {
      return;
    }

    const handleKeyPress = (event) => {
      if (agent.playerControlled) {
        handlePlayerMoveEvent(agent, setAgents, event.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [agent, prevPlayerControlled]);

  return (
    <div className="sprite-container">
      <Sprite
        agent={agent}
        className={`sprite grid-cell ${
          agent.frame === 0
            ? `stand-${agent.direction}`
            : `walk-${agent.direction}-${agent.frame}`
        }`}
        onClick={() => changePlayerControlled(agent)}>
        {agent.playerControlled ? <div className="sprite-arrow"></div> : ""}
        <SpriteTextBubble agent={agent} />
      </Sprite>
      <div className="sprite-shadow"></div>
    </div>
  );
}

export default Agent;
