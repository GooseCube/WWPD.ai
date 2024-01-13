import { Image, OverlayTrigger, Tooltip, Offcanvas } from "react-bootstrap";

// GAME Icon
import app_icon from "../../../assets/sidebar/app_icon.png";

// Help Icon
import { QuestionCircle } from "react-bootstrap-icons";

function SidebarHeader() {
  return (
    <Offcanvas.Title className="w-100 d-flex justify-content-between align-items-center fs-4">
      <Image className="app-icon-img" src={app_icon} /><h2>G . A . M . E .</h2>
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id={"tooltip-top"} className="custom-tooltip">
            Generative Agent <br />
            <p className="border-bottom border-white">Momentum Experientia</p>
            <p className="text-start">
              <strong>Interface:</strong> open/close the user interface to view
              moments or messages
            </p>
            <p className="text-start">
              <strong>Moment:</strong> select a topic to prompt the agents into
              a discussion
            </p>
            <p className="text-start">
              <strong>AI Model:</strong> switch the ai model you would like to
              prompt. The ai model takes on the persona of the agent you have
              selected.
            </p>
            <p className="text-start">
              <strong>Agent Profile:</strong> overview of the agent persona you
              have selected
            </p>
          </Tooltip>
        }>
        <QuestionCircle className="sidebar-help-icon" />
      </OverlayTrigger>
    </Offcanvas.Title>
  );
}

export default SidebarHeader;
