/* eslint-disable react/prop-types */
import { useState } from "react";
import { pushNewMessage } from "../../../firebase/firebaseMessages";
import { fetchModelResponse } from "../../../modelAPI/fetchModelResponse";
import { firebaseTxt2Img } from "../../../modelAPI/modules/firebaseTxt2ImgURL";

const buildPrompt = (agent, userPrompt) => {
  const instruction = `Instruction: Answer the following prompt using the given persona and prompt.
  Persona: Your career is ${agent.career} and persona is ${agent.personality}.`;
  return `${instruction} Prompt: ${userPrompt}`;
};

/**
 * Function allows user to interact (chat) with the ai model.
 * Each user input creates a user 'prompt' and model 'response' which
 * is updated to Firebase. These messages trigger an event in Firebase
 * to update the active listener and display the new message.
 */
function TextInput({ show, dispatch, sidebar, agents }) {
  const [userPrompt, setUserPrompt] = useState("");

  const handleInput = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Flag will remove text input while fetching the call and
      // display loading animation for user feedback
      dispatch({ type: "SET_IS_LOADING", payload: true });
      const agent = agents.find((a) => a.playerControlled === true);

      try {
        let response = await fetchModelResponse(
          sidebar.aiModel.title,
          buildPrompt(agent, userPrompt)
        );

        if (response) {
          let finalResponse = response;

          // Check if the response is a URL
          const isUrl = (str) => {
            try {
              new URL(str);
              return true;
            } catch (_) {
              return false;
            }
          };

          if (isUrl(response)) {
            finalResponse = await firebaseTxt2Img(response);
            console.log("URL Test: ", isUrl(finalResponse))
          } else {
            response += await fetchModelResponse(
              sidebar.aiModel.title,
              buildPrompt(agent, userPrompt) + "\n" + response
            );
          }

          // Save to Firebase messages
          await pushNewMessage(userPrompt, finalResponse, agent);
          // Clear the input & reset isLoading
          setUserPrompt("");
          dispatch({ type: "SET_IS_LOADING", payload: false });
        } else {
          dispatch({ type: "SET_IS_LOADING", payload: false });
          throw new Error(`Error handling text prompt fetch`);
        }
      } catch (error) {
        console.log(
          `Text Input error ocurred while fetching response ${error}`
        );
      }
    }
  };

  return (
    <div className="input-container">
      {!show.isLoading && show.inputArea && (
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
