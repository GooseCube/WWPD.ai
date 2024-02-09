export const generateAgentResponses = async () => {
  while (agentList.length > 0) {
    // Hoist and initialize all local variables:
    let agentPrompt = ""; // prompt template: string
    let agentResponse = ""; // ai model response: string
    let emojis = "";

    // Grab an agent to talk to and remove them from the list
    let agent = getRandomAgent(agentList);
    agentList = agentList.filter((a) => a.uid !== agent.uid);

    // Moves primaryAgent to the agent position
    await moveAgent(primaryAgent, agent.x - 1, agent.y - 1, setAgents);

    updatedPrimaryAgent = createUpdatedAgent(
      primaryAgent,
      agent.x - 1,
      agent.y - 1,
      "right",
      `${agent.name}: ${paraphrasedInitialIdea}`
    );

    // This will initiate the text for momentResponse for primaryAgent
    await updateAgentState(setAgents, updateAgent, updatedPrimaryAgent);

    // @prompt: create the AI Model prompt template
    agentPrompt = agentDiscussionPrompt(
      primaryAgent,
      agent,
      primaryAgentInitialIdea
    );

    // @prompt fetch ai model response
    agentResponse = await fetchModelResponse(aiModel, agentPrompt);

    conversations.push({
      agent: agent,
      agentPrompt: agentPrompt,
      agentResponse: agentResponse,
    });

    // Local state context is not updated here as agent does not move on {x, y}
    // This update initiates agent response in text bubble
    await updateAgent({
      ...agent,
      direction: "left",
      momentResponse: agentResponse,
    });

    if (speechLocation.audiencePositions.length > 0) {
      let agentAudiencePosition = getRandomAudiencePosition(
        speechLocation.audiencePositions
      );

      speechLocation.audiencePositions =
        speechLocation.audiencePositions.filter(
          (position) =>
            position.x !== agentAudiencePosition.x &&
            position.y !== agentAudiencePosition.y
        );

      await moveAgent(
        agent,
        agentAudiencePosition.x,
        agentAudiencePosition.y,
        setAgents
      );

      emojis = getRandomEmoji() + getRandomEmoji();

      let updatedAgent = createUpdatedAgent(
        agent,
        agentAudiencePosition.x,
        agentAudiencePosition.y,
        agentAudiencePosition.direction,
        emojis
      );

      await updateAgentState(setAgents, updateAgent, updatedAgent);
    }
  }
};
