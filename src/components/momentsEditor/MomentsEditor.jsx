// React
import { useContext, useEffect, useState } from "react";

// Context Providers
import { useShow } from "../contextProviders/ShowProvider";
import { FirebaseContext } from "../contextProviders/FirebaseProvider";

// Sub Components
import TemplateEditor from "./subComponents/TemplateEditor";
import SelectionSidebar from "./subComponents/SelectionSidebar";

// Local Modules
import { blankTemplate } from "./modules/blankTemplate";

// Styles
import "./styles/styles.css";
import { XCircleFill } from "react-bootstrap-icons";

function MomentsEditor() {
  const { momentTemplates } = useContext(FirebaseContext);
  const { show, dispatch } = useShow();
  const [templateList, setTemplateList] = useState({});
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    console.log(momentTemplates);
    if (momentTemplates) {
      setTemplateList(momentTemplates);
      setTemplate(blankTemplate);
      console.log(momentTemplates);
    }
  }, [momentTemplates]);

  return (
    <div className="templates-background-container">
      {template && (
        <TemplateEditor
          template={template}
          blankTemplate={blankTemplate}
          setTemplate={setTemplate}
        />
      )}
      {templateList && (
        <SelectionSidebar
          templateList={templateList}
          setTemplate={setTemplate}
        />
      )}
      <div className="template-open-close-container">
        <XCircleFill
          className="template-close-icon"
          onClick={() =>
            dispatch({
              type: "SET_SHOW_MOMENTS_EDITOR",
              payload: !show.momentsEditor,
            })
          }
        />
      </div>
    </div>
  );
}

export default MomentsEditor;
