
function search(matrix, gridSize, timer) {
    //Take a matrix, do a step and return a new matrix
    //matrix coordinates i and j are in wrong places therefore i = the actual j and j = the actual i
    //doesn't work correctly with borders yet
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched
    const goalCheck = () => {
        var found = 0;
        queue.forEach((ind) => {
            if (matrix[ind[0]][ind[1]].ref.current.getItemState() === 3){
                found = 1
            }
        })
        return found;
    }

    const directions = (ind) => {
        const i = ind[0]
        const j = ind[1]
        let ans = [];
        if (j-1 >= 0 
            && matrix[i][j-1].ref.current.getItemState() !== 1
            && matrix[i][j-1].ref.current.getItemState() !== 2 
            && matrix[i][j-1].ref.current.getItemState() !== 4 
            && matrix[i][j-1].ref.current.getItemState() !== 5) {
            ans.push([i, j-1])
            queue.push([i, j-1])
        }
        if (i-1 >= 0 
            && matrix[i-1][j].ref.current.getItemState() !== 1 
            && matrix[i-1][j].ref.current.getItemState() !== 2 
            && matrix[i-1][j].ref.current.getItemState() !== 4
            && matrix[i-1][j].ref.current.getItemState() !== 5) {
            ans.push([i-1, j])
            queue.push([i-1, j])
        }
        if (j+1 < gridSize
            && matrix[i][j+1].ref.current.getItemState() !== 1
            && matrix[i][j+1].ref.current.getItemState() !== 2
            && matrix[i][j+1].ref.current.getItemState() !== 4
            && matrix[i][j+1].ref.current.getItemState() !== 5) {
            ans.push([i, j+1])
            queue.push([i, j+1])
        }
        if (i+1 < gridSize 
            && matrix[i+1][j].ref.current.getItemState() !== 1
            && matrix[i+1][j].ref.current.getItemState() !== 2 
            && matrix[i+1][j].ref.current.getItemState() !== 4 
            && matrix[i+1][j].ref.current.getItemState() !== 5) {
            ans.push([i+1, j])
            queue.push([i+1, j])
        }

        return ans
    }



    let current = [];
    let queue = [];
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
        && matrix[ind[0]][ind[1]].ref.current.getItemState() !== 3){
            matrix[ind[0]][ind[1]].ref.current.setItemState(5)
        }
    })

    const row = matrix.findIndex(row => row.map(e => e.ref.current.getItemState()).includes(2));
    const col = matrix[row].map(e => e.ref.current.getItemState()).indexOf(2);
    var i = 0;
    var j = 0;
    var i_dif = 0;
    var j_dif = 0;
    var sum = 0;
    var min = 1000;
    queue.forEach((ind) => {
        i_dif = Math.abs(ind[0] - row)
        j_dif = Math.abs(ind[1] - col)
        sum = i_dif + j_dif
        if (sum < min){
            min = sum
            i = ind[0]
            j = ind[1]
            console.log("min coord: ", ind[0], ", ", ind[1])
        }
    })
    if (goalCheck() === 1){
        clearInterval(timer);
        console.log("FOUND!")
    } else {
        console.log("New Searching tile.")
        matrix[i][j].ref.current.setItemState(4);
    }
    return matrix
}


export default search;