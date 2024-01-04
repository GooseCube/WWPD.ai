import { updateAgent } from "../../../firebase/firebaseDB";
import { validateGridCollision } from "./gridCollisionDetection";

export const handlePlayerMoveEvent = (player, direction, setPlayers, setAgents) => {
  const NUMBER_OF_SPRITE_COLUMNS = 3;
  let newX = player.x;
  let newY = player.y;
  let newDirection = player.direction;
  let newFrame = (player.frame + 1) % NUMBER_OF_SPRITE_COLUMNS; // Cycle through sprite frames 0, 1, 2
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
  }

  if (!validateGridCollision(newX, newY)) {
    const updatedPlayer = {
      ...player,
      x: newX,
      y: newY,
      direction: newDirection,
      frame: newFrame,
    };


    setAgents(prevAgents => prevAgents.map(a => a.uid === player.uid ? updatedPlayer : a))
    setPlayers(prevPlayers => prevPlayers.map(p => p.uid === player.uid ? updatedPlayer : p))

    updateAgent(updatedPlayer);
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
