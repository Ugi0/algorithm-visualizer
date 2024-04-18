function generateMaze(gridSize) {
    const maze = Array.from({ length: gridSize }, () => Array(gridSize).fill(0)); // 0 represents a wall
    const start = { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) };
    maze[start.x][start.y] = 1; // 1 represents a path

    const frontier = [{ x: start.x, y: start.y }];

    while (frontier.length > 0) {
        // Select the next cell to add to the maze
        const current = frontier[Math.floor(Math.random() * frontier.length)];
        const neighbors = getNeighbors(current, gridSize, maze);

        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            maze[next.x][next.y] = 1;
            frontier.push(next);
        } else {
            // Base case: If there are no more neighbors to add, remove the current cell from the frontier
            frontier.splice(frontier.indexOf(current), 1);
        }
    }

    return maze.flat();
}

function getNeighbors(point, gridSize, maze) {
    const neighbors = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    directions.forEach(([dx, dy]) => {
        const x = point.x + dx;
        const y = point.y + dy;

        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize && maze[x][y] === 0) {
            neighbors.push({ x, y });
        }
    });

    return neighbors;
}
export default generateMaze;
    // Implementation of Prim's algorithm
    // Return the generated maze

//function getNeighbors(point, gridSize, maze) {
    // Helper function to get neighbors
    // Return neighbors
//}