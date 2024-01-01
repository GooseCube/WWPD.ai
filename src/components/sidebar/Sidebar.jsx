import React from "react";
import { Button, Image, Offcanvas } from "react-bootstrap";
import {
  ChevronDoubleRight,
  ChevronDoubleLeft,
  ChatLeftDotsFill,
} from "react-bootstrap-icons";

// Custom Components
import DropdownSelection from "./sub-components/DropdownSelection";
import ButtonSelection from "./sub-components/ButtonSelection";

// CSS Styles for Sidebar
import app_icon from "../../assets/sidebar/app_icon.png";
import ai from "../../assets/sidebar/ai.png";
import idea from "../../assets/sidebar/idea.png";
import image from "../../assets/sidebar/image.png";
import "./styles/styles.css";

function Sidebar({ showInterface, setShowInterface }) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button
        className="arrow-button"
        variant="primary"
        onClick={() => setShow(!show)}>
        {show ? <ChevronDoubleLeft /> : <ChevronDoubleRight />}
      </Button>

      <Offcanvas
        className="sidebar-container"
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
          <DropdownSelection image={idea} />
          <ButtonSelection
            buttonText="Image"
            image={image}
            altText="open image viewer"
            // useStateParam={}
            // handleStateEvent={}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
