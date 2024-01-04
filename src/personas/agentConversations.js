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

import { pushNewMoment } from "../firebase/firebaseDB";
import { townSquare } from "./moments";
import mixtralAPI from "../modelAPI/mixtralAPI";

// Kick start the 'moment' using primaryAgent and initial prompt
const primaryAgentPrompt = (primaryAgent, moment) => {
  return `Instruction: ${moment.instruction} Context: ${moment.context} Personality: ${primaryAgent.personality}  Question: ${moment.question}`;
};

const primaryAgentFinalPrompt = (primaryAgent, moment, topic) => {
  return `Instruction: ${moment.instruction} Context: ${moment.context} Personality: ${primaryAgent.personality} Topic: ${topic}`;
};

const getFeedback = (primaryAgent, agent, primaryAgentIdea) => {
  const instruction = `Your name is ${agent.name} and you are ${agent.personality}. You have been greeted by ${primaryAgent.name} and will use the given context in your response to ${primaryAgent.name}.`;
  const context = `${primaryAgent.name} has an idea that they would like you to be a part of. Review the idea and offer some advice. You can participate or decline to participate in the idea. 
  Your advice should be a few sentences and will end with a period or question mark. Let ${primaryAgent.name} know if you want to be a part of their idea using complete sentences and how you will help if you decide to be part of the idea.`;
  const idea = `Idea: ${primaryAgentIdea}`;
  return `${instruction} Context: ${context} Idea: ${idea}`;
};

// Function to start a conversation with a focus on the chosen 'moment'
export const startAgentMoment = async (agents) => {
  let primaryAgent = agents.find((agent) => agent.playerControlled === true);

  let conversation = primaryAgent.name + ": ";
  let primaryAgentIdea = await mixtralAPI(
    primaryAgentPrompt(primaryAgent, townSquare.initialPrompt)
  );
  conversation += `${primaryAgentIdea}\n`;

  // Use Promise.all with map instead of forEach
  const responses = await Promise.all(
    agents.map(async (agent) => {
      // Generate a response based on the persona's personality
      if (agent.uid !== primaryAgent.uid) {
        let response = await mixtralAPI(
          getFeedback(primaryAgent, agent, primaryAgentIdea)
        );

        // Add the response to the conversation
        return `\n${agent.name}: ${response}\n`;
      }
    })
  );

  // Add all responses to the conversation
  conversation += responses.join("");

  const finalResult = await mixtralAPI(
    primaryAgentFinalPrompt(
      primaryAgent,
      townSquare.finalPrompt,
      primaryAgentIdea
    )
  );

  conversation += `${primaryAgent.name} Presents: ${finalResult}`;

  // Push Moment to Firebase
  pushNewMoment(townSquare.initialPrompt, conversation);
  console.log("Completed Moment: ", conversation);
};
