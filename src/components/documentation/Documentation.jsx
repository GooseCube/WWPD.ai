// React
import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Sub Components
import Instructions from "./subComponents/Instructions";

function Documentation() {
  const [key, setKey] = useState("instruction");

  return (
    <Draggable>
      <ResizableBox>
        <h1 className="doc-title">
          This will be the documentation for the GAME
        </h1>
        <Tabs
          id="documentation-tabs-container"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="docs-tab-container">

          <Tab eventKey="instructions" title="Instructions">
            <Instructions />
          </Tab>

        </Tabs>
      </ResizableBox>
    </Draggable>
  );
}

export default Documentation;
