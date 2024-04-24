function initializeMaze(width, height) {
    return Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
}

function recursiveDivision(maze, x, y, width, height) {
    if (width <= 2 || height <= 2) {
        return; // Base case: if the chamber is too small, do nothing
    }

    //Make horizontal wall
    var wallX = 1 + Math.floor(Math.random() * (width - 2))
    for (let ind = y; ind < y+height; ind++) {
        maze[ind][x + wallX] = 1;
    }

    //Make vertical wall
    var wallY = 1 + Math.floor(Math.random() * (height - 2))
    for (let ind = x; ind < x+width; ind++) {
        maze[y + wallY][ind] = 1;
    }

    // Create a gap in the vertical wall
    const Y = Math.floor(Math.random() * (wallY - 1));
    maze[y+Y][x+wallX] = 0;

    // Create a gap in the horizontal wall
    const X = Math.floor(Math.random() * (wallX - 1));
    maze[y+wallY][x+X] = 0;

    //Choose randomly to make third wall horizontal or vertical
    if (Math.random() < 0.5) {
        const Y = wallY + 1 + Math.floor(Math.random() * (height - wallY - 1));
        maze[y+Y][x+wallX] = 0;
    } else {
        const X = wallX + 1 + Math.floor(Math.random() * (width - wallX - 1));
        maze[y+wallY][x+X] = 0;
    }

    // Recursively divide the chambers
    recursiveDivision(maze, x, y, wallX, wallY)
    recursiveDivision(maze, x + wallX + 1, y, width - wallX - 1, wallY)
    recursiveDivision(maze, x, y + wallY + 1, wallX, height - wallY - 1);
    recursiveDivision(maze, x + wallX + 1, y + wallY + 1, width - wallX - 1, height - wallY - 1)
}

function generateMaze(matrix, gridSize) {
    const maze = initializeMaze(gridSize, gridSize);
    recursiveDivision(maze, 0, 0, gridSize, gridSize);
    maze.forEach((row,i) => {
        row.forEach((item,j) => {
            matrix[i][j].ref.current.setState(item);
        })
    })
    return maze;
}

export default generateMaze;