
function search(matrix, gridSize, timer, rounds) {
    //Take a matrix, do a step and return a new matrix
    //matrix coordinates i and j are in wrong places therefore i = the actual j and j = the actual i. With this in mind algorithm still functions correctly.
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched


    // Goes through queue list and calculates the next tile to search. Also calculates distance value for the tile.
    const getNextTile = () => {
        var i = 0;
        var j = 0;
        var i_min = 0;
        var j_min = 0;
        var min = 60000;
        queue.forEach((ind) => {
            i = ind[0]
            j = ind[1]
            if (j-1 >= 0 && matrix[i][j-1].ref.current.getItemState() !== 1) {
                if (matrix[i][j-1].ref.current.getItemDistance() < min) {
                    min = matrix[i][j-1].ref.current.getItemDistance()
                    i_min = ind[0]
                    j_min = ind[1]
                }
            }
            if (i-1 >= 0 && matrix[i-1][j].ref.current.getItemState() !== 1 ) {
                if (matrix[i-1][j].ref.current.getItemDistance() < min) {
                    min = matrix[i-1][j].ref.current.getItemDistance()
                    i_min = ind[0]
                    j_min = ind[1]
                }
            }
            if (j+1 < gridSize && matrix[i][j+1].ref.current.getItemState() !== 1) {
                if (matrix[i][j+1].ref.current.getItemDistance() < min) {
                    min = matrix[i][j+1].ref.current.getItemDistance()
                    i_min = ind[0]
                    j_min = ind[1]
                }
            }
            if (i+1 < gridSize && matrix[i+1][j].ref.current.getItemState() !== 1) {
                if (matrix[i+1][j].ref.current.getItemDistance() < min) {
                    min = matrix[i+1][j].ref.current.getItemDistance()
                    i_min = ind[0]
                    j_min = ind[1]
                }
            }
        }) 
        matrix[i_min][j_min].ref.current.setItemDistance(min+1)
        return [i_min,j_min]
    }


    // Checks if the goal tile is in queue list.
    const goalCheck = () => {
        var found = 0;
        queue.forEach((ind) => {
            if (matrix[ind[0]][ind[1]].ref.current.getItemState() === 3){
                found = 1
            }
        })
        return found;
    }

    const pathEnd = (i,j) => {
        if (j-1 >= 0 && (matrix[i][j-1].ref.current.getItemState() === 4 || matrix[i][j-1].ref.current.getItemState() === 2)){
            return 1;
        }
        if (i-1 >= 0 && (matrix[i-1][j].ref.current.getItemState() === 4 || matrix[i-1][j].ref.current.getItemState() === 2)){
            return 1;
        }
        if (j+1 < gridSize && (matrix[i][j+1].ref.current.getItemState() === 4 || matrix[i][j+1].ref.current.getItemState() === 2)){
            return 1;
        }
        if (i+1 < gridSize && (matrix[i+1][j].ref.current.getItemState() === 4 || matrix[i+1][j].ref.current.getItemState() === 2)){
            return 1;
        } else {
            return 0;
        }
    }


    const buildPath = () => {
        var i = 0;
        var j = 0;
        var i_new = 0;
        var j_new = 0;
        let path = []
        matrix.forEach((row,x) => {
            row.forEach((item,y) => {
                if (item.ref.current.getItemState() === 3){
                    path.push([x,y])
                }
                if (item.ref.current.getItemState() === 4){
                    path.push([x,y])
                }
            })
        })
        var min = 60000;
       /* while (x === 0){
            i_new = i
            j_new = j
            x = 1;
            visiting = ([i_new,j_new-1])
            if (j_new-1 >= 0 
                && matrix[i_new][j_new-1].ref.current.getItemState() === 4
                && JSON.stringify(visited).includes(JSON.stringify(visiting)) === false){
                console.log("HELLO")
                i = i_new
                j = j_new-1
                x = 0;
                visited.push([i_new,j_new-1])
            }
            visiting = ([i_new-1,j_new])
            if (i_new-1 >= 0 
                && matrix[i_new-1][j_new].ref.current.getItemState() === 4
                && JSON.stringify(visited).includes(JSON.stringify(visiting)) === false){
                console.log("HELLO")
                i = i_new-1
                j = j_new
                x = 0;
                visited.push([i_new-1,j_new])
            }
            visiting = ([i_new,j_new+1])
            if (j_new+1 < gridSize 
                && matrix[i_new][j_new+1].ref.current.getItemState() === 4
                && JSON.stringify(visited).includes(JSON.stringify(visiting)) === false){
                console.log("HELLO")
                i = i_new
                j = j_new+1
                x = 0;
                visited.push([i_new,j_new+1])
            }
            visiting = ([i_new+1,j_new])
            if (i_new+1 < gridSize 
                && matrix[i_new+1][j_new].ref.current.getItemState() === 4
                && JSON.stringify(visited).includes(JSON.stringify(visiting)) === false){
                console.log("HELLO")
                i = i_new+1
                j = j_new
                x = 0;
                visited.push([i_new+1,j_new])
            }
        } */
        console.log("PATH: ", path)
        path.forEach((ind) => {
            i = ind[0]
            j = ind[1]
            if (j-1 >= 0 && matrix[i][j-1].ref.current.getItemState() !== 1){
                if (matrix[i][j-1].ref.current.getItemDistance() < min){
                    min = matrix[i][j-1].ref.current.getItemDistance()
                    i_new = i
                    j_new = j-1
                }
            }
            if (i-1 >= 0 && matrix[i-1][j].ref.current.getItemState() !== 1){
                if (matrix[i-1][j].ref.current.getItemDistance() < min){
                    min = matrix[i-1][j].ref.current.getItemDistance()
                    i_new = i-1
                    j_new = j
                }
            }
            if (j+1 < gridSize && matrix[i][j+1].ref.current.getItemState() !== 1){
                if (matrix[i][j+1].ref.current.getItemDistance() < min){
                    min = matrix[i][j+1].ref.current.getItemDistance()
                    i_new = i
                    j_new = j+1
                }
            }
            if (i+1 < gridSize && matrix[i+1][j].ref.current.getItemState() !== 1){
                if (matrix[i+1][j].ref.current.getItemDistance() < min){
                    min = matrix[i+1][j].ref.current.getItemDistance()
                    i_new = i+1
                    j_new = j
                }
            }
        })
        console.log("LISÄTTÄVÄ TILE: ", i_new, ", ", j_new)
        matrix[i_new][j_new].ref.current.setItemState(4)
        return ([i_new,j_new])
    } 

    // Determines the next tiles in the queue from current list which contains all already searched tiles.
    const directions = (ind) => {
        const i = ind[0]
        const j = ind[1]
        if (j-1 >= 0 
            && matrix[i][j-1].ref.current.getItemState() !== 1
            && matrix[i][j-1].ref.current.getItemState() !== 2 
            && matrix[i][j-1].ref.current.getItemState() !== 4 
            && matrix[i][j-1].ref.current.getItemState() !== 5) {
            queue.push([i, j-1])
        }
        if (i-1 >= 0 
            && matrix[i-1][j].ref.current.getItemState() !== 1 
            && matrix[i-1][j].ref.current.getItemState() !== 2 
            && matrix[i-1][j].ref.current.getItemState() !== 4
            && matrix[i-1][j].ref.current.getItemState() !== 5) {
            queue.push([i-1, j])
        }
        if (j+1 < gridSize
            && matrix[i][j+1].ref.current.getItemState() !== 1
            && matrix[i][j+1].ref.current.getItemState() !== 2
            && matrix[i][j+1].ref.current.getItemState() !== 4
            && matrix[i][j+1].ref.current.getItemState() !== 5) {
            queue.push([i, j+1])
        }
        if (i+1 < gridSize 
            && matrix[i+1][j].ref.current.getItemState() !== 1
            && matrix[i+1][j].ref.current.getItemState() !== 2 
            && matrix[i+1][j].ref.current.getItemState() !== 4 
            && matrix[i+1][j].ref.current.getItemState() !== 5) {
            queue.push([i+1, j])
        }
    }
    let current = [];
    let queue = [];

    //console.log("RUNDIT OVAT 0 TAI 1: ", 1 === 0 && (rounds === 0 || rounds === 1))

    // Determines starting value for the starting tile when the algorithm starts.
    if (rounds === 0) {
        const row = matrix.findIndex(row => row.map(e => e.ref.current.getItemState()).includes(2));
        const col = matrix[row].map(e => e.ref.current.getItemState()).indexOf(2);
        matrix[row][col].ref.current.setItemDistance(0)
    }

    if (rounds !== 0){
        matrix.forEach((row,i) => {
            row.forEach((item,j) => {
                if (item.ref.current.getItemState() === 2) {
                    current.push([i,j])
                } else if (item.ref.current.getItemState() === 4){
                        current.push([i,j])
                } else if (item.ref.current.getItemState() === 5){
                    current.push([i,j])
                }
            })
        });
    
        current.forEach((ind) => {
            directions(ind)
            if (matrix[ind[0]][ind[1]].ref.current.getItemState() !== 1
            && matrix[ind[0]][ind[1]].ref.current.getItemState() !== 2
            && matrix[ind[0]][ind[1]].ref.current.getItemState() !== 3
            && goalCheck() === 0){
                matrix[ind[0]][ind[1]].ref.current.setItemState(5)
            }
        })
        const row = matrix.findIndex(row => row.map(e => e.ref.current.getItemState()).includes(2));
        const col = matrix[row].map(e => e.ref.current.getItemState()).indexOf(2);
        if (goalCheck() === 1){
          //  console.log("FOUND!")
            buildPath()
            if (pathEnd(row,col) === 1) {
                clearInterval(timer);
            }  
        } else {
            
            let tile = getNextTile(row,col)
          //  console.log("Add new Searching tile.")
            matrix[tile[0]][tile[1]].ref.current.setItemState(4);
        }
    }

    return matrix
}


export default search;