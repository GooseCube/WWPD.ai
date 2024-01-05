/**
 * Create a 'moment' that will start the agent conversations.
 * - instruction: what the model should do with the given context and question
 * - context: the basis of the agent interaction
 * - question: what the model should do with the given context
 */

export const townSquare = {
  title: "Town Square",
  initialPrompt: {
    instruction: "Answer the question using the given context and personality.",
    context: `You would like to give a talk at the next community meeting. 
      Create several topics and give a short paragraph that explains the topic.`,
    question: `What will your talk be about? Answer:`,
  },
  finalPrompt: {
    instruction:
      "Answser the question using the given context, personality and topic.",
    context: `Given the following topic, choose one topic and write a short essay that introduces the topic, includes a thesis with at least three arguments and a conclusion.`,
  },
};

export const pirates = {
  title: "Colonial Pirates",
  initialPrompt: {
    instruction: "Answer the question using the given context and personality.",
    context: `You are creating a script for a play about pirates. You will be the captain of a ship. The period of time will be the 1500's.
    Your home is the open sea, your ship is like a son, and your crew are your family. It has been a while since your last pirate raid.
    You see a Spanish ship anchored off the coast of Florida. It is probably loading precious cargo.`,
    question: `Will you take your ship and crew to raid the Spanish ship while anchored or will you wait until it is in open water?`,
  },
  finalPrompt: {
    instruction:
      "Answser the question using the given context, personality and responses from others that want to be part of this play.",
    context: `Write the script necessary to complete the given response and conversation between the other actors.
    Use the names given to create parts for each of the actors in this play.`,
  },
};
