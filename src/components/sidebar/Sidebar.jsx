import React, { useContext, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { ChevronDoubleRight, ChevronDoubleLeft } from "react-bootstrap-icons";

// Sidebar Sub Components
import DropdownSelector from "./sub-components/DropdownSelection";
import SidebarHeader from "./sub-components/SidebarHeader";
import ButtonSelection from "./sub-components/ButtonSelection";
import AgentProfile from "./sub-components/AgentProfile";

// Outside Component Imports
import { AuthContext } from "../../firebase/AuthProvider";
import * as moments from "../../modules/momentum/moments";
import { momentumSpeech } from "../../modules/momentum/speech/momentumSpeech";
import ImageScreen from "../visuals/ImageScreen";

// CSS Styles for Sidebar
import "./styles/styles.css";

// Asset Images (icons)
import app_icon from "../../assets/sidebar/app_icon.png";
import idea from "../../assets/sidebar/idea.png";
import essay from "../../assets/sidebar/essay.png";
import message from "../../assets/sidebar/message.png";
import { updateSidebar } from "../../firebase/firebaseDB";
import { getRandomMeetingPlace } from "../../modules/momentum/speech/helperFunctions";

function Sidebar({
  showInterface,
  setShowInterface,
  showEmailForm,
  setShowEmailForm,
  showAgentCards,
  setShowAgentCards,
}) {
  const { agents, sidebar, setAgents } = useContext(AuthContext);
  const [show, setShow] = React.useState(false);
  const [overlayImages, setOverlayImages] = useState([]);
  const [screenStyles, setScreenStyles] = useState({});
  const [overlayStyles, setOverlayStyles] = useState({});
  const [showImageScreen, setShowImageScreen] = useState(false);

  // Begin agent conversation given the selected moment name
  const handleMomentConversation = async (event, moment) => {
    event.preventDefault();

    const meetingPlace = getRandomMeetingPlace();

    // Set the styles for Projector Screen
    setScreenStyles(meetingPlace.screenStyles);
    setOverlayStyles(meetingPlace.overlayStyles);
    // Set the Images to be used according to the type of 'moment' selected
    setOverlayImages(moment.images);

    // Show Screen for Testing Purposes
    momentumSpeech(
      agents,
      moment,
      sidebar.aiModel.title,
      setAgents,
      meetingPlace,
      setShowImageScreen
    );
  };

  // Updates Firebase with the selected ai model name
  const handleChangeAiModel = (event, ai_model) => {
    event.preventDefault();
    updateSidebar({ aiModel: ai_model });
  };

  return (
    <>
      {showImageScreen && (
        <ImageScreen
          overlayImages={overlayImages}
          screenStyles={screenStyles}
          overlayStyles={overlayStyles}
        />
      )}
      <div className="sidebar-outer-container w-25">
        <Button
          className="arrow-button"
          variant="primary"
          onClick={() => setShow(!show)}>
          {show ? <ChevronDoubleLeft /> : <ChevronDoubleRight />}
        </Button>
        <Offcanvas
          className="offcanvas-container"
          show={show}
          onHide={() => setShow(!show)}>
          <Offcanvas.Header closeButton>
            <SidebarHeader />
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex flex-column">
            <ButtonSelection
              buttonText="Interface"
              image={essay}
              altText="input interface button"
              useStateParam={showInterface}
              handleStateEvent={setShowInterface}
            />
            <DropdownSelector
              buttonTitle="Moment"
              image={idea}
              dropdownEvent={handleMomentConversation}
              listItems={Object.values(moments)}
            />

            <DropdownSelector
              className="dropdown-selector"
              buttonTitle="AI Models"
              image={app_icon}
              dropdownEvent={handleChangeAiModel}
              listItems={[
                { title: "Mistral" },
                { title: "Mixtral" },
                { title: "Zephyr" },
                { title: "StabilityXL"}
              ]}
            />
            <ButtonSelection
              buttonText="Email Moments"
              image={message}
              altText="email interface button"
              useStateParam={showEmailForm}
              handleStateEvent={setShowEmailForm}
            />
            <AgentProfile
              agents={agents}
              showAgentCards={showAgentCards}
              setShowAgentCards={setShowAgentCards}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default Sidebar;
