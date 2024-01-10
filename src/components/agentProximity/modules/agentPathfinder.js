// import { gridCollisions } from "./collisions";
// import { gridDataCollisions } from "./gridCollisions";
// import { isSolid } from "./motion";

/* A majority of the A* algorithm code comes from the side below:
 * https://blog.bitsrc.io/advanced-data-structures-implementing-the-a-algorithm-in-javascript-5ae1e8a4ab2f
 *
 * This code currently does NOT support diagonal motion, but it can be added later if needed.
 *   (although, players can't move diagonally anyway, so maybe keep it the same to match normal player control)
 */

let obstacles = gridDataCollisions;

/**
 * We do not want to evaluate the 'path' based on the
 * 'estimate' but on the 'cost' for the shortest path (least cost)
 */
export async function findPath(playerData, goalX, goalY) {
  let path = await aStar(playerData, goalX, goalY);

  let finished = false;
  let sortedPath = [];
  if (path) {
    sortedPath = path.sort((a, b) => a.cost - b.cost); // sort by cost
  }
  // let costs = [];
  let finalPath = [];

  while (!finished && sortedPath.length > 0) {
    let step = sortedPath.shift();
    if (step.state.x == goalX && step.state.y == goalY) {
      finalPath.push(step);
      finished = true;
    } else {
      finalPath.push(step); // all we need here

      // if (!costs.includes(step.cost)) {
      //   finalPath.push(step);
      //   costs.push(step.cost);
      // }
    }
  }
  return finalPath;
}

export async function aStar(playerData, goalX, goalY) {
  let start = { x: playerData.x, y: playerData.y };
  let goal = { x: goalX, y: goalY };

  // empty data structure to store the explored paths
  let explored = [];

  // data structure to store the paths that are being explored
  let frontier = [
    {
      state: start,
      cost: 0,
      estimate: heuristic(start, goal),
      parent: null, // ADDED (TH)
    },
  ];

  // while there are paths being explored
  while (frontier.length > 0) {
    // sort the paths in the frontier by cost, with the lowest-cost paths first
    frontier.sort(function (a, b) {
      return a.estimate - b.estimate;
    });

    // choose the lowest-cost path from the frontier
    let node = frontier.shift();

    // add this node to the explored paths
    explored.push(node);
    // if this node reaches the goal, return the PATH
    if (node.state.x == goal.x && node.state.y == goal.y) {
      // return explored; // we do not return explored but a path from node.parent
      // ADDED (TH)
      let path = [];
      while (node) {
        path.unshift(node);
        node = node.parent;
      }
      return path;
    }

    // generate the possible next steps from this node's state
    let next = generateNextSteps(node.state);

    // for each possible next step
    for (let i = 0; i < next.length; i++) {
      // calculate the cost of the next step by adding the step's cost to the node's cost
      let step = next[i];
      let cost = step.cost + node.cost;

      // check if this step has already been explored
      let isExplored = explored.find((e) => {
        return e.state.x == step.state.x && e.state.y == step.state.y;
      });

      // avoid repeated nodes during the calculation of neighbors
      let isFrontier = frontier.find((e) => {
        return e.state.x == step.state.x && e.state.y == step.state.y;
      });

      // if this step has not been explored
      if (!isExplored && !isFrontier) {
        // add the step to the frontier, using th ecost and the heuristic function to estimate the total cost to reach the goal
        frontier.push({
          state: step.state,
          cost: cost,
          estimate: cost + heuristic(step.state, goal),
          parent: node, // set parent of the setep to the current node
        });
      }
    }
  }

  // if there are no paths left to explore, return null to indicate that the goal cannot be reached
  return null;
}

function generateNextSteps(state) {
  let next = [];

  // Check if the current state has any valid neighbors
  // and if the next step is valid (i.e., the difference in x or y is not more than 1)
  if (state.x > gridCollisions.minX && !isSolid(state.x - 1, state.y)) {
    next.push({
      state: { x: state.x - 1, y: state.y },
      cost: 1,
    });
  }

  if (state.x < gridCollisions.maxX - 1 && !isSolid(state.x + 1, state.y)) {
    next.push({
      state: { x: state.x + 1, y: state.y },
      cost: 1,
    });
  }

  if (state.y > gridCollisions.minY && !isSolid(state.x, state.y - 1)) {
    next.push({
      state: { x: state.x, y: state.y - 1 },
      cost: 1,
    });
  }

  if (state.y < gridCollisions.maxY - 1 && !isSolid(state.x, state.y + 1)) {
    next.push({
      state: { x: state.x, y: state.y + 1 },
      cost: 1,
    });
  }

  return next;
}

/**
 * Modified the heuristic as it was calculating the square root
 * of the sum of the squares dx and dy (Euclidean Dist)
 * We want Up Town (Manhattan Dist)
 */
function heuristic(state, goal) {
  let dx = Math.abs(state.x - goal.x);
  let dy = Math.abs(state.y - goal.y);
  let penalty = pathIntersectsObstacle(state, goal, obstacles) * 10;
  // return Math.sqrt(dx * dx + dy * dy) + penalty;
  return dx + dy + penalty; // Manhattan distance
}

function pathIntersectsObstacle(start, end, obstacles) {
  let { x: startX, y: startY } = start;
  let { x: endX, y: endY } = end;

  // get the coordinates of all points on the path
  let path = getPath(startX, startY, endX, endY);

  // get the points inthe array that are within the list of obstacles
  let intersections = path.filter(
    (point) => !!obstacles.find((o) => o.x == point[0] && o.y == point[1])
  ).length;

  return intersections;
}

function getPath(startX, startY, endX, endY) {
  // initialize an empty array to store the coordinates of the points on the path
  let path = [];

  // use the Bresenhanm's line algorithm to get the coorindates of the points on the path
  // https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
  let x1 = startX,
    y1 = startY,
    x2 = endX,
    y2 = endY;
  let isSteep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
  if (isSteep) {
    [x1, y1] = [y1, x1];
    [x2, y2] = [y2, x2];
  }
  let isReversed = false;
  if (x1 > x2) {
    [x1, x2] = [x2, x1];
    [y1, y2] = [y2, y1];
    isReversed = true;
  }
  let deltaX = x2 - x1,
    deltaY = Math.abs(y2 - y1);
  let error = Math.floor(deltaX / 2);
  let y = y1;
  let yStep = null;
  if (y1 < y2) {
    yStep = 1;
  } else {
    yStep = -1;
  }
  for (let x = x1; x <= x2; x++) {
    if (isSteep) {
      path.push([y, x]);
    } else {
      path.push([x, y]);
    }
    error -= deltaY;
    if (error < 0) {
      y += yStep;
      error += deltaX;
    }
  }

  // if the line is reversed, reverse the order of the points in the path
  if (isReversed) {
    path = path.reverse();
  }

  return path;
}
