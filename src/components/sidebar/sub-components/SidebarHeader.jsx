/* eslint-disable react/prop-types */
// React
import { Image } from "react-bootstrap";

function SidebarHeader({ icon }) {
  return (
    <div className="sidebar-title mx-5 w-75 d-flex justify-content-around align-items-center">
      <Image className="app-icon-img" src={icon} />
      <p className="title pt-3">G . A . M . E .</p>
    </div>
  );
}

export default SidebarHeader;
