import { updateAgent } from "../../../firebase/firebaseDB";
import { validateGridCollision } from "../../../modules/mapGridPositions/gridCollisionDetection";

// Arrow Key Events for Player Controlled Agent
export const handlePlayerMoveEvent = (agent, setAgents, direction) => {
  const NUMBER_OF_SPRITE_COLUMNS = 3;
  let newX = agent.x;
  let newY = agent.y;
  let newDirection = agent.direction;
  let newFrame = (agent.frame + 1) % NUMBER_OF_SPRITE_COLUMNS; // Cycle through sprite frames 0, 1, 2
  switch (direction) {
    case "ArrowUp":
    case "w":
      newY -= 1;
      newDirection = "up";
      break;
    case "ArrowDown":
    case "s":
      newY += 1;
      newDirection = "down";
      break;
    case "ArrowLeft":
    case "a":
      newX -= 1;
      newDirection = "left";
      break;
    case "ArrowRight":
    case "d":
      newX += 1;
      newDirection = "right";
      break;
  }

  if (!validateGridCollision(newX, newY)) {
    const updatedAgent = {
      ...agent,
      x: newX,
      y: newY,
      direction: newDirection,
      frame: newFrame,
    };

    // Update Global Context for Agents
    setAgents((prevAgents) =>
      prevAgents.map((a) => (a.uid === agent.uid ? updatedAgent : a))
    );

    // Update Firebase
    updateAgent(updatedAgent);
  }

  let position = "{" + "x: " + newX + "," + " y: " + newY + "},";
  console.log(position);
};

export const calculateLeftX = (x) => {
  return 16 * x + "px";
};

export const calculateTopY = (y) => {
  return 16 * y + "px";
};
