import { useState } from "react";
import mixtralAPI from "../../../modelAPI/mixtralAPI";

/**
 * Use API call to Model. The API Model response should
 * then update the messages[]
 */
function TextInput({ showInputArea, isLoading }) {
  const [userInput, setUserInput] = useState("");

  const handleInput = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent the addition of a new line in the textarea
      console.log("user input: ", userInput);
      mixtralAPI(userInput)

      // Clear the input
      setUserInput("");
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
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleInput}
          />
        </>
      )}
    </div>
  );
}

export default TextInput;
