export const getLocationPrompt = (persona, worldState, locations) => {
  let { name, career, specialty, personality, state, details } = persona;
  let locationString = "";
  locations.forEach((actionLocation, index) => {
    locationString += `${index}. ${actionLocation}\n`;
  });
  let stateString = "";
  /*
  worldState.forEach((detail) => {
    stateString += `-${detail}\n`;
  });
  state.forEach((detail) => {
    stateString += `-${name} ${detail}\n`;
  });
  */

  let agentInfoString = "";
  agentInfoString += `- ${name} is a ${career}\n`;
  agentInfoString += `- ${name} says she ${specialty}\n`;
  agentInfoString += `- ${name} ${personality}\n`;
  /*
  details.forEach((detail) => {
    agentInfoString += `${name} ${detail}\n`;
  });
  */
  const prompt = `<instruct>\nGiven the following information on ${name}:\n- ${name} starts work at 8:00AM to 5:00PM\n- ${name} dances at night\n- ${name} loves to cook\n- <important> the kitchen is on fire </important>\n### And the state of the world is:\n- it is 7:50AM\n- ${name} is broke\n- ${name} is not hungry\n  </instruct>\n<query>\n#### Where should ${name} go based on these options:\n1. Work\n2. The dance club\n3. The kitchen\n</query>\n<answer>\n1. The kitchen\n<answer/>\n---------------------------------------\n<instruct>\nGiven the following information on ${name}:\n- ${name} starts work at 8:00AM to 5:00PM\n- ${name} dances at night\n- ${name} loves to cook\n### And the state of the world is:\n- it is 7:50AM\n- ${name} is broke\n- ${name} is not hungry\n  </instruct>\n<query>\n#### Where should ${name} go based on these options:\n1. Work\n2. The dance club\n3. The kitchen\n</query>\n<answer>\n1. Work\n<answer/>\n---------------------------------------\n<instruct>\nGiven the following information on ${name}:\n${agentInfoString}\n### And the state of the world is:\n${stateString}\n</instruct>\n<query>\n#### Where should ${name} go based on these options:\n${locationString}\n</query>\n<answer>\n`;
  return prompt;
};

export const getActionPrompt = (persona, worldState, location) => {
  let { name, career, specialty, personality, state, details } = persona;
  let stateString = "";
  /*
  worldState.forEach((detail) => {
    stateString += `-${detail}\n`;
  });
  state.forEach((detail) => {
    stateString += `-${name} ${detail}\n`;
  });
  */

  let agentInfoString = "";
  agentInfoString += `- ${name} is a ${career}\n`;
  agentInfoString += `- ${name} says she ${specialty}\n`;
  agentInfoString += `- ${name} ${personality}\n`;
  /*
  details.forEach((detail) => {
    agentInfoString += `${name} ${detail}\n`;
  });
  */
  const prompt = `<instruct>\nGiven the following events:\n- ${name} starts work at 8:00AM to 5:00PM\n- ${name} dances at night\n- ${name} loves to cook\n- <important> the kitchen is on fire </important>\n\n### And the following information:\n\n- it is 7:50AM\n- ${name} is broke\n- ${name} is not hungry\n- <important> ${name} is in the kitchen </important>\n\n<query> \nWhat is ${name} doing?\n</query>\n</instruct>\n\n<answer>\n${name} is putting out a fire in the kitchen.\n<answer/>\n---------------------------------------\n<instruct>\nGiven the following events:\n- ${name} starts work at 8:00AM to 5:00PM\n- ${name} dances at night\n- ${name} loves to cook\n\n### And the following information:\n\n- it is 7:50AM\n- ${name} is broke\n- ${name} is not hungry\n- <important> ${name} is at work </important>\n\n<query> \nWhat is ${name} doing?\n</query>\n</instruct>\n\n<answer>\n${name} is working.\n<answer/>\n---------------------------------------\n<instruct>\nGiven the following events:\n- ${name} starts work at 8:00AM\n- ${name} loves to cook\n- ${name} loves dancing\n\n### And the following information:\n\n- it is 7:50PM\n- ${name} is bored\n- ${name} is hungry\n- <important> ${name} broke their leg </important>\n- <important> ${name} is at the hospital <important>\n<query> \nWhat is ${name} doing?\n</query>\nWhat is ${name} doing?\n</query>\n</instruct>\n\n<answer>\n${name} is putting out a fire in the kitchen.\n<answer/>\n---------------------------------------\n<instruct>\nGiven the following events:\n- ${name} starts work at 8:00AM to 5:00PM\n- ${name} dances at night\n- ${name} loves to cook\n\n### And the following information:\n\n- it is 7:50AM\n- ${name} is broke\n- ${name} is not hungry\n- <important> ${name} is at work </important>\n\n<query> \nWhat is ${name} doing?\n</query>\n</instruct>\n\n<answer>\n${name} is working.\n<answer/>\n---------------------------------------\n<instruct>\nGiven the following events:\n${agentInfoString}\n### And the following information:\n${stateString}\n<important>${name} is at ${location}</important>\n<query> \nWhat is ${name} doing?\n</query>\n</instruct>\n\n<answer>`;
  return prompt;
};

export const getEmojiPrompt = (persona, action) => {
  let { name } = persona;
  const prompt = `<instruct>\nGiven the following statement:\n${name} is putting out a fire in their kitchen.\n\nReturn only 2 emojis that represent the statement.\n</instruct>\n\n<answer>\n🧯🍳\n<answer/>\n---------------------------------------\n<instruct>\nGiven the following statement:\n\n${name} is at work.\n\nReturn only 2 emojis that represent the statement.\n</instruct>\n\n<answer>\n👔🖥️\n<answer/>\n---------------------------------------\n<instruct>\nGiven the following statement:\n\n${action}\n\nReturn only 2 emojis that represent the statement.\n</instruct>\n\n<answer>`;
  return prompt;
};
