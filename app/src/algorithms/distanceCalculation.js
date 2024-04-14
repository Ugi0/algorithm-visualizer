function distanceCalculation(matrix, gridSize, timer, rounds){
    const getNextDistance = () => {
        var i_min = 0;
        var j_min = 0;
        var min = 100001;
        queue.forEach(([i,j]) => {
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
        })
        if (matrix[i_min][j_min].ref.current.getState() === 1) {
            matrix[i_min][j_min].ref.current.setDistance(min+10000)
        } else {
            if (matrix[i_min][j_min].ref.current.getState() === 7){
                matrix[i_min][j_min].ref.current.setDistance(min+3)
            } else {
                matrix[i_min][j_min].ref.current.setDistance(min+1)
            }
        }
    }

    const directions = (i,j) => {
        if (j-1 >= 0 && matrix[i][j-1].ref.current.getDistance() === 100000) {
            queue.push([i, j-1])
        }
        if (i-1 >= 0 && matrix[i-1][j].ref.current.getDistance() === 100000) {
            queue.push([i-1, j])
        }
        if (j+1 < gridSize&& matrix[i][j+1].ref.current.getDistance() === 100000) {
            queue.push([i, j+1])
        }
        if (i+1 < gridSize && matrix[i+1][j].ref.current.getDistance() === 100000) {
            queue.push([i+1, j])
        }
    }
    let current = [];
    let queue = [];
    var distancelessTiles = 0;

    matrix.forEach((row,i) => {
        row.forEach((item,j) => {
            if (item.ref.current.getDistance() === 100000){
                distancelessTiles = 1;
            }
        })
    })

    if (distancelessTiles === 1) {
        if (rounds === 0) {
            const row = matrix.findIndex(row => row.map(e => e.ref.current.getState()).includes(2));
            const col = matrix[row].map(e => e.ref.current.getState()).indexOf(2);
            matrix[row][col].ref.current.setDistance(0)
        }
    
        if (rounds !== 0){
            var x = 0;
            matrix.forEach((row,i) => {
                row.forEach((item,j) => {
                    if (item.ref.current.getDistance() !== 100000){
                        current.push([i,j])
                    }
                })
            })
            current.forEach(([i,j]) => {
                directions(i,j)
            })
            getNextDistance()
        }
        return 0;
    } else {
        clearInterval(timer);
        return 1;
    }
}


export default distanceCalculation;