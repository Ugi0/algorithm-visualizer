
function dijkstraSearch(matrix, gridSize, timer, rounds,toast) {
    //matrix coordinates i and j are in wrong places therefore i = the actual j and j = the actual i. With this in mind algorithm still functions correctly.
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched, 6 Path, 7 Slow Tile, 8 Searching Slow Tile, 9 Searched Slow Tile, 10 Path Slow Tile.

    const noSearchableCheck = () => {
        var noSearchables = 1;
        queue.forEach(([i,j]) => {
            if ([0,7].includes(matrix[i][j].ref.current.getState())){
                noSearchables = 0;
            }
        })
        if (goalCheck() === 1){
            noSearchables = 0;
        }
        return noSearchables
    }



    // Calculates the shortest distance neighbour for given coordinates.
    const calculateDistance = (i,j) => {
        var i_min = 0;
        var j_min = 0;
        var min = 100000;
        if (j-1 >= 0) {
            if (matrix[i][j-1].ref.current.getDistance() < min) {
                min = matrix[i][j-1].ref.current.getDistance()
                i_min = i
                j_min = j
            }
        }
        if (i-1 >= 0) {
            if (matrix[i-1][j].ref.current.getDistance() < min) {
                min = matrix[i-1][j].ref.current.getDistance()
                i_min = i
                j_min = j
            }
        }
        if (j+1 < gridSize) {
            if (matrix[i][j+1].ref.current.getDistance() < min) {
                min = matrix[i][j+1].ref.current.getDistance()
                i_min = i
                j_min = j
            }
        }
        if (i+1 < gridSize) {
            if (matrix[i+1][j].ref.current.getDistance() < min) {
                min = matrix[i+1][j].ref.current.getDistance()
                i_min = i
                j_min = j
            }
        }
        if (matrix[i_min][j_min].ref.current.getState() === 7){
            matrix[i_min][j_min].ref.current.setDistance(min+5)
        } else {
            matrix[i_min][j_min].ref.current.setDistance(min+1)
        }
        
    }
    //Goes through queue list and calculates the next tile to search
    const getNextTile = (row,col) => {
        var i_min = row;
        var j_min = col;
        var min = 100000;
        let list_of_mins = []
        queue.forEach(([i,j]) => {
            if (matrix[i][j].ref.current.getDistance() < min){
                min = matrix[i][j].ref.current.getDistance()
                i_min = i
                j_min = j
            }
        }) 
        queue.forEach(([i,j]) => {
            if (matrix[i][j].ref.current.getDistance() === min){
                list_of_mins.push([i,j])
            }
        }) 
        var closest = 200000;
        list_of_mins.forEach(([i,j]) => {
            if (Math.abs(i-row)+Math.abs(j-col) < closest){
                closest = Math.abs(i-row)+Math.abs(j-col)
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
            if (j-1 >= 0 && [4,5,8,9].includes(matrix[i][j-1].ref.current.getState())){
                if (matrix[i][j-1].ref.current.getDistance() < min){
                    min = matrix[i][j-1].ref.current.getDistance()
                    i_new = i
                    j_new = j-1
                }
            }
            if (i-1 >= 0 && [4,5,8,9].includes(matrix[i-1][j].ref.current.getState())){
                if (matrix[i-1][j].ref.current.getDistance() < min){
                    min = matrix[i-1][j].ref.current.getDistance()
                    i_new = i-1
                    j_new = j
                }
            }
            if (j+1 < gridSize && [4,5,8,9].includes(matrix[i][j+1].ref.current.getState())){
                if (matrix[i][j+1].ref.current.getDistance() < min){
                    min = matrix[i][j+1].ref.current.getDistance()
                    i_new = i
                    j_new = j+1
                }
            }
            if (i+1 < gridSize && [4,5,8,9].includes(matrix[i+1][j].ref.current.getState())){
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
        if (j-1 >= 0 && [0,3,7].includes(matrix[i][j-1].ref.current.getState())) {
            calculateDistance(i,j-1)
            queue.push([i, j-1])
        }
        if (i-1 >= 0 && [0,3,7].includes(matrix[i-1][j].ref.current.getState())) {
            calculateDistance(i-1,j)
            queue.push([i-1, j])
        }
        if (j+1 < gridSize && [0,3,7].includes(matrix[i][j+1].ref.current.getState())) {
            calculateDistance(i,j+1)
            queue.push([i, j+1])
        }
        if (i+1 < gridSize && [0,3,7].includes(matrix[i+1][j].ref.current.getState())) {
            calculateDistance(i+1,j)
            queue.push([i+1, j])
        }
    }

    //START

    let current = [];
    let queue = [];

    if (rounds === 0){
        matrix.forEach((row,i) => {
            row.forEach((item,j) => {
                if ([2].includes(item.ref.current.getState())){
                    item.ref.current.setDistance(0);
                }
            })
        })
    }

    if (rounds !== 0){
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
        
        if (noSearchableCheck() === 0){
            const row = matrix.findIndex(row => row.map(e => e.ref.current.getState()).includes(2));
            const col = matrix[row].map(e => e.ref.current.getState()).indexOf(2);
            if (goalCheck() === 1){
                if (pathEndCheck(row,col) === 1) {
                    console.log("FOUND!")
                    clearInterval(timer);
                    return 1;
                } else {
                    buildPath()
                }
            } else {
                let tile = getNextTile(row,col)
                if (matrix[tile[0]][tile[1]].ref.current.getState() !== 2){
                    if (matrix[tile[0]][tile[1]].ref.current.getState() === 7){
                        matrix[tile[0]][tile[1]].ref.current.setState(8);
                    } else {
                        matrix[tile[0]][tile[1]].ref.current.setState(4);
                    }  
                }
            }
        } else {
            clearInterval(timer)
            toast("No more searchables!")
            return 1;
        }

    }
    return 0;

}


export default dijkstraSearch;