/**
 * Initialize PrimaryAgent and a randomly generated AgentsList
 * Set only those agents that are either:
 * playerControlled || rendered to the game
 * leaving out all other agents in the original agents[]
 */
export const initializeAgents = (agents, speech) => {
  // Filter out all 'render: false' agents from the list
  const renderedAgents = agents.filter((agent) => agent.render === true);


  // Set the playerControlled: true to the speech.primaryAgent
  const playerControlledAgent = renderedAgents.find(
    (agent) => agent.playerControlled === true
  );
  if (playerControlledAgent) {
    speech.primaryAgent = playerControlledAgent;
  }

  /**
   * @ADAM
   * At this point, the 'renderedAgents' could be split into groups:
   * - speech.attendingAgents = randomFunction()
   * - speech.notAttendingAgents = randomFunction()
   */

  // Randomize all rendered agents
  renderedAgents.sort(() => Math.random() - 0.5);

  // Add all agents that are not playerControlled to the agentList
  renderedAgents.forEach((agent) => {
    if (agent !== playerControlledAgent) {
      speech.agentList.push(agent);
    }
  });
};
