import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../firebase/AuthProvider"

function checkProximity(agent1, agent2) {
  const xDiff = Math.abs(agent1.x - agent2.x);
  const yDiff = Math.abs(agent1.y - agent2.y);

  return xDiff <= 2 && yDiff <= 2;
}

function ProximityMessage() {
  const { agents, setAgents} = useContext(AuthContext);
  const [momentResponses, setMomentResponses] = useState([]);

  useEffect(() => {
    const newMomentResponses = [];

    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        if (checkProximity(agents[i], agents[j])) {
          newMomentResponses.push(agents[i].momentResponse);
          newMomentResponses.push(agents[j].momentResponse);
        }
      }
    }

    setMomentResponses(newMomentResponses);
  }, [agents])

  return momentResponses;
}

export default ProximityMessage;