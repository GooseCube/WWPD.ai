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
      "Answser the question using the given context, personality and topic.",
    context: `Given the following topic, choose one topic and write a short essay that introduces the topic, includes a thesis with at least three arguments and a conclusion.`,
  },
};
