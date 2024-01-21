export const emailFormatting = (conversation, to_email) => {
  const email = { toEmail: to_email, agent: "" };

  conversation.map((moment, index) => {
    if (index === 0) {
      email.agentName = moment.primaryAgent.name;
      email.initialPromptContext = moment.initialPrompt.context;
      email.initialPromptInstruction = moment.initialPrompt.instruction;
      email.initialPromptQuestion = moment.initialPrompt.question;
      email.initialResponse = moment.initialResponse;
    } else if (index === conversation.length - 1) {
      email.moment = moment.speech;
    } else {
      email.agent += `${moment.agent.name}: ${moment.agentResponse}`;
    }
  });

  return email;
};
