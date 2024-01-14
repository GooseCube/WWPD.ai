import { useContext, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import { ChevronDoubleRight, ChevronDoubleLeft } from "react-bootstrap-icons";
import "./styles/styles.css";

const goLeft = function decrementCardIndex(cardIndex, setCardIndex) {
  if (cardIndex > 0) {
    setCardIndex((prevIndex) => prevIndex - 1);
  }
};

const goRight = function incrementCardIndex(
  arrayLength,
  cardIndex,
  setCardIndex
) {
  if (cardIndex < arrayLength - 1) {
    setCardIndex((prevIndex) => prevIndex + 1);
  }
};

function AgentCards() {
  const { agents } = useContext(AuthContext);
  const [cardIndex, setCardIndex] = useState(0);

  return (
    <div className="agent-card-container">
      <div className="arrow-card">
        <ChevronDoubleLeft className="chevron-left" />
      </div>
      {agents &&
        Object.values(agents).map((agent, index) => {
          if (index < 6) {
            return (
              <div
                className="agent-persona-card border rounded p-2"
                key={agent.name}>
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
          }
        })}

      <div className="arrow-card">
        <ChevronDoubleRight className="chevron-right" />
      </div>
    </div>
  );
}

export default AgentCards;
