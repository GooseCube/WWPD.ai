/**
 * Create a 'moment' that will start the agent conversations.
 * - instruction: what the model should do with the given context and question
 * - context: the basis of the agent interaction
 * - question: what the model should do with the given context
 */
export const townSquare = {
  initialPrompt: {
    title: "Town Square Talk",
    instruction: "Answer the question using the given context and personality.",
    context: `You would like to give a talk at the next community meeting. 
      Create several topics and give a short paragraph that explains the topic.`,
    question: `What will your talk be about? Answer:`,
  },
};
