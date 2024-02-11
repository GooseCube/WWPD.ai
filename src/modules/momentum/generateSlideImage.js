import stabilityaiXLAPI from "../../modelAPI/stabilityaiXLAPI"

const createImagePrompt = (agent) => {
  console.log("Image: agent.agentResponse", agent.momentResponse)
  return `Generate an image that best represents the the following idea: ${agent.agentResponse}`
}

export const generateSlideImage = async (agent, speech) => {
  const prompt = createImagePrompt(agent)
  const image = await stabilityaiXLAPI(prompt)
  speech.images.push(image);
}