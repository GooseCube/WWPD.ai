/**
 * Create a 'moment' that will start the agent conversations.
 * Use the same structure as below and the new moment will be populated to the
 * dropdown list in the sidebar. It's that easy.
 */

export const digitalLiteracy = {
  title: "Digital Literacy",
  initialPrompt: {
    instruction:
      "Instruction: Answer the question using the given context and person but the most important thing to remember is that responses should be short and complete.",
    context:
      "Context: You are a digital literacy advocate preparing for a seminar. Create several topics and give a short paragraph that explains each topic.",
    question: "Question: What will your seminar be about?",
  },
  finalPrompt: {
    instruction:
      "Answer the question using the given context, personality and topic and keep the final response short and to the point.",
    context:
      "Given the following topic, choose one topic and write a short essay that introduces the topic, includes a thesis with at least three arguments and a conclusion.",
  },
};

export const healthyLiving = {
  title: "Healthy Living",
  initialPrompt: {
    instruction:
      "Instruction: Answer the question using the given context and person but the most important thing to remember is that responses should be short and complete.",
    context:
      "Context: You are a health coach preparing for a workshop on healthy living. Create several topics and give a short paragraph that explains each topic.",
    question: "Question: What will your workshop be about?",
  },
  finalPrompt: {
    instruction:
      "Instruction: Answer the question using the given context and person but the most important thing to remember is that responses should be short and complete.",
    context:
      "Given the following topic, choose one topic and write a short essay that introduces the topic, includes a thesis with at least three arguments and a conclusion.",
  },
};

export const pirates = {
  title: "Colonial Pirates",
  initialPrompt: {
    instruction:
      "Answer the question using the given context and persona but keep the response short and to the point.",
    context: `You are creating a script for a play about pirates. You will be the captain of a ship. The period of time will be the 1500's.
    Your home is the open sea, your ship is like a precious child to you, and your crew are the only family you need. It has been a while since your last pirate raid.
    You see a Spanish ship anchored off the coast of Florida. It is probably loading precious cargo.`,
    question: `How many Acts will the play have and what are the actors that will be in the play?`,
  },
  finalPrompt: {
    instruction:
      "Answer the question using the given context and persona but keep the response short and to the point.",
    context: `Write the script necessary to complete the given response and conversation between the other actors.
    Use the names given to create parts for each of the actors in this play.`,
  },
};

export const postApocalypticWorld = {
  title: "Post Apocalyptic World",
  initialPrompt: {
    instruction:
      "Answer the question using the given context and persona but keep the response short and to the point.",
    context:
      "Context: You are a survivor in a post-apocalyptic world. Create several scenarios and give a short paragraph that explains each scenario.",
    question: "Question: What scenario will you be living out?",
  },
  finalPrompt: {
    instruction:
      "Instruction: Answer the question using the given context and persona but keep the response short and to the point.",
    context:
      "Given the following scenario, choose one scenario and write a short narrative that introduces the scenario, includes a plot with at least three events and a conclusion.",
  },
};

export const sciFiMovie = {
  title: "Sci-Fi Movie",
  initialPrompt: {
    instruction:
      "Answer the question using the given context and persona but keep the response short and to the point.",
    context:
      "Context: You are an agent looking for a sci-fi movie or play role to act out. Create several character roles and give a short paragraph that explains each role.",
    question: "Question: What character role will you be acting out?",
  },
  finalPrompt: {
    instruction:
      "Instruction: Answer the question using the given context and person but the most important thing to remember is that responses should be short and complete.",
    context:
      "Given the following role, choose one role and write a short script that introduces the character, includes a plot with at least three events and a conclusion.",
  },
};

export const townSquare = {
  title: "Town Square",
  initialPrompt: {
    instruction:
      "Answer the question using the given context and persona but keep the response short and to the point.",
    context: `Context: You would like to give a talk at the next community meeting. 
      Create several topics and give a short paragraph that explains the topic.`,
    question: `Question: What will your talk be about?`,
  },
  finalPrompt: {
    instruction:
      "Answer the question using the given context and persona but keep the response short and to the point.",
    context: `Given the following topic, choose one topic and write a short essay that introduces the topic, includes a thesis with at least three arguments and a conclusion.`,
  },
};
