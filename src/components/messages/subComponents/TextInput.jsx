import { useState } from "react";
import mixtralAPI from "../../../modelAPI/mixtralAPI";
import { pushNewMessage } from "../../../firebase/firebaseDB";

/**
 * Use API call to Model. The API Model response should
 * then update the messages[]
 */
function TextInput({ showInputArea, isLoading }) {
  const [userPrompt, setUserPrompt] = useState("");

  const handleInput = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent the addition of a new line in the textarea
      const response = await mixtralAPI(userPrompt);
      if (response) {
        await pushNewMessage(userPrompt, response);
        // Clear the input
        setUserPrompt("");
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
