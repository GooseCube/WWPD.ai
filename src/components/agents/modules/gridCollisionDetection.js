import { gridCollisionData } from "./gridCollisionData";

/** 
 * Evaluate if a given x and y is a grid collision
 * @param {number} x 
 * @param {number} y 
 * @returns  true if found or false if not
 */
export function validateGridCollision(x, y) {
  return gridCollisionData.some((grid) => grid.x === x && grid.y === y);
}
