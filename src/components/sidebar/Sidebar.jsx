import React from "react";
import { Button, Image, Offcanvas } from "react-bootstrap";
import {
  ChevronDoubleRight,
  ChevronDoubleLeft,
  ChatLeftDotsFill,
} from "react-bootstrap-icons";

// CSS Styles for Sidebar
import essay from "../../assets/sidebar/essay.png";
import message from "../../assets/sidebar/message.png";
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
          <Offcanvas.Title>Generative Agents</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column ">
          <div
            className="sidebar-button mb-3"
            onClick={() => setShowInterface(!showInterface)}>
            <Image
              className="sidebar-img"
              src={message}
              alt="idea selector"
            />{" "}
            Interface
          </div>
          <div className="sidebar-button mb-3">
            <Image className="sidebar-img" src={essay} alt="idea selector" />{" "}
            Moment
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
