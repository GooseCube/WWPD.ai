/**
 * Initialize PrimaryAgent && AgentsList
 * Set only those agents that are either:
 * playerControlled || rendered to the game
 * leaving out all other agents in array
 */
export const initializeAgents = (agents, speech) => {
  agents.forEach((agent) => {
    if (agent.playerControlled === true) {
      speech.primaryAgent = agent;
    } else if (agent.render === true) {
      speech.agentList.push(agent);
    }
  }, []);
};
