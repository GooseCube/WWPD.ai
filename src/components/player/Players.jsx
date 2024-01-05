import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Player from "./Player";
import { updateAgent } from "../../firebase/firebaseDB";

function Players() {
  const { agents, setAgents } = useContext(AuthContext);
  // const [players, setPlayers] = useState([]);
  const [prevPlayerControlled, setPrevPlayerControlled] = useState([]);

  const changePlayerControlled = (agent) => {
    setPrevPlayerControlled(() => {
      return agents.find((agent) => agent.playerControlled === true);
    });

    // Create a new array of agents with updated playerControlled status
    const updatedAgents = agents.map((p) => {
      if (p.uid === agent.uid) {
        return { ...p, playerControlled: true };
      } else {
        return { ...p, playerControlled: false };
      }
    });

    // update global context state
    setAgents(updatedAgents);

    updateAgent(agent);
  };

  return (
    agents && (
      <div>
        {agents.map((agent) => (
          <Player
            key={agent.uid}
            agent={agent}
            changePlayerControlled={changePlayerControlled}
            prevPlayerControlled={prevPlayerControlled}
            setAgents={setAgents}
          />
        ))}
      </div>
    )
  );
}

export default Players;
