function Cards(agents, cardIndex, maxViews) {
  const temp = [];
  let count = 0;

  // Push all agents to temp[] array
  Object.values(agents).map((agent, index) => {
    temp.push(
      <div className="agent-persona-card border rounded p-2" key={index}>
        <h2>{agent.name}</h2>
        <div
          className="agent-sprite-image"
          style={{
            backgroundImage: `url(../../assets/characters/${agent.sprite})`,
            width: "32px",
            height: "32px",
          }}
        />
        <p>Age: {agent.age}</p>
        <p>Career: {agent.career}</p>
        <p>Personality: {agent.personality}</p>
      </div>
    );
  });

  return temp.map((card, index) => {
    if (index >= cardIndex && count <= maxViews) {
      ++count;
      return card;
    }
    return null;
  })
}

export default Cards;