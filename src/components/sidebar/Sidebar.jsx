import React, { useContext, useEffect } from "react";
import { Button, Image, Offcanvas } from "react-bootstrap";
import { ChevronDoubleRight, ChevronDoubleLeft } from "react-bootstrap-icons";

// Sidebar Sub Components
import DropdownSelector from "./sub-components/DropdownSelection";
import ButtonSelection from "./sub-components/ButtonSelection";
import AgentProfile from "./sub-components/AgentProfile";

// Outside Component Imports
import { AuthContext } from "../../firebase/AuthProvider";
import { startAgentMoment } from "../../personas/agentConversations";
import * as moments from "../../personas/moments";

// CSS Styles for Sidebar
import "./styles/styles.css";

// Asset Images (icons)
import app_icon from "../../assets/sidebar/app_icon.png";
import ai from "../../assets/sidebar/ai.png";
import idea from "../../assets/sidebar/idea.png";
import ai_model from "../../assets/sidebar/ai_model.png";
import image from "../../assets/sidebar/image.png";
import video from "../../assets/sidebar/video.png";
import { updateSidebar } from "../../firebase/firebaseDB";

function Sidebar({ showInterface, setShowInterface }) {
  const { agents, sidebar } = useContext(AuthContext);
  const [show, setShow] = React.useState(false);

  // Begin agent conversation given the selected moment name
  const handleMomentConversation = (event, moment) => {
    event.preventDefault();
    startAgentMoment(agents, moment, sidebar.aiModel.title);
  };

  // Updates Firebase with the selected ai model name
  const handleChangeAiModel = (event, ai_model) => {
    event.preventDefault();
    updateSidebar({ aiModel: ai_model });
  };

  return (
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
          <Offcanvas.Title className="fs-6">
            <Image className="app-icon-img" src={app_icon} /> Generative Agent Moment Environment
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column ">
          <ButtonSelection
            buttonText="Interface"
            image={ai}
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
            buttonTitle="AI Model"
            image={ai_model}
            dropdownEvent={handleChangeAiModel}
            listItems={[
              { title: "Mistral" },
              { title: "Mixtral" },
              { title: "Zephyr" },
            ]}
          />
          {/* <ButtonSelection
            buttonText="Image"
            image={image}
            altText="open image view"
            // useStateParam={}
            // handleStateEvent={}
          /> */}
          {/* <ButtonSelection
            buttonText="Video"
            image={video}
            altText="open video viewer"
            // useStateParam={}
            // handleStateEvent={}
          /> */}
          <AgentProfile agents={agents} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;
