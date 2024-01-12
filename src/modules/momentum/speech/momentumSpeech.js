import { agentEmojis } from "../../emoji/emojis";
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
  const primaryAgent = agents.find((agent) => agent.playerControlled === true);
  const speechLocation = getRandomMeetingPlace();
  const conversations = [];

  let agentList = agents.filter((agent) => agent.uid !== primaryAgent.uid);
  let updatedPrimaryAgent = null;
  let primaryAgentInitialIdea = null;
  let primaryAgentFinalSpeech = null;

  // New agent list with primaryAgent removed

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
    updateAgentState(setAgents, updateAgent, updatedPrimaryAgent);
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

    // Local state context is not updated here as agent does not move on {x, y}
    // This update initiates agent response in text bubble
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

      await moveAgent(
        agent,
        agentAudiencePosition.x,
        agentAudiencePosition.y,
        setAgents
      );

      let updatedAgent = createUpdatedAgent(
        agent,
        agentAudiencePosition.x,
        agentAudiencePosition.y,
        agentAudiencePosition.direction,
        `${agent.name} ${agentEmojis.sleep[0]}`
      );

      updateAgentState(setAgents, updateAgent, updatedAgent);
    }
  }

  // ------------- Final Speech by Primary Agent -------------- //

  // Prompt model for final speech
  // for (let index = 0; index < 4; ++index) {
  // primaryAgentFinalSpeech += await fetch();
  // }

  await moveAgent(
    primaryAgent,
    speechLocation.primaryAgent.x,
    speechLocation.primaryAgent.y,
    setAgents
  );

  updatedPrimaryAgent = createUpdatedAgent(
    primaryAgent,
    speechLocation.primaryAgent.x,
    speechLocation.primaryAgent.y,
    speechLocation.primaryAgent.direction,
    "I made it, thank you for waiting. And now without further ado, let's get started . . ."
    // primaryAgentFinalSpeech
  );

  updateAgentState(setAgents, updateAgent, updatedPrimaryAgent);

  // let finalSpeechPath = await agentPathfinder(
  //   primaryAgent,
  //   speechLocation.primaryAgent.x,
  //   speechLocation.primaryAgent.y
  // );
  // Filters the path object to container only 'state'
  // let finalSpeechSimplifiedPath = finalSpeechPath.map((node) => node.state);
  // Moves the agent using the filtered path array
  // await traverseAgentPath(primaryAgent, finalSpeechSimplifiedPath, setAgents);

  // Update primaryAgent's location
  // primaryAgent.x = speechLocation.primaryAgent.x;
  // primaryAgent.y = speechLocation.primaryAgent.y;
  // primaryAgent.direction = speechLocation.primaryAgent.direction;
  // primaryAgent.momentResponse = `${primaryAgentInitialIdea}`;
  // updatedPrimaryAgent = { ...primaryAgent };

  // await setAgents((prevAgents) =>
  //   prevAgents.map((a) =>
  //     a.uid === updatedPrimaryAgent.uid ? updatedPrimaryAgent : a
  //   )
  // );
  // Primary Agent will 'share' the idea
  // await updateAgent(updatedPrimaryAgent);
};
