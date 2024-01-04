import { useState } from "react";
import mixtralAPI from "../../../modelAPI/mixtralAPI";
import { pushNewMessage } from "../../../firebase/firebaseDB";

/**
 * Function allows user to interact (chat) with the ai model.
 * Each user input creates a user 'prompt' and model 'response' which
 * is updated to Firebase. These messages trigger an event in Firebase
 * to update the active listener and display the new message. 
 * @param {boolean} showInputArea
 * @param {boolean} isLoading
 * @returns 
 */
function TextInput({ showInputArea, isLoading, setIsLoading }) {
  const [userPrompt, setUserPrompt] = useState("");

  const handleInput = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent the addition of a new line in the textarea
      setIsLoading(true)
      const response = await mixtralAPI(userPrompt);
      if (response) {
        await pushNewMessage(userPrompt, response);
        // Clear the input
        setUserPrompt("");
        setIsLoading(false)
      }
      else {
        setIsLoading(false)
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
