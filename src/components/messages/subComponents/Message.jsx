/**
 * @param {object} message {id: string, prompt: string, response: string}
 * @returns a message with prompt and response
 */
function Message({ message, index }) {
  return (
    <div key={index} className="message">
      <div className="prompt">{message.prompt}</div>
      <div className="response">{message.response}</div>
    </div>
  );
}

export default Message;
