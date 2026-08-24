function depthFirstSearch(x, y) {

    if (logicGrid[x][y] === logicGrid[goal[0]][goal[1]]) {
        return true;
    }

    logicGrid[x][y]["visited"] = true;

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dc, dr] of directions) {
        const nCol = x + dc;
        const nRow = y + dr;

        if (nCol >= 0 && nCol < col && nRow >= 0 && nRow < row && !logicGrid[nCol][nRow]["visited"]){
            const found = depthFirstSearch(nCol, nRow);

            if (found) {
                return true;
            }
        }
    }
    return false;
}

function depthFirstSim(x, y) {
    
}