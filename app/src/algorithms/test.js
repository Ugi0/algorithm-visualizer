
function test(matrix, gridSize) {
    //Take a matrix, do a step and return a new matrix
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched

    const directions = (ind) => {
        const i = ind[0]
        const j = ind[1]
        let ans = [];
        if (i-1 >= 0) {
            ans.push([i-1, j])
        }
        if (i+1 < gridSize) {
            ans.push([i+1, j])
        }
        if (j-1 >= 0) {
            ans.push([i, j-1])
        }
        if (j+1 < gridSize) {
            ans.push([i, j+1])
        }
        return ans
    }

    let current = [];
    matrix.forEach((row,i) => {
        row.forEach((item,j) => {
            if (item.ref.current.getItemState() === 4) {
                current.push([i,j])
            }
        })
    });
    if (current.length === 0) {
        const row = matrix.findIndex(row => row.map(e => e.ref.current.getItemState()).includes(2));
        const col = matrix[row].map(e => e.ref.current.getItemState()).indexOf(2);
        matrix[row][col+1].ref.current.setItemState(4);
        matrix[row][col-1].ref.current.setItemState(4);
        matrix[row-1][col].ref.current.setItemState(4);
        matrix[row+1][col].ref.current.setItemState(4);
        return matrix
    }
    current.forEach((ind) => {
        directions(ind).forEach(ind => {
            if (matrix[ind[0]][ind[1]].ref.current.getItemState() === 0) {
                matrix[ind[0]][ind[1]].ref.current.setItemState(4)
            }
        })
        matrix[ind[0]][ind[1]].ref.current.setItemState(5)
    })
    return matrix
}


export default test;