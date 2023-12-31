import React, { useEffect, useState } from "react";
import { handlePlayerMoveEvent } from "./modules/keyPressListener";

// Sprite Styles
import "./styles/styles.css";
import { Sprite } from "./styles/Sprite";

function Player({ player, setPlayer }) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (player.playerControlled) {
        handlePlayerMoveEvent(player, setPlayer, event.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [player]);

  return (
    <div
      className="sprite-container"
      style={{ left: player.x, top: player.y }}>
      <Sprite
        player={player}
        className={`sprite grid-cell ${
          player.frame === 0
            ? `stand-${player.direction}`
            : `walk-${player.direction}-${player.frame}`
        }`}></Sprite>
    </div>
  );
}

export default Player;
