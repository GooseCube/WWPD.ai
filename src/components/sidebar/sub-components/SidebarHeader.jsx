// React
import { Image, Offcanvas } from "react-bootstrap";

// Context Providers
import { useShow } from "../../contextProviders/ShowProvider";

// Icons
import app_icon from "../../../assets/sidebar/app_icon.png";
import { QuestionCircle } from "react-bootstrap-icons";

function SidebarHeader() {
  const { show, dispatch } = useShow();

  return (
    <Offcanvas.Title className="sidebar-title mx-5 w-75 d-flex justify-content-around align-items-center">
      <Image className="app-icon-img" src={app_icon} />
      <p className="title pt-3">G . A . M . E .</p>
      <QuestionCircle
        className="sidebar-help-icon"
        onClick={() =>
          dispatch({
            type: "SET_SHOW_DOCUMENTATION",
            payload: !show.Documentation,
          })
        }
      />
    </Offcanvas.Title>
  );
}

export default SidebarHeader;
