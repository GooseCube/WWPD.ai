import { moveAgent } from "./speechModules/helperFunctions";
import { getAgentActions } from "../../modelAPI/actionAPI";

export const disperseAgents = async (
  agents,
  setAgents,
  speechLocation = ""
) => {
  try {
    const agentActions = await getAgentActions(agents, speechLocation);
    agentActions.forEach(async (action) => {
      const { agent, coordinate, actionDescription, emojis } = action;
      console.log(`${agent.name} action: ${actionDescription} `);
      agent.momentResponse = emojis;
      await moveAgent(agent, coordinate.x, coordinate.y, setAgents);
    });
  } catch (error) {
    console.error(
      "Error while generating non attending agent responses\n",
      error
    );
  }
};
