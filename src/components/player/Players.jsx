import { useState } from "react";
import Player from "./Player";
import { personas } from "../../personas/personas";

function Players() {
  const [players, setPlayers] = useState(Object.values(personas));

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
        />
      ))}
    </div>
  );
}

export default Players;
