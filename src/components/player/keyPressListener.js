import { validateGridCollision } from "./modules/gridCollisionDetection";

export const handlePlayerMoveEvent = (player, setPlayer, direction) => {
  let newX = player.x;
  let newY = player.y;
  let newDirection = player.direction;
  let newFrame = (player.frame + 1) % 3; // Cycle through frames 0, 1, 2
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
    setPlayer({
      ...player,
      x: newX,
      y: newY,
      direction: newDirection,
      frame: newFrame,
    });
  }

  let position = "{" + "x: " + newX + "," + " y: " + newY + "},";
  console.log(position);
};
export const calculateLeftX = (x) => {
  return 32 * x + "px";
};

export const calculateTopY = (y) => {
  return 32 * y + "px";
};
