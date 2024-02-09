import { updateAgent } from "../../../firebase/firebaseAgents";
import { validateGridCollision } from "../../../modules/mapGridPositions/gridCollisionDetection";

// Arrow Key Events for Player Controlled Agent
export const handlePlayerMoveEvent = async (agent, setAgents, direction) => {
  const NUMBER_OF_SPRITE_COLUMNS = 3;
  let newX = agent.x;
  let newY = agent.y;
  let newDirection = agent.direction;
  // newFrame will cycle through the three sprite frame columns {0, 1, 2}
  let newFrame = (agent.frame + 1) % NUMBER_OF_SPRITE_COLUMNS;
  switch (direction) {
    case "ArrowUp":
      newY -= 1;
      newDirection = "up";
      break;
    case "ArrowDown":
      newY += 1;
      newDirection = "down";
      break;
    case "ArrowLeft":
      newX -= 1;
      newDirection = "left";
      break;
    case "ArrowRight":
      newX += 1;
      newDirection = "right";
      break;
    default:
      return;
  }

  if (!validateGridCollision(newX, newY)) {
    const updatedAgent = {
      ...agent,
      x: newX,
      y: newY,
      direction: newDirection,
      frame: newFrame,
    };

    // Update Firebase
    await updateAgent(updatedAgent, setAgents);

    // Console Out To Help Create Grid Collisions: Remove when done
    let position = "{" + "x: " + newX + "," + " y: " + newY + "},";
    console.log(position);
  }
};

export const calculateLeftX = (x) => {
  return (16 * x) / 10 + "rem";
};

export const calculateTopY = (y) => {
  return (16 * y) / 10 + "rem";
};
