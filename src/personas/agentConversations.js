/**
 * The 'startAgentMoment' function is called from the Sidebar component.
 * Sidebar uses the 'DropdownSelector' in /Sidebar/sub-components/DropdownSelector
 * to display the 'moments' exported from /moments.js
 * The 'moment' and all 'agents' to be used are imported from Sidebar and
 * passed as a parameter to the 'startAgentMoment()' function.
 */

import { pushNewMoment, updateAgent } from "../firebase/firebaseDB";
import { fetchModelResponse } from "../modelAPI/fetchModelResponse";
// import mixtralAPI from "../modelAPI/mixtralAPI";

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
export const startAgentMoment = async (agents, moment, aiModel) => {
  const primaryAgent = agents.find((agent) => agent.playerControlled === true);

  let conversation = primaryAgent.name + ": ";
  const primaryAgentIdea = await fetchModelResponse(
    aiModel,
    primaryAgentPrompt(primaryAgent, moment.initialPrompt)
  );

  try {
    await updateAgent({ ...primaryAgent, momentResponse: primaryAgentIdea });
  } catch (error) {
    console.error("Failed to update primaryAgent moment response", error);
  }
  conversation += `${primaryAgentIdea}\n`;

  // Map the agents and get model response for each
  const responses = await Promise.all(
    agents.map(async (agent) => {
      // Generate a response based on the persona's personality
      if (agent.uid !== primaryAgent.uid) {
        let response = await fetchModelResponse(
          aiModel,
          getFeedback(primaryAgent, agent, primaryAgentIdea)
        );

        // Add the agents response to its Firebase properties
        try {
          await updateAgent({ ...agent, momentResponse: response });
        } catch (error) {
          console.error("Failed to update agent moment response", error);
        }

        // Add the response to the conversation
        return `\n${agent.name}: ${response}\n`;
      }
    })
  );

  // Add all responses to the conversation
  conversation += responses.join("");

  const finalResult = await fetchModelResponse(
    aiModel,
    primaryAgentFinalPrompt(primaryAgent, moment.finalPrompt, primaryAgentIdea)
  );

  conversation += `${primaryAgent.name} Presents: ${finalResult}`;

  // Push Moment to Firebase
  pushNewMoment(moment.initialPrompt, conversation);
  console.log("Completed Moment: ", conversation);
};
