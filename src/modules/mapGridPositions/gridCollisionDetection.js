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
 * This function will attempt to resolve the issue of giving
 * an agent a location in the grid which is NOT a valid position.
 * A non-valid position will cause the agent to be Grid Locked causing
 * traversal (teleportation from A -> B).
 * Function will exhaust all possibilities for a 5x5 grid which
 * an agent should be no closer than 2 cells away for any given { x, y }
 * @param {number} x should be a negative value such as (-2)
 * @param {number} y should be a negative value such as (-2)
 * @returns a new { x, y } valid destination goal position if found
 * if a valid { x, y } position is not found, function returns the original
 * { x, y } position as the only suitable solution.
 */
export const findValidDiscussionPosition = (x, y) => {
  let newX = Number(x);
  let newY = Number(y);
  let step = 1;

  while (Math.abs(newX) <= 2 && Math.abs(newY) <= 2) {
    for (let i = 0; i < step; ++i) {
      if (validateGridCollision(newX - i, newY))
        return { x: newX - i, y: newY };
      if (validateGridCollision(newX + i, newY))
        return { x: newX + i, y: newY };
    }
    for (let i = 0; i < step; ++i) {
      if (validateGridCollision(newX, newY - i))
        return { x: newX, y: newY - i };
      if (validateGridCollision(newX, newY + i))
        return { x: newX, y: newY + i };
    }
    ++step;
  }

  // Base Case if no possible solution is found
  return {x, y};
};
