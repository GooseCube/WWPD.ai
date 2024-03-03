// Primary Agent needs an idea to discuss with others, let's get it
export const initialMomentPrompt = (primaryAgent, initialPrompt) => {
  return `You are ${primaryAgent.name}. You are ${primaryAgent.age} years old, and you are a ${primaryAgent.career}. ${primaryAgent.personality}
Please create the overview & initial ideas for a TED talk about "${initialPrompt.instruction}".
Conclude by asking for feedback.`;
};

// Primary Agent is meeting with others, this is a great way to explain what you would like them to think about
// and get a constructive response
export const agentDiscussionPrompt = (agent, primaryAgent, initialIdea) => {
  return `You are ${agent.name}. You are ${agent.age} years old, and you are a ${agent.career}. ${agent.personality}
Please provide constructive feedback to ${primaryAgent.name}'s initial TED talk idea as follows:
"${initialIdea}"`;
};

// Primary Agent will wrap up the brainstorming and create the final moment
export const finalMomentPrompt = (primaryAgent, initialPrompt, topic, conversations) => {
  let responses = "";
  for (const conversation of conversations) {
    const {agent, agentResponse} = conversation;
    responses += agent ? `${agent.name} says "${agentResponse}"\n` : "";
  }
  return `You are ${primaryAgent.name}. You are ${primaryAgent.age} years old, and you are a ${primaryAgent.career}. ${primaryAgent.personality}
Please create a complete TED talk in essay form using the following ideas as a starting point:
"${topic}
${responses}"`;
/*
  return `You are ${primaryAgent.name}. You are ${primaryAgent.age} years old, and you are a ${primaryAgent.career}. ${primaryAgent.personality}
Please create a complete TED talk using the following ideas as a starting point:
"${topic}"`;
*/
};

export const paraphraseResponse = (response) => {
  return `Summarize the following response using two or three sentences. Response: ${response}`;
};

export const createImagePrompt = (response) => {
  return `Generate an image that best represents the the following text: ${response}`;
};

export const getEmojiPrompt = (idea) => {
  const prompt = `Given the following Idea:\n Idea: Abigail wants to create a marketing campaign for her pirate ship to attract new crew members.\n\n  Yuriko's Advice:\n\n* Create a visually striking marketing flyer or campaign poster that highlights the excitement and adventure of being a pirate.\n* Use bold, eye-catching colors and images of pirate ships, treasure, and the open sea.\nReturn only 2 emojis that represent the statement.\n</instruct>\n<answer> 🏴‍☠️🖼️ </answer> Given the following Idea: ${idea} \nReturn only 2 emojis that represent the statement.\n</instruct>\n<answer> `;
  return prompt;
};

/*
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
  Of course, you may or may not be in the mood or have time to give your advice but it would be great if you could help and use your special skills to outline your thoughts and perspective.`;
};

export const createImagePrompt = (response) => {
  return `Generate an image that best represents the the following text: ${response}`;
};

export const getEmojiPrompt = (idea) => {
  const prompt = `Given the following Idea:\n Idea: Abigail wants to create a marketing campaign for her pirate ship to attract new crew members.\n\n  Yuriko's Advice:\n\n* Create a visually striking marketing flyer or campaign poster that highlights the excitement and adventure of being a pirate.\n* Use bold, eye-catching colors and images of pirate ships, treasure, and the open sea.\nReturn only 2 emojis that represent the statement.\n</instruct>\n<answer> 🏴‍☠️🖼️ </answer> Given the following Idea: ${idea} \nReturn only 2 emojis that represent the statement.\n</instruct>\n<answer> `;
  return prompt;
};
*/