import { gridCollisionData } from "./gridCollisionData";

/**
 * Evaluate if a given x and y is a grid collision
 * @param {number} x
 * @param {number} y
 * @returns  true if found or false if not
 */
export const validateGridCollision = (x, y) => {
  return gridCollisionData.some((grid) => grid.x === x && grid.y === y);
};

/**
 * Should evaluate different offsets until:
 * - a valid offset destination { x, y } is found
 * - or no valid offset is found agent will use the original { x, y }
 * @param {object} gridPoint {x, y}
 * @param {number} MAX_OFFSET
 */
export const findValidOffsetPosition = (gridPoint, MAX_OFFSET) => {
  if (validateGridCollision(gridPoint.x, gridPoint.y - MAX_OFFSET)) {
    gridPoint.y -= MAX_OFFSET;
  } else if (validateGridCollision(gridPoint.x, gridPoint.y + MAX_OFFSET)) {
    gridPoint.y += MAX_OFFSET;
  } else if (validateGridCollision(gridPoint.x - MAX_OFFSET, gridPoint.y)) {
    gridPoint.x -= MAX_OFFSET;
  } else if (validateGridCollision(gridPoint.x + MAX_OFFSET, gridPoint.y)) {
    gridPoint.x += MAX_OFFSET;
  }
};
