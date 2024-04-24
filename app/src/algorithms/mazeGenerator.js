function initializeMaze(width, height) {
    return Array.from({ length: height }, () => Array.from({ length: width }, () => 1));
}

function recursiveDivision(maze, x, y, width, height) {
    if (width <= 2 || height <= 2) {
        return; // Base case: if the chamber is too small, do nothing
    }

    // Choose a random wall to divide the chamber
    const horizontal = Math.random() < 0.5;
    const vertical = !horizontal;

    // Calculate the position of the wall
    const wallX = horizontal ? Math.floor(Math.random() * (width - 1) + x) : x;
    const wallY = vertical ? Math.floor(Math.random() * (height - 1) + y) : y;

    // Create the wall
    if (horizontal) {
        maze[wallY][wallX] = 0;
        maze[wallY][wallX + 1] = 0;
    } else {
        maze[wallY][wallX] = 0;
        maze[wallY + 1][wallX] = 0;
    }

    // Create passages
    const passageX = Math.floor(Math.random() * (width - 2) + x);
    const passageY = Math.floor(Math.random() * (height - 2) + y);
    maze[passageY][passageX] = 1;
    maze[passageY + 1][passageX] = 1;

    // Recursively divide the chambers
    recursiveDivision(maze, x, y, wallX - x, height);
    recursiveDivision(maze, wallX + 2, y, x + width - wallX - 2, height);
    recursiveDivision(maze, x, y, width, wallY - y);
    recursiveDivision(maze, x, wallY + 2, width, y + height - wallY - 2);
}

function generateMaze(matrix, width, height) {
    const maze = initializeMaze(width, height);
    recursiveDivision(maze, 0, 0, width, height);
    maze.forEach((row,i) => {
        row.forEach((item,j) => {
            matrix[i][j].ref.current.setState(item);
        })
    })
    return maze;
}

export default generateMaze;