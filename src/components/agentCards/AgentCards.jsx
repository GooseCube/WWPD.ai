/* eslint-disable react/prop-types */
// React
import { useContext, useState } from "react";

// Context Providers
import { FirebaseContext } from "../contextProviders/FirebaseProvider";
import { useShow } from "../contextProviders/ShowProvider";

// Sub Components
import Cards from "./subComponents/Cards";

// Styles
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  XCircle,
  ChevronDoubleRight,
  ChevronDoubleLeft,
} from "react-bootstrap-icons";
import "./styles/styles.css";

// Decrement Card Array Index
const goLeft = function decrementCardIndex(cardIndex, setCardIndex) {
  if (cardIndex > 0) {
    setCardIndex((prevIndex) => prevIndex - 1);
  }
};

// Increment Card Array Index
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
  const { agents, setAgents } = useContext(FirebaseContext);
  const { show, dispatch } = useShow();
  const [editAgent, setEditAgent] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const MAX_CARD_VIEWS = 5;

  return (
    show.agentCards && (
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
              setAgents={setAgents}
              cardIndex={cardIndex}
              setCardIndex={setCardIndex}
              MAX_CARD_VIEWS={MAX_CARD_VIEWS}
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
              onClick={() =>
                dispatch({ type: "SET_AGENT_CARDS", payload: !show.agentCards })
              }
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
    )
  );
}

export default AgentCards;
