// React
import { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Context Providers
import { useShow } from "../contextProviders/ShowProvider";

// Sub Components (TAB Items)
import About from "./subComponents/About";
import AiModels from "./subComponents/AiModels";
import EmailJS from "./subComponents/EmailJS";
import HuggingFace from "./subComponents/HuggingFace";
import Interface from "./subComponents/Interface";
import Moment from "./subComponents/Moment";
import ProfileCards from "./subComponents/ProfileCards";

// Styles
import "./styles/styles.css";
import SetUp from "./subComponents/SetUp";

function Documentation() {
  const { show, dispatch } = useShow();
  const [key, setKey] = useState("interface");

  return (
    <div className="documentation-container">
      <div className="documentation documentation-body-container">
        <div className="docs-title-wrapper">
          <XCircleFill
            className="close-icon"
            onClick={() =>
              dispatch({
                type: "SET_SHOW_DOCUMENTATION",
                payload: !show.documentation,
              })
            }
          />
          <h1 className="doc-title">Generative Agent Moment Experience</h1>
        </div>
        <Tabs
          id="documentation-tabs-container"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="docs-tabs-container">
          <Tab
            className={`docs-tab-item ${key === "interface" ? "active" : ""}`}
            eventKey="interface"
            title="Interface">
            <Interface />
          </Tab>
          <Tab
            className={`docs-tab-item ${key === "moment" ? "active" : ""}`}
            eventKey="moment"
            title="Moment">
            <Moment />
          </Tab>
          <Tab
            className={`docs-tab-item ${key === "ai-models" ? "active" : ""}`}
            eventKey="ai-models"
            title="AI Models">
            <AiModels />
          </Tab>
          <Tab
            className={`docs-tab-item ${
              key === "profile-cards" ? "active" : ""
            }`}
            eventKey="profile-cards"
            title="Profile Cards">
            <ProfileCards />
          </Tab>
          <Tab
            className={`docs-tab-item ${
              key === "huggingface" ? "active" : ""
            }`}
            eventKey="huggingface"
            title="HuggingFace">
            <HuggingFace />
          </Tab>
          <Tab
            className={`docs-tab-item ${
              key === "emailjs" ? "active" : ""
            }`}
            eventKey="emailjs"
            title="EmailJS">
            <EmailJS />
          </Tab>
          <Tab
            className={`docs-tab-item ${key === "about" ? "active" : ""}`}
            eventKey="about"
            title="About">
            <About />
          </Tab>
          <Tab
            className={`docs-tab-item ${key === "setup" ? "active" : ""}`}
            eventKey="setup"
            title="GH SetUp">
            <SetUp />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Documentation;
