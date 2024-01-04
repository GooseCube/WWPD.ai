import React, { useContext, useEffect } from "react";
import { Button, Image, Offcanvas } from "react-bootstrap";
import {
  ChevronDoubleRight,
  ChevronDoubleLeft,
} from "react-bootstrap-icons";

// Outside Component Imports
import { startAgentMoment } from "../../personas/agentConversations";
import { AuthContext } from "../../firebase/AuthProvider"

// Custom Sidebar Components
import DropdownSelection from "./sub-components/DropdownSelection";
import ButtonSelection from "./sub-components/ButtonSelection";

// CSS Styles for Sidebar
import app_icon from "../../assets/sidebar/app_icon.png";
import ai from "../../assets/sidebar/ai.png";
import idea from "../../assets/sidebar/idea.png";
import image from "../../assets/sidebar/image.png";
import video from "../../assets/sidebar/video.png"
import "./styles/styles.css";

function Sidebar({ showInterface, setShowInterface }) {
  const { agents } = useContext(AuthContext)
  const [show, setShow] = React.useState(false);

  const handleMomentConversation = (event) => {
    event.preventDefault();
    startAgentMoment(agents);
  }

  return (
    <div className="sidebar-outer-container">
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
          <Offcanvas.Title>
            <Image className="app-icon-img" src={app_icon} /> Generative Agents
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
          <DropdownSelection image={idea} 
            dropdownItems=""
            dropdownEvent={handleMomentConversation}
          />
          <ButtonSelection
            buttonText="Image"
            image={image}
            altText="open image viewer"
            // useStateParam={}
            // handleStateEvent={}
          />
          <ButtonSelection
            buttonText="Video"
            image={video}
            altText="open video player"
            // useStateParam={}
            // handleStateEvent={}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;
