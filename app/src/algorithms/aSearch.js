
function aSearch(matrix, gridSize, timer, rounds) {
    //matrix coordinates i and j are in wrong places therefore i = the actual j and j = the actual i. With this in mind algorithm still functions correctly.
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched, 6 Path, 7 Slow Tile, 8 Searching Slow Tile, 9 Searched Slow Tile, 10 Path Slow Tile.

    
    // Goes through queue list and calculates the next tile to search.
    const getNextTile = () => {
        var i_min = 0;
        var j_min = 0;
        var min = 100000;
        queue.forEach(([i,j]) => {
            if (matrix[i][j].ref.current.getDistance() + matrix[i][j].ref.current.getHeuristic() < min){
                min = matrix[i][j].ref.current.getDistance() + matrix[i][j].ref.current.getHeuristic()
                i_min = i
                j_min = j
            }
        }) 
        return [i_min,j_min]
    }


    // Checks if the goal tile is in queue list.
    const goalCheck = () => {
        var found = 0;
        queue.forEach(([i,j]) => {
            if (matrix[i][j].ref.current.getState() === 3){
                found = 1
            }
        })
        return found;
    }

    // Checks if the path has reached to Start
    const pathEndCheck = (i,j) => {
        if (j-1 >= 0 && ([3,6,10].includes(matrix[i][j-1].ref.current.getState()))){
            return 1;
        }
        if (i-1 >= 0 && ([3,6,10].includes(matrix[i-1][j].ref.current.getState()))){
            return 1;
        }
        if (j+1 < gridSize && ([3,6,10].includes(matrix[i][j+1].ref.current.getState()))){
            return 1;
        }
        if (i+1 < gridSize && ([3,6,10].includes(matrix[i+1][j].ref.current.getState()))){
            return 1;
        } else {
            return 0;
        }
    }

    // builds path from End one tile at a time.
    const buildPath = () => {
        var i_new = 0;
        var j_new = 0;
        let path = []
        matrix.forEach((row,x) => {
            row.forEach((item,y) => {
                if ([3,6,10].includes(item.ref.current.getState())){
                    path.push([x,y])
                }
            })
        })
        var min = 100000;
        path.forEach(([i,j]) => {
            if (j-1 >= 0 && [4,5].includes(matrix[i][j-1].ref.current.getState())){
                if (matrix[i][j-1].ref.current.getDistance() < min){
                    min = matrix[i][j-1].ref.current.getDistance()
                    i_new = i
                    j_new = j-1
                }
            }
            if (i-1 >= 0 && [4,5].includes(matrix[i-1][j].ref.current.getState())){
                if (matrix[i-1][j].ref.current.getDistance() < min){
                    min = matrix[i-1][j].ref.current.getDistance()
                    i_new = i-1
                    j_new = j
                }
            }
            if (j+1 < gridSize && [4,5].includes(matrix[i][j+1].ref.current.getState())){
                if (matrix[i][j+1].ref.current.getDistance() < min){
                    min = matrix[i][j+1].ref.current.getDistance()
                    i_new = i
                    j_new = j+1
                }
            }
            if (i+1 < gridSize && [4,5].includes(matrix[i+1][j].ref.current.getState())){
                if (matrix[i+1][j].ref.current.getDistance() < min){
                    min = matrix[i+1][j].ref.current.getDistance()
                    i_new = i+1
                    j_new = j
                }
            }
        })
        if (matrix[i_new][j_new].ref.current.getState() === 9){
            matrix[i_new][j_new].ref.current.setState(10)
        } else {
            matrix[i_new][j_new].ref.current.setState(6)
        }
        return ([i_new,j_new])
    } 

    // Determines the next tiles in the queue from current list which contains all already searched tiles.
    const directions = (i,j) => {
        if (j-1 >= 0 && 
            [0,3,7].includes(matrix[i][j-1].ref.current.getState())) {
            queue.push([i, j-1])
        }
        if (i-1 >= 0 &&
            [0,3,7].includes(matrix[i-1][j].ref.current.getState())) {
            queue.push([i-1, j])
        }
        if (j+1 < gridSize &&
            [0,3,7].includes(matrix[i][j+1].ref.current.getState())) {
            queue.push([i, j+1])
        }
        if (i+1 < gridSize &&
            [0,3,7].includes(matrix[i+1][j].ref.current.getState())) {
            queue.push([i+1, j])
        }
    }
    let current = [];
    let queue = [];

    matrix.forEach((row,i) => {
        row.forEach((item,j) => {
            if ([2,4,5,6,8,9,10].includes(item.ref.current.getState())){
                current.push([i,j])
            }
        })
    });

    current.forEach(([i,j]) => {
        directions(i,j)
        if ([4].includes(matrix[i][j].ref.current.getState())){
            matrix[i][j].ref.current.setState(5)
        } else if ([8].includes(matrix[i][j].ref.current.getState())){
            matrix[i][j].ref.current.setState(9)
        }
    })

    const row = matrix.findIndex(row => row.map(e => e.ref.current.getState()).includes(2));
    const col = matrix[row].map(e => e.ref.current.getState()).indexOf(2);
    if (goalCheck() === 1){
        if (pathEndCheck(row,col) === 1) {
            console.log("FOUND!")
            clearInterval(timer);
        } else {
            buildPath()
        }
    } else {
        let tile = getNextTile()
        if (matrix[tile[0]][tile[1]].ref.current.getState() === 7){
            matrix[tile[0]][tile[1]].ref.current.setState(8);
        } else {
            matrix[tile[0]][tile[1]].ref.current.setState(4);
        }  
    }
}


export default aSearch;