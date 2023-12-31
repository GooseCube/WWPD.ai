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


/**
 * - Moment: a moment is an action you would like the model to take. It
 *    should include some context about the action and a question related
 *    to the given context to resolve the requested moment.
 * - Context: Give the model some context surrounding the 'moment' you would like to see
 * - Question: Give the model a question to spark a response using the provided context
 * @param {string} context
 * @param {string} question
 * @returns the concatenated string used to begin the moment conversation
 */
const momentPrompt = function combineInstructionContextQuestion(
  agent,
  context,
  question
) {
  const instruction = "Answer the question using the given context below.";
  return `${instruction} Context: ${context} Question: ${question}`;
};

/**
 * After the primaryAgent has been given a response 'moment' they will pass
 * on this information to each of the agents in the game and wait for a
 * response.
 * @param {player persona} primaryAgent 
 * @param {player persona} agent 
 * @param {string} moment 
 * @returns 
 */
const nudgeAgent = function askEachAgentToEvaluateMoment(
  primaryAgent,
  agent,
  moment
) {
  const instruction = `Your name is ${agent.name} and you are ${agent.personality}. You have been greeted by ${primaryAgent.name} and will use the given context in your response to ${primaryAgent.name}.`;
  const context = `${primaryAgent.name} has an idea that they would like you to be a part of. Review the idea and offer some advice. You can participate or decline to participate in the idea. Your advice should be at least two sentences and you will tell ${primaryAgent.name} if you want to be a part of their idea.`;
  return `${instruction} Context: ${context} Idea: ${moment}`;
};
