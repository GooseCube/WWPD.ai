import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Player from "./Player";
import { database } from "../../firebase/firebaseConfig";
import { updateAgent } from "../../firebase/firebaseDB";

function Players() {
  const { agents, setAgents } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const [prevPlayerControlled, setPrevPlayerControlled] = useState([]);

  // Init Players in Firebase on mount
  useEffect(() => {
    setPlayers(agents);
  }, []);

  const changePlayerControlled = (player) => {
    setPrevPlayerControlled(() => {
      return players.find((player) => player.playerControlled === true);
    });

    // Create a new array of players with updated playerControlled status
    const updatedPlayers = players.map((p) => {
      if (p.uid === player.uid) {
        return { ...p, playerControlled: true };
      } else {
        return { ...p, playerControlled: false };
      }
    });

    // update global context state
    setAgents(updatedPlayers)

    // Update local state
    setPlayers(updatedPlayers);
    updateAgent(player);
  };

  return (
    players && (
      <div>
        {players.map((player) => (
          <Player
            key={player.uid}
            player={player}
            changePlayerControlled={changePlayerControlled}
            prevPlayerControlled={prevPlayerControlled}
            setPlayers={setPlayers}
            setAgents={setAgents}
          />
        ))}
      </div>
    )
  );
}

export default Players;
