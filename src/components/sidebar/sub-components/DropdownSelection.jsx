import { ButtonGroup, Dropdown, Image } from "react-bootstrap";

/**
 * @param {string} buttonTitle, give the dropdown button a title
 * @param {image icon} image
 * @param {handleEventFunction} dropdownEvent, function in Sidebar to handle the onClick event
 * @param {array[string]} listItems, array of string objects
 * @returns a customized dropdown button containing the list items given
 */
function DropdownSelector({ buttonTitle, image, dropdownEvent, listItems }) {
  return (
    <Dropdown as={ButtonGroup}>
      <div className="sidebar-dropdown-button mb-3 d-flex">
        <Image
          className="sidebar-img"
          src={image}
          alt={`${buttonTitle} selector`}
        />{" "}
        {buttonTitle}
        <Dropdown.Toggle
          className="dropdown-toggle-btn ms-auto"
          split
          variant="primary"
        />
        <Dropdown.Menu className="dropdown-list">
          {listItems.map((item, index) => {
            return (
              <Dropdown.Item
                className="dropdown-items"
                key={index}
                eventKey={index}
                onClick={(e) => dropdownEvent(e, item)}>
                {item.title}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </div>
    </Dropdown>
  );
}

export default DropdownSelector;
