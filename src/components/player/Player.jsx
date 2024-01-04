import React, { useEffect } from "react";
import { handlePlayerMoveEvent } from "./modules/keyPressListener";

// Sprite Styles
import "./styles/styles.css";
import { Sprite } from "./styles/Sprite";

function Player({
  player,
  changePlayerControlled,
  prevPlayerControlled,
  setPlayers,
  setAgents,
}) {
  useEffect(() => {
    // If playerControlled hasn't changed from false to true, return early
    if (
      prevPlayerControlled &&
      prevPlayerControlled.uid === player.uid &&
      prevPlayerControlled.playerControlled &&
      !player.playerControlled
    ) {
      return;
    }

    const handleKeyPress = (event) => {
      if (player.playerControlled) {
        handlePlayerMoveEvent(player, event.key, setPlayers, setAgents);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [player, prevPlayerControlled]);

  return (
    // <div className="sprite-container" style={{ left: player.x, top: player.y }}>
    <div className="sprite-container">
      <Sprite
        player={player}
        className={`sprite grid-cell ${
          player.frame === 0
            ? `stand-${player.direction}`
            : `walk-${player.direction}-${player.frame}`
        }`}
        onClick={() => changePlayerControlled(player)}>
        {player.playerControlled ? <div className="sprite-arrow"></div> : ""}
        <div className="sprite-name-container">{player.name}</div>
      </Sprite>
      <div className="sprite-shadow"></div>
    </div>
  );
}

export default Player;
