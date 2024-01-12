// Primary Agent needs an idea to discuss with others, let's get it
export const initialMomentPrompt = (primaryAgent, initialPrompt) => {
  return `Persona: ${primaryAgent.name}, ${primaryAgent.age}, ${primaryAgent.career}, ${primaryAgent.specialty}. ${primaryAgent.personality}
   ${initialPrompt.instruction} ${initialPrompt.context} ${initialPrompt.question}`;
};

// Primary Agent will wrap up the brainstorming and create the final moment
export const finalMomentPrompt = (primaryAgent, finalPrompt) => {
  return `Persona: ${primaryAgent.name}, ${primaryAgent.age}, ${primaryAgent.career}, ${primaryAgent.specialty}. ${primaryAgent.personality}
   ${finalPrompt.instruction} ${finalPrompt.context}`;
}

// Primary Agent is meeting with others, this is a great way to explain what you would like them to think about
// and get a constructive response
export const agentDiscussionPrompt = (primaryAgent, agent, initalIdea) => {
  return `Persona: ${agent.name}, ${agent.age}, ${agent.career}, ${agent.specialty}. ${agent.personality}
  Idea: ${initalIdea} Instruction: Give advice or help using your persona, the idea you will review and the context.
  Context: ${primaryAgent.name} has asked you to review an idea which may require you to think outside the box to help.
  You are happing to help and will give your advice or perform a task to help make the idea happen. Use those special skills.`;
};