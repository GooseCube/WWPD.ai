import { useContext, useState } from "react";

// Global Context Provider
import { AuthContext } from "../../firebase/AuthProvider";

// Firebase DB
import { updateAgent } from "../../firebase/firebaseDB";

// Sub Component
import Agent from "./sub-components/Agent";

// Styles
import "./styles/styles.css";

function Agents() {
  const { agents, setAgents } = useContext(AuthContext);
  const [prevPlayerControlled, setPrevPlayerControlled] = useState([]);

  const changePlayerControlled = (agent) => {
    setPrevPlayerControlled(() => {
      return agents.find((agent) => agent.playerControlled === true);
    });

    // Create a new array of agents with updated playerControlled status
    const updatedAgents = agents.map((a) => {
      if (a.uid === agent.uid) {
        return { ...a, playerControlled: true };
      } else {
        return { ...a, playerControlled: false };
      }
    });

    // update global context state
    setAgents(updatedAgents);

    // Update Firebase
    updateAgent(agent);
  };

  return (
    agents && (
      <div className="game-container">
        {agents.map(
          (agent) =>
            agent.render && (
              <Agent
                key={agent.uid}
                agent={agent}
                changePlayerControlled={changePlayerControlled}
                prevPlayerControlled={prevPlayerControlled}
                setAgents={setAgents}
              />
            )
        )}
      </div>
    )
  );
}

export default Agents;
