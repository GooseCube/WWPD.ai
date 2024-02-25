/* eslint-disable react/prop-types */
import { removeMomentTemplate } from "../../../firebase/firebaseTemplates";
import { blankTemplate } from "../modules/blankTemplate";
import { Trash } from "react-bootstrap-icons";

/**
 * `SelectionSidebar` is a functional component that renders a list of templates.
 * When a template is selected, it updates the current template in the parent component.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.templateList - An object containing the list of templates. Each key is a template ID and the corresponding value is the template object.
 * @param {Function} props.setTemplate - A function to update the current template in the parent component.
 *
 * @example
 *
 * const templates = {
 *   template1: { title: 'Template 1', ... },
 *   template2: { title: 'Template 2', ... },
 *   // more templates...
 * };
 *
 * function ParentComponent() {
 *   const [currentTemplate, setCurrentTemplate] = useState(null);
 *
 *   return (
 *     <SelectionSidebar templateList={templates} setTemplate={setCurrentTemplate} />
 *   );
 * }
 *
 * @returns {React.Element} The rendered `SelectionSidebar` component.
 */
function SelectionSidebar({ templateList, setTemplate }) {
  const handleDelete = async (key) => {
    if (
      window.confirm(
        "Removing a template is permanent, are you sure you want to remove this?"
      )
    ) {
      try {
        await removeMomentTemplate(key);
      } catch (error) {
        console.error(`Failed to delete the moment template ${key}: `, error);
      }
    }
  };

  const handleListSelection = (event, templateKey) => {
    event.preventDefault();
    setTemplate(templateList[templateKey]);
  };

  return (
    <div className="sidebar-template-container">
      <h1 className="template-title text-center">Templates</h1>
      <ul className="template-list-container">
        <li
          className="template-list-item"
          onClick={() => setTemplate(blankTemplate)}>
          + New Template
        </li>
        {templateList &&
          Object.entries(templateList).map(([key, template], index) => {
            return (
              <li
                key={index}
                value={template}
                className="template-list-item d-flex justify-content-between"
                onClick={(event) => handleListSelection(event, key)}>
                <span>{template.title}</span>
                <Trash
                  className="trash-icon"
                  onClick={() => handleDelete(key)}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default SelectionSidebar;
