/**
 * Create a 'moment' that will start the agent conversations.
 * - instruction: what the model should do with the given context and question
 * - context: the basis of the agent interaction
 * - question: what the model should do with the given context
 */
export const townSquare = {
  initialPrompt: {
    title: "Town Square Brainstorming",
    instruction: "Answer the question using the given context and personality.",
    context: `You would like to give a talk at the next community meeting. 
      Create several topics and give a short paragraph that explains the topic.`,
    question: `What will your talk be about? Answer:`,
  },
  finalPrompt: {
    title: "Town Square Talk",
    instruction:
      "Answser the question using the given context, personality and conversation.",
    context: `You are given a conversation between people of a small community. Given the following conversation, use the primary idea to write a short essay which should include a thesis of the topic with at least three arguments and a conclusion. The more detailed the essay the more reward you earn from the community.`
  },
};
