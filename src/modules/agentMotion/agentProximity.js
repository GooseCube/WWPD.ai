/**
 * Evaluate the agent.x and agent.y positions 
 * @param {object} agent1 
 * @param {object} agent2 
 * @returns {boolean}
 * - TRUE: if two agents are within 2x && 2y cells from each other
 * - FALSE: if they do not meet the 2x && 2y criteria
 */
function checkProximity(agent1, agent2) {
  const xDiff = Math.abs(agent1.x - agent2.x);
  const yDiff = Math.abs(agent1.y - agent2.y);

  return xDiff <= 2 && yDiff <= 2;
}

// Evaluate if any two agents are in proximity to one another
export function agentProximity(agents) {
  const newMomentResponses = [];

  for (let i = 0; i < agents.length; ++i) {
    for (let j = i + 1; j < agents.length; ++j) {
      if (checkProximity(agents[i], agents[j])) {
        newMomentResponses.push(agents[i].momentResponse);
        newMomentResponses.push(agents[j].momentResponse);
      }
    }
  }

  return newMomentResponses;
}
