/**
 * @param {object} message {id: string, prompt: string, response: string}
 * @returns a message with prompt and response
 */
function Message({ message, index }) {
  console.log("message: ", message);
  return (
    <div key={index} className="message">
      <div className="prompt">
        Prompt: {new Date(message.timestamp).toLocaleDateString("en-US")} <br />
        {message.prompt}
      </div>
      <div className="response">
        Response: {new Date(message.timestamp).toLocaleDateString("en-US")}{" "}
        <br />
        {message.response}
      </div>
    </div>
  );
}

export default Message;
