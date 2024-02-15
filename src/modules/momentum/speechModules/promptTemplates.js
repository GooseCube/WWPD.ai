// Primary Agent needs an idea to discuss with others, let's get it
export const initialMomentPrompt = (primaryAgent, initialPrompt) => {
  return `Persona: ${primaryAgent.name}, ${primaryAgent.age}, ${primaryAgent.career}, ${primaryAgent.specialty}. ${primaryAgent.personality}
   ${initialPrompt.instruction} ${initialPrompt.context} ${initialPrompt.question}`;
};

export const paraphraseResponse = (response) => {
  return `Summarize the following response using two or three sentences. Response: ${response}`;
};

// Primary Agent will wrap up the brainstorming and create the final moment
export const finalMomentPrompt = (primaryAgent, finalPrompt, topic) => {
  return `Persona: ${primaryAgent.name}, ${primaryAgent.age}, ${primaryAgent.career}, ${primaryAgent.specialty}. ${primaryAgent.personality}
   ${finalPrompt.instruction} ${finalPrompt.context} Topic: ${topic}`;
};

// Primary Agent is meeting with others, this is a great way to explain what you would like them to think about
// and get a constructive response
export const agentDiscussionPrompt = (agent, primaryAgent, initialIdea) => {
  return `Idea: ${initialIdea} Instruction: Give advice or help using your persona, the idea you will review and the context but most important keep the response short and complete. 
  Persona: ${agent.age}, ${agent.career}, ${agent.specialty}. ${agent.personality} 
  Context: You and ${primaryAgent.name} are discussing the idea they have and would like to know what you think? This may require you to think outside the box to give your thoughts on the idea.
  Of course, you may or may not be in the mood or have time to give your advice but it would be great if you could help and use your special skills to outline your thoughts and perspective.`
};

export const createImagePrompt = (response) => {
  return `Generate an image that best represents the the following idea: ${response}`;
};