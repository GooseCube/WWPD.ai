import { ButtonGroup, Dropdown, Image } from "react-bootstrap";

function DropdownSelection({ image, dropdownEvent }) {
  return (
    <Dropdown as={ButtonGroup}>
      {/* <Button variant="info">mix it up style-wise</Button> */}

      <div className="sidebar-button mb-3">
        <Image className="sidebar-img" src={image} alt="idea selector" /> Moment
        {/* </div> */}
        <Dropdown.Toggle
          className="dropdown-toggle-btn mx-1"
          split
          variant="primary"
        />
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="1" active onClick={(e) => dropdownEvent(e)}>
            Town Square Talk
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">Second Moment</Dropdown.Item>
          <Dropdown.Item eventKey="3">Third Moment</Dropdown.Item>
        </Dropdown.Menu>
      </div>
    </Dropdown>
  );
}

export default DropdownSelection;
