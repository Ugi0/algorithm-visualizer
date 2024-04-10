
function search(matrix, gridSize, timer, rounds) {
    //matrix coordinates i and j are in wrong places therefore i = the actual j and j = the actual i. With this in mind algorithm still functions correctly.
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched, 6 Path

    
    // Goes through queue list and calculates the next tile to search. Also calculates distance value for the tile.
    const getNextTile = () => {
        var i_min = 0;
        var j_min = 0;
        var min = 60000;
        queue.forEach(([i,j]) => {
            if (j-1 >= 0 && matrix[i][j-1].ref.current.getState() !== 1) {
                if (matrix[i][j-1].ref.current.getDistance() < min) {
                    min = matrix[i][j-1].ref.current.getDistance()
                    i_min = i
                    j_min = j
                }
            }
            if (i-1 >= 0 && matrix[i-1][j].ref.current.getState() !== 1 ) {
                if (matrix[i-1][j].ref.current.getDistance() < min) {
                    min = matrix[i-1][j].ref.current.getDistance()
                    i_min = i
                    j_min = j
                }
            }
            if (j+1 < gridSize && matrix[i][j+1].ref.current.getState() !== 1) {
                if (matrix[i][j+1].ref.current.getDistance() < min) {
                    min = matrix[i][j+1].ref.current.getDistance()
                    i_min = i
                    j_min = j
                }
            }
            if (i+1 < gridSize && matrix[i+1][j].ref.current.getState() !== 1) {
                if (matrix[i+1][j].ref.current.getDistance() < min) {
                    min = matrix[i+1][j].ref.current.getDistance()
                    i_min = i
                    j_min = j
                }
            }
        })
        matrix[i_min][j_min].ref.current.setDistance(min+1)
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
        if (j-1 >= 0 && ([3,6].includes(matrix[i][j-1].ref.current.getState()))){
            return 1;
        }
        if (i-1 >= 0 && ([3,6].includes(matrix[i-1][j].ref.current.getState()))){
            return 1;
        }
        if (j+1 < gridSize && ([3,6].includes(matrix[i][j+1].ref.current.getState()))){
            return 1;
        }
        if (i+1 < gridSize && ([3,6].includes(matrix[i+1][j].ref.current.getState()))){
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
                if (item.ref.current.getState() === 3){
                    path.push([x,y])
                }
                if (item.ref.current.getState() === 6){
                    path.push([x,y])
                }
            })
        })
        var min = 60000;
        path.forEach(([i,j]) => {
            if (j-1 >= 0 && ![1,2,3,6].includes(matrix[i][j-1].ref.current.getState())){
                if (matrix[i][j-1].ref.current.getDistance() < min){
                    min = matrix[i][j-1].ref.current.getDistance()
                    i_new = i
                    j_new = j-1
                }
            }
            if (i-1 >= 0 && ![1,2,3,6].includes(matrix[i-1][j].ref.current.getState())){
                if (matrix[i-1][j].ref.current.getDistance() < min){
                    min = matrix[i-1][j].ref.current.getDistance()
                    i_new = i-1
                    j_new = j
                }
            }
            if (j+1 < gridSize && ![1,2,3,6].includes(matrix[i][j+1].ref.current.getState())){
                if (matrix[i][j+1].ref.current.getDistance() < min){
                    min = matrix[i][j+1].ref.current.getDistance()
                    i_new = i
                    j_new = j+1
                }
            }
            if (i+1 < gridSize && ![1,2,3,6].includes(matrix[i+1][j].ref.current.getState())){
                if (matrix[i+1][j].ref.current.getDistance() < min){
                    min = matrix[i+1][j].ref.current.getDistance()
                    i_new = i+1
                    j_new = j
                }
            }
        })
        matrix[i_new][j_new].ref.current.setState(6)
        return ([i_new,j_new])
    } 

    // Determines the next tiles in the queue from current list which contains all already searched tiles.
    const directions = (i,j) => {
        if (j-1 >= 0 && 
            [0,3].includes(matrix[i][j-1].ref.current.getState())) {
            queue.push([i, j-1])
        }
        if (i-1 >= 0 &&
            [0,3].includes(matrix[i-1][j].ref.current.getState())) {
            queue.push([i-1, j])
        }
        if (j+1 < gridSize &&
            [0,3].includes(matrix[i][j+1].ref.current.getState())) {
            queue.push([i, j+1])
        }
        if (i+1 < gridSize &&
            [0,3].includes(matrix[i+1][j].ref.current.getState())) {
            queue.push([i+1, j])
        }
    }
    let current = [];
    let queue = [];

    if (rounds === 0) {
        const row = matrix.findIndex(row => row.map(e => e.ref.current.getState()).includes(2));
        const col = matrix[row].map(e => e.ref.current.getState()).indexOf(2);
        matrix[row][col].ref.current.setDistance(0)
    }

    if (rounds !== 0){
        matrix.forEach((row,i) => {
            row.forEach((item,j) => {
                if (item.ref.current.getState() === 2) {
                    current.push([i,j])
                } else if (item.ref.current.getState() === 4){
                    current.push([i,j])
                } else if (item.ref.current.getState() === 5){
                    current.push([i,j])
                } else if (item.ref.current.getState() === 6){
                    current.push([i,j])
                }
            })
        });

        current.forEach(([i,j]) => {
            directions(i,j)
            if (![1,2,3,6].includes(matrix[i][j].ref.current.getState())){
                matrix[i][j].ref.current.setState(5)
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
            let tile = getNextTile(row,col)
            matrix[tile[0]][tile[1]].ref.current.setState(4);
        }
    }
}


export default search;