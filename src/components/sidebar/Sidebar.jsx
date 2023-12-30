import React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { ChevronDoubleRight, ChevronDoubleLeft } from "react-bootstrap-icons";

// CSS Styles for Sidebar
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
        <Offcanvas.Body>
          <Button
            className="interface-button"
            variant="primary"
            onClick={() => setShowInterface(!showInterface)}>
            Interface
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
