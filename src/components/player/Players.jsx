import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Player from "./Player";
import { database } from "../../firebase/firebaseConfig";

function Players() {
  const { userId, agents } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);

  // Init Players in Firebase on mount
  useEffect(() => {
    setPlayers(agents);
  }, []);

  const changePlayerControlled = (player) => {
    console.log("Player Controlled: ", player);
    players.map((p) => {
      p.playerControlled = false;
    });
    player.playerControlled = true;
  };

  return (
    players && (
      <div>
        {players.map((player) => (
          <Player
            key={player.uid}
            player={player}
            changePlayerControlled={changePlayerControlled}
            setPlayers={setPlayers}
          />
        ))}
      </div>
    )
  );
}

export default Players;
