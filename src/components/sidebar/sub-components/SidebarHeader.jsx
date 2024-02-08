import { Image, OverlayTrigger, Tooltip, Offcanvas } from "react-bootstrap";

// GAME Icon
import app_icon from "../../../assets/sidebar/app_icon.png";

// Help Icon
import { QuestionCircle } from "react-bootstrap-icons";

function SidebarHeader() {
  return (
    <Offcanvas.Title className="sidebar-title mx-5 w-75 d-flex justify-content-around align-items-center">
      <Image className="app-icon-img" src={app_icon} />
      <p className="title pt-3">G . A . M . E .</p>
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id={"tooltip-top"} className="custom-tooltip">
            <h3 className="border-bottom border-white">Generative Agent Moment Experience</h3>
            <p className="text-start">
              <strong>Interface:</strong> open/close the user interface to view
              moments or messages
            </p>
            <p className="text-start">
              <strong>Moment:</strong> select a topic to prompt the agents into
              a discussion
            </p>
            <p className="text-start">
              <strong>AI Models:</strong> switch the ai model you would like to
              prompt. The ai model takes on the persona of the agent you have
              selected.
            </p>
            <p className="text-start">
              <strong>Agent Profile:</strong> overview of the agent persona you
              have selected. Click on the profile to view, edit, or create new personas.
            </p>
          </Tooltip>
        }>
        <QuestionCircle className="sidebar-help-icon" />
      </OverlayTrigger>
    </Offcanvas.Title>
  );
}

export default SidebarHeader;
