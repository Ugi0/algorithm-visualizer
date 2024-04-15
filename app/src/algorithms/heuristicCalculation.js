function heuristicCalculation(matrix, gridSize, timer, rounds){

    const goalCheck = (i,j) => {
        var finished = 0;
        if (j-1 < 0) {
            finished++;
        } else if (matrix[i][j-1].ref.current.getHeuristic() !== 100000) {
            finished++;
        }
        if (i-1 < 0) {
            finished++;
        } else if (matrix[i][j-1].ref.current.getHeuristic() !== 100000) {
            finished++;
        }
        if (j+1 >= gridSize){
            finished++;
        } else if (matrix[i][j+1].ref.current.getHeuristic() !== 100000){
            finished++;
        }
        if (i+1 >= gridSize) {
            finished++;
        } else if (matrix[i+1][j].ref.current.getHeuristic() !== 100000){
            finished++;
        }
        return finished;
    }

    const getNextHeuristic = () => {
        var i_min = 0;
        var j_min = 0;
        var min = 100001;
        queue.forEach(([i,j]) => {
            if (j-1 >= 0) {
                if (matrix[i][j-1].ref.current.getHeuristic() < min) {
                    min = matrix[i][j-1].ref.current.getHeuristic()
                    i_min = i
                    j_min = j
                }
            }
            if (i-1 >= 0) {
                if (matrix[i-1][j].ref.current.getHeuristic() < min) {
                    min = matrix[i-1][j].ref.current.getHeuristic()
                    i_min = i
                    j_min = j
                }
            }
            if (j+1 < gridSize) {
                if (matrix[i][j+1].ref.current.getHeuristic() < min) {
                    min = matrix[i][j+1].ref.current.getHeuristic()
                    i_min = i
                    j_min = j
                }
            }
            if (i+1 < gridSize) {
                if (matrix[i+1][j].ref.current.getHeuristic() < min) {
                    min = matrix[i+1][j].ref.current.getHeuristic()
                    i_min = i
                    j_min = j
                }
            }
        })
        if (matrix[i_min][j_min].ref.current.getState() === 1) {
            matrix[i_min][j_min].ref.current.setHeuristic(min+10000)
        } else {
            if (matrix[i_min][j_min].ref.current.getState() === 7){
                matrix[i_min][j_min].ref.current.setHeuristic(min+5)
            } else {
                matrix[i_min][j_min].ref.current.setHeuristic(min+1)
            }
        }
    }

    const directions = (i,j) => {
        if (j-1 >= 0 && matrix[i][j-1].ref.current.getHeuristic() === 100000) {
            queue.push([i, j-1])
        }
        if (i-1 >= 0 && matrix[i-1][j].ref.current.getHeuristic() === 100000) {
            queue.push([i-1, j])
        }
        if (j+1 < gridSize&& matrix[i][j+1].ref.current.getHeuristic() === 100000) {
            queue.push([i, j+1])
        }
        if (i+1 < gridSize && matrix[i+1][j].ref.current.getHeuristic() === 100000) {
            queue.push([i+1, j])
        }
    }
    let current = [];
    let queue = [];
    var complete = 0;


    if (rounds === 0) {
        const row = matrix.findIndex(row => row.map(e => e.ref.current.getState()).includes(3));
        const col = matrix[row].map(e => e.ref.current.getState()).indexOf(3);
        matrix[row][col].ref.current.setHeuristic(0)
    }

    if (rounds !== 0){
        matrix.forEach((row,i) => {
            row.forEach((item,j) => {
                if (item.ref.current.getState() === 2) {
                    if (goalCheck(i,j) === 4){
                        complete = 1;
                    }  
                }
                if (item.ref.current.getHeuristic() !== 100000){
                    if (j-1 >= 0 && matrix[i][j-1].ref.current.getHeuristic() === 100000){
                        current.push([i,j])
                    } else if(i-1 >= 0 && matrix[i-1][j].ref.current.getHeuristic() === 100000){
                        current.push([i,j])
                    } else if (j+1 < gridSize && matrix[i][j+1].ref.current.getHeuristic() === 100000){
                        current.push([i,j])
                    } else if (i+1 < gridSize && matrix[i+1][j].ref.current.getHeuristic() === 100000){
                        current.push([i,j])
                    } 
                }
            })
        })
        current.forEach(([i,j]) => {
            directions(i,j)
        })
        getNextHeuristic()
    }

    if (complete === 1){
        clearInterval(timer);
        return 1;
    } else {
        return 0;
    }
}


export default heuristicCalculation;