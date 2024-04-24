
function dfsSearch(matrix, gridSize, timer, rounds,toast) {
    //matrix coordinates i and j are in wrong places therefore i = the actual j and j = the actual i. With this in mind algorithm still functions correctly.
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched, 6 Path, 7 Slow Tile, 8 Searching Slow Tile, 9 Searched Slow Tile, 10 Path Slow Tile.


    const searchedCheck = (i,j) => {
        var searched = 0;
        if (j-1 >= 0 && ![1].includes(matrix[i][j-1].ref.current.getState())) {
            if ([2,4,5,8,9].includes(matrix[i][j-1].ref.current.getState())){
                searched++;
            }
        }
        if (i-1 >= 0 && ![1].includes(matrix[i-1][j].ref.current.getState())){
            if ([2,4,5,8,9].includes(matrix[i-1][j].ref.current.getState())){
                searched++;
            }
        }
        if (j+1 < gridSize && ![1].includes(matrix[i][j+1].ref.current.getState())){
            if ([2,4,5,8,9].includes(matrix[i][j+1].ref.current.getState())){
                searched++;
            }
        }
        if (i+1 < gridSize && ![1].includes(matrix[i+1][j].ref.current.getState())){  
            if ([2,4,5,8,9].includes(matrix[i+1][j].ref.current.getState())){
                searched++;
            }
        }
        return searched;
    }

    const backtrackTile = (i,j,backtracked) => {
        if (j-1 >= 0 && [5,9].includes(matrix[i][j-1].ref.current.getState())) {
            let index = [i,j-1]
            const find = JSON.stringify(backtracked).includes(JSON.stringify(index));
            if (!find) {
                if (j-2 >= 0 && [0,7].includes(matrix[i][j-2].ref.current.getState()) && searchedCheck(i,j-2) < 2 ){
                    return [i,j-1]
                } else if (i-1 >= 0 && [0,7].includes(matrix[i-1][j-1].ref.current.getState()) && searchedCheck(i-1,j-1) < 2 ){
                    return [i,j-1]
                } else if (j < gridSize && [0,7].includes(matrix[i][j].ref.current.getState()) && searchedCheck(i,j) < 2 ){
                    return [i,j-1]
                } else if (i+1 < gridSize && [0,7].includes(matrix[i+1][j-1].ref.current.getState()) && searchedCheck(i+1,j-1) < 2 ){
                    return [i,j-1]
                }
            }

        }
        if (i-1 >= 0 && [5,9].includes(matrix[i-1][j].ref.current.getState())){
            let index = [i-1,j]
            const find = JSON.stringify(backtracked).includes(JSON.stringify(index));
            if (!find){
                if (j-1 >= 0 && [0,7].includes(matrix[i-1][j-1].ref.current.getState()) && searchedCheck(i-1,j-1) < 2 ){
                    return [i-1,j]
                } else if (i-2 >= 0 && [0,7].includes(matrix[i-2][j].ref.current.getState()) && searchedCheck(i-2,j) < 2 ){
                    return [i-1,j]
                } else if (j+1 < gridSize && [0,7].includes(matrix[i-1][j+1].ref.current.getState()) && searchedCheck(i-1,j+1 ) < 2 ){
                    return [i-1,j]
                } else if (i < gridSize && [0,7].includes(matrix[i][j].ref.current.getState()) && searchedCheck(i,j) < 2 ){
                    return [i-1,j]
                }
            }

        }
        if (j+1 < gridSize && [5,9].includes(matrix[i][j+1].ref.current.getState())){
            let index = [i,j+1]
            const find = JSON.stringify(backtracked).includes(JSON.stringify(index));
            if (!find){
                if (j >= 0 && [0,7].includes(matrix[i][j].ref.current.getState()) && searchedCheck(i,j) < 2 ){
                    return [i,j+1]
                } else if (i-1 >= 0 && [0,7].includes(matrix[i-1][j+1].ref.current.getState()) && searchedCheck(i-1,j+1) < 2 ){
                    return [i,j+1]
                } else if (j+2 < gridSize && [0,7].includes(matrix[i][j+2].ref.current.getState()) && searchedCheck(i,j+2) < 2 ){
                    return [i,j+1]
                } else if (i+1 < gridSize && [0,7].includes(matrix[i+1][j+1].ref.current.getState()) && searchedCheck(i+1,j+1) < 2 ){
                    return [i,j+1]
                }
            }
        }
        if (i+1 < gridSize && [5,9].includes(matrix[i+1][j].ref.current.getState())){  
            let index = [i+1,j]
            const find = JSON.stringify(backtracked).includes(JSON.stringify(index));
            if (!find/* && searchedCheck(i+1,j) < 2 */){
                if (j-1 >= 0 && [0,7].includes(matrix[i+1][j-1].ref.current.getState()) && searchedCheck(i+1,j-1) < 2){
                    return [i+1,j]
                } else if (i >= 0 && [0,7].includes(matrix[i][j].ref.current.getState()) && searchedCheck(i,j) < 2){
                    return [i+1,j]
                } else if (j+1 < gridSize && [0,7].includes(matrix[i+1][j+1].ref.current.getState()) &&  searchedCheck(i+1,j+1) < 2){
                    return [i+1,j]
                } else if (i+2 < gridSize && [0,7].includes(matrix[i+2][j].ref.current.getState()) && searchedCheck(i+2,j) < 2){
                    return [i+1,j]
                }
            }
        }
        return 0
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
        matrix[i_min][j_min].ref.current.setDistance(min+1)
    }

    //Goes through queue list and calculates the next tile to search
    const getNextTile = (row,col) => {
        var i_max = 0;
        var j_max = 0;
        var x = 0;
        var y = 0;
        var max = 0;
        var min = 100000;
        matrix.forEach((row,i) => {
            row.forEach((item,j) => {
                if ([4,8].includes(item.ref.current.getState())){
                    x = i
                    y = j
                    if (j-1 >= 0 && [0,7].includes(matrix[i][j-1].ref.current.getState()) && searchedCheck(i,j-1) < 2 && matrix[i][j-1].ref.current.getDistance() > max){
                            max = matrix[i][j-1].ref.current.getDistance()
                            i_max = i
                            j_max = j-1
                    } else if (i-1 >= 0 && [0,7].includes(matrix[i-1][j].ref.current.getState()) && searchedCheck(i-1,j) < 2 && matrix[i-1][j].ref.current.getDistance() > max){
                            max = matrix[i-1][j].ref.current.getDistance()
                            i_max = i-1
                            j_max = j
                    } else if (j+1 < gridSize && [0,7].includes(matrix[i][j+1].ref.current.getState()) && searchedCheck(i,j+1) < 2 && matrix[i][j+1].ref.current.getDistance() > max){
                            max = matrix[i][j+1].ref.current.getDistance()
                            i_max = i
                            j_max = j+1
                    } else if (i+1 < gridSize && [0,7].includes(matrix[i+1][j].ref.current.getState()) && searchedCheck(i+1,j) < 2 && matrix[i+1][j].ref.current.getDistance() > max) {
                            max = matrix[i+1][j].ref.current.getDistance()
                            i_max = i+1
                            j_max = j
                    }
                }
            })
        })
        if (max === 0){
            var nextFound = 0
            var repeat = 0;
            let visited = [[100000,100000]]
            while (nextFound === 0){
                let backtrack = backtrackTile(x,y,visited)
                visited.push([x,y])
                if (backtrack !== 0){
                    var i = backtrack[0]
                    var j = backtrack[1]
                    if (j-1 >= 0 && [0,7].includes(matrix[i][j-1].ref.current.getState()) && searchedCheck(i,j-1) < 2 && matrix[i][j-1].ref.current.getDistance() > max){
                        max = matrix[i][j-1].ref.current.getDistance()
                        i_max = i
                        j_max = j-1
                    } else if (i-1 >= 0 && [0,7].includes(matrix[i-1][j].ref.current.getState()) && searchedCheck(i-1,j) < 2 && matrix[i-1][j].ref.current.getDistance() > max){
                        max = matrix[i-1][j].ref.current.getDistance()
                        i_max = i-1
                        j_max = j
                    } else if (j+1 < gridSize && [0,7].includes(matrix[i][j+1].ref.current.getState()) && searchedCheck(i,j+1) < 2 && matrix[i][j+1].ref.current.getDistance() > max){
                        max = matrix[i][j+1].ref.current.getDistance()
                        i_max = i
                        j_max = j+1
                    } else if (i+1 < gridSize && [0,7].includes(matrix[i+1][j].ref.current.getState()) && searchedCheck(i+1,j) < 2 && matrix[i+1][j].ref.current.getDistance() > max) {
                        max = matrix[i+1][j].ref.current.getDistance()
                        i_max = i+1
                        j_max = j
                    }
                } else {
                    i = x
                    j = y
                    if (j-1 >= 0 && [5,9].includes(matrix[i][j-1].ref.current.getState()) && !(JSON.stringify(visited).includes(JSON.stringify([i,j-1]))) && matrix[i][j-1].ref.current.getDistance() <= min){
                        min = matrix[i][j-1].ref.current.getDistance()
                        j = j-1
                    } else if (i-1 >= 0 && [5,9].includes(matrix[i-1][j].ref.current.getState()) && !(JSON.stringify(visited).includes(JSON.stringify([i-1,j]))) && matrix[i-1][j].ref.current.getDistance() <= min){
                        min = matrix[i-1][j].ref.current.getDistance()
                        i = i-1
                    } else if (j+1 < gridSize && [5,9].includes(matrix[i][j+1].ref.current.getState()) && !(JSON.stringify(visited).includes(JSON.stringify([i,j+1]))) && matrix[i][j+1].ref.current.getDistance() <= min){
                        min = matrix[i][j+1].ref.current.getDistance()
                        j = j+1
                    } else if (i+1 < gridSize && [5,9].includes(matrix[i+1][j].ref.current.getState()) && !(JSON.stringify(visited).includes(JSON.stringify([i+1,j]))) && matrix[i+1][j].ref.current.getDistance() <= min) {
                        min = matrix[i+1][j].ref.current.getDistance()
                        i = i+1
                    }
                } 
                if (max !== 0){
                    nextFound = 1
                } else {
                    visited.forEach(([i2,j2]) => {
                    })
                    x = i
                    y = j
                    if ((JSON.stringify(visited).includes(JSON.stringify([x,y])))){
                        repeat++;
                    }
                    if (repeat === 10){
                        visited = [[100000,100000]]
                        repeat = 0;
                        max = 0;
                        matrix.forEach((row,i) => {
                            row.forEach((item,j) => { 
                                if ([2,5,9].includes(matrix[i][j].ref.current.getState())){
                                    if (j-1 >= 0 && [0,7].includes(matrix[i][j-1].ref.current.getState()) && matrix[i][j-1].ref.current.getDistance() > max){
                                        max = matrix[i][j-1].ref.current.getDistance()
                                        i_max = i
                                        j_max = j-1
                                    }
                                    if (i-1 >= 0 && [0,7].includes(matrix[i-1][j].ref.current.getState()) && matrix[i-1][j].ref.current.getDistance() > max){
                                        max = matrix[i-1][j].ref.current.getDistance()
                                        i_max = i-1
                                        j_max = j
                                    }
                                    if (j+1 < gridSize && [0,7].includes(matrix[i][j+1].ref.current.getState()) && matrix[i][j+1].ref.current.getDistance() > max) {
                                        min = matrix[i][j+1].ref.current.getDistance()
                                        i_max = i
                                        j_max = j+1
                                    }
                                    if (i+1 < gridSize && [0,7].includes(matrix[i+1][j].ref.current.getState()) && matrix[i+1][j].ref.current.getDistance() > max) {
                                        max = matrix[i+1][j].ref.current.getDistance()
                                        i_max = i+1
                                        j_max = j
                                    }
                                }
                            })
                        })
                        if (max === 0){
                            return 0;
                        } else {
                            return [i_max,j_max]
                        }
                    }
                }

            }
        }
        return [i_max,j_max]
    }

    // Checks if the goal tile is in queue list.
    const goalCheck = () => {
        var found = 0;
        queue.forEach(([i,j]) => {
            if (j-1 >= 0 && matrix[i][j-1].ref.current.getState() === 3) {
                found = 1;
            }
            if (i-1 >= 0 && matrix[i-1][j].ref.current.getState() === 3) {
                found = 1;
            }
            if (j+1 < gridSize && matrix[i][j+1].ref.current.getState() === 3) {
                found = 1;
            }
            if (i+1 < gridSize && matrix[i+1][j].ref.current.getState() === 3) {
                found = 1;
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
        var min = 0;
        matrix.forEach((row,x) => {
            row.forEach((item,y) => {
                if ([3,6,10].includes(item.ref.current.getState())){
                    path.push([x,y])
                }
            })
        })
        min = 100000;
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
    } 

    // Determines the next tiles in the queue from current list which contains all already searched tiles.
    const directions = (i,j) => {
        if (j-1 >= 0 && [4,3,6,8].includes(matrix[i][j-1].ref.current.getState())) {
            if ([4,8].includes(matrix[i][j-1].ref.current.getState())){
                calculateDistance(i,j-1)
            }
            queue.push([i, j-1])
        }
        if (i-1 >= 0 && [4,3,6,8].includes(matrix[i-1][j].ref.current.getState())) {
            if ([4,8].includes(matrix[i-1][j].ref.current.getState())){
                calculateDistance(i-1,j)
            }
            queue.push([i-1, j])
        }
        if (j+1 < gridSize && [4,3,6,8].includes(matrix[i][j+1].ref.current.getState())) {
            if ([4,8].includes(matrix[i][j+1].ref.current.getState())){
                calculateDistance(i,j+1)
            }
            queue.push([i, j+1])
        }
        if (i+1 < gridSize && [4,3,6,8].includes(matrix[i+1][j].ref.current.getState())) {
            if ([4,8].includes(matrix[i+1][j].ref.current.getState())){
                calculateDistance(i+1,j)
            }
            queue.push([i+1, j])
        }
    }
    let current = [];
    let queue = [];

    if (rounds === 0){
        var hasAlreadyStarted = 0;
        var x = 0;
        var y = 0;
        matrix.forEach((row,i) => {
            row.forEach((item,j) => {
                if ([4,5,6,8,9,10].includes(item.ref.current.getState()) && pathEndCheck(i,j) === 0){
                    hasAlreadyStarted = 1;
                }
                if ([2].includes(item.ref.current.getState()) && pathEndCheck(i,j) === 0){
                    current.push(i,j)
                    item.ref.current.setDistance(0);
                    x = i
                    y = j
                }
            })
        })
        if (hasAlreadyStarted === 0){
            if (y-1 >= 0 && ([0,7].includes(matrix[x][y-1].ref.current.getState()))){
                if ([0].includes(matrix[x][y-1].ref.current.getState())){
                    matrix[x][y-1].ref.current.setState(4)
                } else {
                    matrix[x][y-1].ref.current.setState(8)
                }
                
                matrix[x][y-1].ref.current.setDistance(1);
            } else if (x-1 >= 0 && ([0,7].includes(matrix[x-1][y].ref.current.getState()))){
                if ([0].includes(matrix[x-1][y].ref.current.getState())){
                    matrix[x-1][y].ref.current.setState(4)
                } else {
                    matrix[x-1][y].ref.current.setState(8)
                }
                matrix[x-1][y].ref.current.setDistance(1)
            } else if (y+1 < gridSize && ([0,7].includes(matrix[x][y+1].ref.current.getState()))){
                if ([0].includes(matrix[x][y+1].ref.current.getState())){
                    matrix[x][y+1].ref.current.setState(4)
                } else {
                    matrix[x][y+1].ref.current.setState(8)
                }
                matrix[x][y+1].ref.current.setDistance(1)
            } else if (x+1 < gridSize && ([0,7].includes(matrix[x+1][y].ref.current.getState()))){
                if ([0].includes(matrix[x+1][y].ref.current.getState())){
                    matrix[x+1][y].ref.current.setState(4)
                } else {
                    matrix[x+1][y].ref.current.setState(8)
                }
                
                matrix[x+1][y].ref.current.setDistance(1)
            } 
        }
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
        })
    
        const row = matrix.findIndex(row => row.map(e => e.ref.current.getState()).includes(2));
        const col = matrix[row].map(e => e.ref.current.getState()).indexOf(2);
        if (goalCheck() === 1){
            if (pathEndCheck(row,col) === 1) {
                console.log("FOUND!")
                clearInterval(timer);
                return 1;
            } else {   
                var distanceReady = 1;
                matrix.forEach((row,i) => {
                    row.forEach((item,j) => {
                        if ([4,8].includes(item.ref.current.getState())){
                            if ( matrix[i][j].ref.current.getDistance() === 100000){
                                distanceReady = 0;
                            }
                        }
                    })
                });    
                if (distanceReady === 1){
                    buildPath()
                }
            }
        } else {
            let tile = getNextTile(row,col)
            current.forEach(([i,j]) => {
                if ([4].includes(matrix[i][j].ref.current.getState())){
                    matrix[i][j].ref.current.setState(5)
                } else if ([8].includes(matrix[i][j].ref.current.getState())){
                    matrix[i][j].ref.current.setState(9)
                }
            })
                if (tile !== 0){
                    if (matrix[tile[0]][tile[1]].ref.current.getState() !== 2){
                        if (matrix[tile[0]][tile[1]].ref.current.getState() === 7){
                            matrix[tile[0]][tile[1]].ref.current.setState(8);
                        } else {
                            matrix[tile[0]][tile[1]].ref.current.setState(4);
                        }  
                    }
                } else {
                    clearInterval(timer)
                    toast("No more searchables!")
                    return 1;
                }

            
        }
    }
    return 0;

}


export default dfsSearch;