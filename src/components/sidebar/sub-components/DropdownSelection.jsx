import { ButtonGroup, Dropdown, Image } from "react-bootstrap";

function DropdownSelection({ essay, dropdownItems, dropdownEvent }) {
  return (
    <Dropdown as={ButtonGroup}>
      {/* <Button variant="info">mix it up style-wise</Button> */}

      <div className="sidebar-button mb-3">
        <Image className="sidebar-img" src={essay} alt="idea selector" /> Moment
        {/* </div> */}
        <Dropdown.Toggle className="mx-1" split variant="primary" id="dropdown-custom-2" />
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="1" active>
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
