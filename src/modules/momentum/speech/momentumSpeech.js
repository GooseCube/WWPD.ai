import { updateAgent } from "../../../firebase/firebaseDB";
import { fetchModelResponse } from "../../../modelAPI/fetchModelResponse";
import { agentPathfinder } from "../../agentMotion/agentPathfinder";
import { traverseAgentPath } from "../../agentMotion/traverseAgentPath";
import {
  initialMomentPrompt,
  agentDiscussionPrompt,
  delay,
  getRandomAgent,
  getRandomMeetingPlace,
  getRandomAudiencePosition,
  moveAgent,
  createUpdatedAgent,
  updateAgentState,
} from "./helperFunctions";

/**
 * This function will play out the discussion of the primary agents moment.
 * Each agent asked to participate will have have an opportunity to give their
 * feedback and based on their persona they will provide help with the given moment.
 * The primary agent will finally use all feedback to create and deliver a speech.
 * @param {object} agents, all agent data
 * @param {object} moment, specific moment
 * @param {string} aiModel, name of the ai model to prompt
 * @param {context setter} setAgents, setter for context passed from Sidebar
 */
export const momentumSpeech = async (agents, moment, aiModel, setAgents) => {
  // hold inital idea, all agent discussions, and final phase speech
  const conversations = [];
  let updatedPrimaryAgent;
  let primaryAgentInitialIdea;

  // Get a random meeting location, includes array of audience positions
  const speechLocation = getRandomMeetingPlace();

  // Set primaryAgent to playerControlled agent
  const primaryAgent = agents.find((agent) => agent.playerControlled === true);

  // New agent list with primaryAgent removed
  let agentList = agents.filter((agent) => agent.uid !== primaryAgent.uid);

  // const initialPrompt = initialMomentPrompt(primaryAgent, moment.initialPrompt);
  primaryAgentInitialIdea =
    "I'm creating a play about pirates! Do you think you can help with this?";

  // for (let index = 0; index < 3; ++index) {
  //   primaryAgentInitialIdea += await fetchModelResponse(
  //     aiModel,
  //     initialPrompt + primaryAgentInitialIdea
  //   );
  // }

  // Handle all agents in game, could be reduced using an index expression limiter
  while (agentList.length > 0) {
    // Grab an agent to talk to and remove them from the list
    let agent = getRandomAgent(agentList);
    agentList = agentList.filter((a) => a.uid !== agent.uid);

    // Moves primaryAgent to the agent position
    await moveAgent(primaryAgent, agent.x - 2, agent.y - 1, setAgents);

    updatedPrimaryAgent = createUpdatedAgent(
      primaryAgent,
      agent.x - 2,
      agent.y - 1,
      "right",
      `${agent.name}: ${primaryAgentInitialIdea}`
    );

    // This will initiate the text for momentResponse for primaryAgent
    updateAgentState(setAgents, updateAgent, updatedPrimaryAgent)
    await delay(3000);

    // Remove after testing complete
    let agentTestingResponse =
      "Love the idea, I can get started on helping you with that.";
    // Set up prompt for agent using primary agents idea and agents persona
    // let agentResponsePrompt = agentDiscussionPrompt(
    //   primaryAgent,
    //   agent,
    //   primaryAgentInitialIdea
    // );

    await updateAgent({
      ...agent,
      direction: "left",
      momentResponse: agentTestingResponse,
    });
    await delay(3000);

    if (speechLocation.audiencePositions.length > 0) {
      let agentAudiencePosition = getRandomAudiencePosition(
        speechLocation.audiencePositions
      );

      speechLocation.audiencePositions =
        speechLocation.audiencePositions.filter(
          (position) =>
            position.x !== agentAudiencePosition.x &&
            position.y !== agentAudiencePosition.y
        );

      let agentPath = await agentPathfinder(
        agent,
        agentAudiencePosition.x,
        agentAudiencePosition.y
      );
      // Filters the path object to container only 'state'
      let agentSimplifiedPath = agentPath.map((node) => node.state);
      // Moves the agent using the filtered path array
      await traverseAgentPath(agent, agentSimplifiedPath, setAgents);

      agent.x = agentAudiencePosition.x;
      agent.y = agentAudiencePosition.y;
      agent.direction = agentAudiencePosition.direction;
      let updatedAgent = { ...agent };

      await setAgents((prevAgents) =>
        prevAgents.map((a) => (a.uid === updatedAgent.uid ? updatedAgent : a))
      );

      await updateAgent({ ...updatedAgent });
    }
  }

  // ------------- Final Speech by Primary Agent -------------- //

  let finalSpeech;
  // Prompt model for final speech
  // for (let index = 0; index < 4; ++index) {
  // finalSpeech += fetch();
  // }

  let finalSpeechPath = await agentPathfinder(
    primaryAgent,
    speechLocation.primaryAgent.x,
    speechLocation.primaryAgent.y
  );
  // Filters the path object to container only 'state'
  let finalSpeechSimplifiedPath = finalSpeechPath.map((node) => node.state);
  // Moves the agent using the filtered path array
  await traverseAgentPath(primaryAgent, finalSpeechSimplifiedPath, setAgents);

  // Update primaryAgent's location
  primaryAgent.x = speechLocation.primaryAgent.x;
  primaryAgent.y = speechLocation.primaryAgent.y;
  primaryAgent.direction = speechLocation.primaryAgent.direction;
  // primaryAgent.momentResponse = `${primaryAgentInitialIdea}`;
  updatedPrimaryAgent = { ...primaryAgent };

  await setAgents((prevAgents) =>
    prevAgents.map((a) =>
      a.uid === updatedPrimaryAgent.uid ? updatedPrimaryAgent : a
    )
  );
  // Primary Agent will 'share' the idea
  await updateAgent(updatedPrimaryAgent);
};
