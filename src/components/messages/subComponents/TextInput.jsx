/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { pushNewMessage } from "../../../firebase/firebaseMessages";
import { fetchModelResponse } from "../../../modelAPI/fetchModelResponse";

const buildPrompt = (agent, userPrompt) => {
  const instruction = `Instruction: Answer the following prompt using the given persona.
  Persona: Your name is ${agent.name} and you are ${agent.age}.
  You have a career in ${agent.career} and ${agent.personality}.`;
  return `${instruction} Prompt: ${userPrompt}`;
};

/**
 * Function allows user to interact (chat) with the ai model.
 * Each user input creates a user 'prompt' and model 'response' which
 * is updated to Firebase. These messages trigger an event in Firebase
 * to update the active listener and display the new message.
 * @param {boolean} showInputArea
 * @param {boolean} isLoading
 * @returns
 */
function TextInput({
  showInputArea,
  isLoading,
  setIsLoading,
  sidebar,
  agents,
}) {
  const [userPrompt, setUserPrompt] = useState("");

  const handleInput = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsLoading(true);
      const agent = agents.find((a) => a.playerControlled === true);
      const response = await fetchModelResponse(
        sidebar.aiModel.title,
        buildPrompt(agent, userPrompt)
      );
      if (response) {
        // Check if the response is a URL
        const isUrl = (str) => {
          try {
            new URL(str);
            return true;
          } catch (_) {
            return false;
          }
        };

        let finalResponse = response;

        if (isUrl(response)) {
          // If the response is a URL, fetch the image and convert it to a Base64 string
          const imageResponse = await axios.get(response, {
            responseType: "blob",
          });
          const reader = new FileReader();
          reader.readAsDataURL(imageResponse.data);
          await new Promise((resolve) => {
            reader.onloadend = () => {
              finalResponse = reader.result;
              resolve();
            };
          });
        }

        // Save to Firebase messages
        await pushNewMessage(userPrompt, finalResponse, agent);
        // Clear the input & reset isLoading
        setUserPrompt("");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="input-container">
      {!isLoading && showInputArea && (
        <>
          <label htmlFor="prompt"></label>
          <textarea
            name="prompt"
            id="prompt"
            className="input-area"
            placeholder="Enter Prompt . . ."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleInput}
          />
        </>
      )}
    </div>
  );
}

export default TextInput;
