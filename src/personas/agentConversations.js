/**
 * Functions to create a given 'moment' action which should include:
 * Use the given prompt to spark a conversation which should lead to
 * a conclusion. This could be a TedTalk, a Drawing, or Conversation.
 * All agents should be given the prompt and what they are able to do,
 * such as nothing, observe, take part, ...
 * The final response should be the combination of:
 * - inital prompt
 * - agent in charge of the 'moment'
 * - agents that participated with their input
 * - final response/outcome
 */

/**
 * @TODO Create a Function in player animation modules:
 * - The primary agent, the 'moment' motivator, should find each player {x, y} and
 *   give them the context and question to evaluate when in a given +- proximity.
 *   Once the agent responds with their input, the primary agent will move to the
 *   next until all agents in the game have been given the context and question.
 */

import { pushNewMessage } from "../firebase/firebaseDB";
import { personas } from "./personas";
import { townSquare } from "./moments";

// Kick start the 'moment' using primaryAgent and initial prompt
const primaryAgentPrompt = (primaryAgent, moment) => {
  return `Instruction: ${moment.instruction} Context: ${moment.context} Personality: ${primaryAgent.personality}  Question: ${moment.question}`
};

const getFeedback = (primaryAgent, agent, primaryAgentIdea) => {
  const instruction = `Your name is ${agent.name} and you are ${agent.personality}. You have been greeted by ${primaryAgent.name} and will use the given context in your response to ${primaryAgent.name}.`;
  const context = `${primaryAgent.name} has an idea that they would like you to be a part of. Review the idea and offer some advice. You can participate or decline to participate in the idea. Your advice should be at least two sentences and you will tell ${primaryAgent.name} if you want to be a part of their idea.`;
  const idea = `Idea: ${primaryAgentIdea}`;
  return `${instruction} Context: ${context} Idea: ${idea}`;
};

// Function to start a conversation
export const startConversation = async (primaryAgent, moment = townSquare) => {
  // Initialize the conversation with the prompt
  let conversation = primaryAgent.name + ": ";
  let primaryAgentIdea = await mixtralAPI(
    primaryAgentPrompt(primaryAgent, moment.initialPrompt)
  );
  conversation += `${primaryAgentIdea}\n`;

  // Loop through the personas and have each one respond to the prompt
  personas.forEach(async (persona) => {
    // Generate a response based on the persona's personality
    let response = await mixtralAPI(
      getFeedback(primaryAgent, persona, primaryAgentIdea)
    );

    // Add the response to the conversation
    conversation += `${persona.name}\n ${response}\n`;
  });

  // Then, add the final 'townSquare moment' prompt using the primaryAgentIdea, new instructions/context/ and responses from each agent

  console.log("CONVERSATION\n", conversation);

  // Return the conversation
  return conversation;
};
