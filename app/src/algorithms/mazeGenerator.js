function recursiveDivision(maze, x, y, width, height) {
    if (width <= 2 || height <= 2) {
        return; // Base case: if the chamber is too small, do nothing
    }

    //Make horizontal wall
    var wallX = 1 + Math.floor(Math.random() * (width - 2))
    for (let ind = y; ind < y+height; ind++) {
        maze[ind][x + wallX].ref.current.setState(1);
    }

    //Make vertical wall
    var wallY = 1 + Math.floor(Math.random() * (height - 2))
    for (let ind = x; ind < x+width; ind++) {
        maze[y + wallY][ind].ref.current.setState(1);
    }

    // Create a gap in the vertical wall
    const Y = Math.floor(Math.random() * (wallY - 1));
    maze[y+Y][x+wallX].ref.current.setState(0);
    if (y+Y+1 < maze.length) {
        maze[y+Y+1][x+wallX].ref.current.setState(0);
    }

    // Create a gap in the horizontal wall
    const X = Math.floor(Math.random() * (wallX - 1));
    maze[y+wallY][x+X].ref.current.setState(0);
    if (y+Y+1 < maze.length) {
        maze[y+wallY][x+X+1].ref.current.setState(0);
    }

    //Choose randomly to make third gap horizontal or vertical
    if (Math.random() < 0.5) {
        const Y = wallY + 1 + Math.floor(Math.random() * (height - wallY - 1));
        maze[y+Y][x+wallX].ref.current.setState(0);
        if (y+Y+1 < maze.length) {
            maze[y+Y+1][x+wallX].ref.current.setState(0);
        }
    } else {
        const X = wallX + 1 + Math.floor(Math.random() * (width - wallX - 1));
        maze[y+wallY][x+X].ref.current.setState(0);
        if (x+X+1 < maze.length) {
            maze[y+wallY][x+X+1].ref.current.setState(0);
        }
    }

    // Recursively divide the chambers
    recursiveDivision(maze, x, y, wallX, wallY)
    recursiveDivision(maze, x + wallX + 1, y, width - wallX - 1, wallY)
    recursiveDivision(maze, x, y + wallY + 1, wallX, height - wallY - 1);
    recursiveDivision(maze, x + wallX + 1, y + wallY + 1, width - wallX - 1, height - wallY - 1)
}

function generateMaze(matrix, gridSize) {
    recursiveDivision(matrix, 0, 0, gridSize, gridSize);
}

export default generateMaze;