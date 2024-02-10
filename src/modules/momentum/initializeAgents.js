import { getRandomAgent } from "./speechModules/helperFunctions";

/**
 * Initialize PrimaryAgent and a randomly generated AgentsList
 * Set only those agents that are either:
 * playerControlled || rendered to the game
 * leaving out all other agents in the original agents[]
 */
export const initializeAgents = (agents, speech) => {
  let index = agents.length - 1;
  const agentList = agents;

  while (index >= 0) {
    let agent = getRandomAgent(agentList);
    if (agent.playerControlled === true) {
      speech.primaryAgent = agent;
    } else if (agent.render === true && agent.playerControlled === false) {
      speech.agentList.push(agent);
    }
    --index;
  }
};
