import { useContext, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import { ChevronDoubleRight, ChevronDoubleLeft } from "react-bootstrap-icons";
import Cards from "./subComponents/Cards";
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
  const [maxViews, setMaxViews] = useState(5);

  return (
    <div className="agent-card-container">
      <div className="arrow-card">
        <ChevronDoubleLeft
          className="chevron-left"
          onClick={() => goLeft(cardIndex, setCardIndex)}
        />
      </div>
      {agents && (
        <div className="cards-container">
          <Cards agents={agents} cardIndex={cardIndex} maxViews={maxViews} />
        </div>
      )}

      <div className="arrow-card">
        <ChevronDoubleRight
          className="chevron-right"
          onClick={() =>
            goRight(Object.keys(agents).length, cardIndex, setCardIndex)
          }
        />
      </div>
    </div>
  );
}

export default AgentCards;
