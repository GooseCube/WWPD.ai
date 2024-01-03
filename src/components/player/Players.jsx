import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Player from "./Player";
import { personas } from "../../personas/personas";
import {
  initializeAgent,
  updateExistingAgentData,
  removeAllAgents,
} from "../../firebase/firebaseDB";

function Players() {
  const [players, setPlayers] = useState(Object.values(personas));
  const { userId } = useContext(AuthContext);

  // Init Players in Firebase on mount
  useEffect(() => {
    removeAllAgents(userId); // Remove previous agents from Firebase DB
    players.forEach((player) => {
      initializeAgent(player, userId);
    });
  }, []);

  const changePlayerControlled = (player) => {
    console.log("Player Controlled: ", player);
    players.map((p) => {
      p.playerControlled = false;
    });
    player.playerControlled = true;
  };

  /**
   * @TODO need to push() updates for players to Firebase
   * @param {number} index
   * @param {object} newPlayer
   */
  const setPlayer = (index, newPlayer) => {
    setPlayers((players) =>
      players.map((player, i) => {
        if (i === index) {
          updateExistingAgentData(newPlayer, userId); // push player changes to Firebase
          return newPlayer;
        } else {
          return player;
        }
      })
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
