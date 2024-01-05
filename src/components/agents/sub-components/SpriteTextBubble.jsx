
function SpriteTextBubble({ agent }) {

  return (
    <div className="sprite-name-container">
      {
       `${agent.name}: ${agent.momentResponse}`
      }
    </div>
  )
}

export default SpriteTextBubble;