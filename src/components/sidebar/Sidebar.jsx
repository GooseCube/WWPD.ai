/* eslint-disable react/prop-types */
import { useContext, useState } from "react";

// Global Context Provider
import { useShow } from "../contextProviders/ShowProvider";

// Bootstrap Styles
import { Button, Offcanvas } from "react-bootstrap";
import { ChevronDoubleRight, ChevronDoubleLeft } from "react-bootstrap-icons";

// Firebase
import { updateSidebar } from "../../firebase/firebaseSidebar";

// Sidebar Sub Components
import DropdownSelector from "./sub-components/DropdownSelection";
import SidebarHeader from "./sub-components/SidebarHeader";
import ButtonSelection from "./sub-components/ButtonSelection";
import AgentProfile from "./sub-components/AgentProfile";

// Outside Component Imports
import { FirebaseContext } from "../contextProviders/FirebaseProvider";
import * as moments from "../../modules/momentum/speechModules/moments";
import { momentumSpeech } from "../../modules/momentum/momentumSpeech";
import ImageScreen from "../visuals/ImageScreen";

// CSS Styles for Sidebar
import "./styles/styles.css";

// Asset Images (icons)
import app_icon from "../../assets/sidebar/app_icon.png";
import essay from "../../assets/sidebar/essay.png";
import idea from "../../assets/sidebar/idea.png";
import message from "../../assets/sidebar/message.png";
import { getRandomMeetingPlace } from "../../modules/momentum/speechModules/helperFunctions";

function Sidebar() {
  const { show, dispatch } = useShow();
  const { agents, sidebar, setAgents } = useContext(FirebaseContext);
  const [showArrowButton, setShowArrowButton] = useState(true);
  const [overlayImages, setOverlayImages] = useState([]);
  const [screenStyles, setScreenStyles] = useState({});
  const [overlayStyles, setOverlayStyles] = useState({});
  const [showImageScreen, setShowImageScreen] = useState(false);

  // Begin agent conversation given the selected moment name
  // And pass down the required ImageScreen objects to display
  // the AI rendered images at the end of the moment
  const handleMomentConversation = async (event, moment) => {
    event.preventDefault();

    if (sidebar.aiModel.title !== "StabilityXL") {
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
    } else {
      alert(
        "A Moment requires a chat model is selected. Please change the model to Mistral, Mixtral, or Zephyr."
      );
    }
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
      <div className="sidebar-outer-container">
        <Button
          className="arrow-button"
          // variant="success"
          onClick={() => setShowArrowButton(!showArrowButton)}>
          {showArrowButton ? (
            <ChevronDoubleLeft className="chevron-double-left" />
          ) : (
            <ChevronDoubleRight className="chevron-double-right" />
          )}
        </Button>
        <Offcanvas
          className="offcanvas-container"
          show={showArrowButton}
          onHide={() => setShowArrowButton(!showArrowButton)}>
          <Offcanvas.Header closeButton>
            <SidebarHeader icon={app_icon} />
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex flex-column">
            <ButtonSelection
              buttonText="Interface"
              image={message}
              altText="open message interface button"
              show={show.interface}
              showProviderType="SET_INTERFACE"
              dispatch={dispatch}
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
                { title: "Mistral", type: "chat" },
                { title: "Mixtral", type: "chat" },
                { title: "Zephyr", type: "chat" },
                { title: "StabilityXL", type: "txt2img" },
              ]}
            />
            <ButtonSelection
              buttonText="Documentation"
              image={essay}
              altText="open documentation button"
              show={show.documentation}
              showProviderType="SET_SHOW_DOCUMENTATION"
              dispatch={dispatch}
            />
            <AgentProfile agents={agents} show={show} dispatch={dispatch} />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default Sidebar;
