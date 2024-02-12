import Draggable from "react-draggable"
import { ResizableBox } from "react-resizable"

function Documentation() {
  return (
    <Draggable>
      <ResizableBox>
        <div className="documentation">This will be the documentation for the GAME</div>
      </ResizableBox>

    </Draggable>
  )
}

export default Documentation;