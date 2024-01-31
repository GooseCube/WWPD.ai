import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  XCircle,
  ChevronDoubleRight,
  ChevronDoubleLeft,
} from "react-bootstrap-icons";
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

function AgentCards({ setShowAgentCards }) {
  const [editAgent, setEditAgent] = useState(null);
  const { agents } = useContext(AuthContext);
  const [cardIndex, setCardIndex] = useState(0);
  const [maxViews, setMaxViews] = useState(5);

  return (
    <div className="agent-card-container">
      {cardIndex > 0 && (
        <div
          className="arrow-card"
          onClick={() => goLeft(cardIndex, setCardIndex)}>
          <ChevronDoubleLeft className="chevron-left" />
        </div>
      )}
      {agents && (
        <div className="cards-container">
          <Cards
            agents={agents}
            cardIndex={cardIndex}
            maxViews={maxViews}
            editAgent={editAgent}
            setEditAgent={setEditAgent}
          />
        </div>
      )}

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={"tooltip-top"}>Close</Tooltip>}>
        <div className="open-close-container">
          <XCircle
            className="open-close-icon"
            onClick={() => setShowAgentCards(false)}
          />
        </div>
      </OverlayTrigger>

      <div
        className="arrow-card"
        onClick={() =>
          goRight(Object.keys(agents).length, cardIndex, setCardIndex)
        }>
        <ChevronDoubleRight className="chevron-right" />
      </div>
    </div>
  );
}

export default AgentCards;
