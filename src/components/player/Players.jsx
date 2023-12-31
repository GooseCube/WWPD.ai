import { useEffect, useState } from "react";
import Player from "./Player";
import { personas } from "../../personas/personas";

function Players() {
  const [players, setPlayers] = useState(Object.values(personas));

  const changePlayerControlled = (player) => {
    console.log("Player Controlled: ", player);
    players.map((p) => {
      p.playerControlled = false;
    });
    player.playerControlled = true;
  };

  const setPlayer = (index, newPlayer) => {
    setPlayers((players) =>
      players.map((player, i) => (i === index ? newPlayer : player))
    );
  };

  return (
    <div>
      {players.map((player, index) => (
        <Player
          key={player.name}
          player={player}
          setPlayer={(newPlayer) => setPlayer(index, newPlayer)}
          changePlayerControlled={changePlayerControlled}
        />
      ))}
    </div>
  );
}

export default Players;
