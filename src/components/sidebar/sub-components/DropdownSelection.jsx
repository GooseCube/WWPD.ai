import { ButtonGroup, Dropdown, Image } from "react-bootstrap";

/**
 *
 * @param {image icon} image
 * @param {handleEventFunction} dropdownEvent, function in Sidebar to handle the onClick event
 * @param {array} listItems, array of objects
 * @returns
 */
function DropdownSelector({ buttonTitle, image, dropdownEvent, listItems }) {
  return (
    <Dropdown as={ButtonGroup}>
      <div className="sidebar-dropdown-button mb-3 d-flex justify-content-between">
        <Image
          className="sidebar-img"
          src={image}
          alt={`${buttonTitle} selector`}
        />{" "}
        {buttonTitle}
        <Dropdown.Toggle
          className="dropdown-toggle-btn mx-1"
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
