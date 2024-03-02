import { useContext, useState } from "react";

// Global Context Providers
import { FirebaseContext } from "../contextProviders/FirebaseProvider";

// Firebase DB
import { updateAgent } from "../../firebase/firebaseAgents";

// Sub Component
import Agent from "./sub-components/Agent";

// Styles
import "./styles/styles.css";

// Assets: AI Generated background image by Steven Ochs
//import gameBackgroundImage from "../../assets/StevenOchsBgImage.png";
import gameBackgroundImage from "../../assets/StevenOchsBgImageNEW.jpg";

function Agents() {
  const { agents, setAgents } = useContext(FirebaseContext);
  const [prevPlayerControlled, setPrevPlayerControlled] = useState([]);

  const changePlayerControlled = (agent) => {
    setPrevPlayerControlled(() => {
      return agents.find((agent) => agent.playerControlled === true);
    });

    // Ensure only one agent has playerControlled status: true
    agents.map(async (a) => {
      let updatedAgent;
      if (a.uid === agent.uid) {
        updatedAgent = { ...a, playerControlled: true };
      } else {
        updatedAgent = { ...a, playerControlled: false };
      }

      // Update each agent in Firebase
      await updateAgent(updatedAgent, setAgents);
    });
  };

  return (
    agents && (
      <div
        className="game-container"
        style={{
          backgroundImage: `url(${gameBackgroundImage})`,
          width: "1280px",
          height: "720px",
        }}>
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
