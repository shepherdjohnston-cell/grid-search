const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; /*left, right, down, up traversal grid traversal*/


async function retrace(x, y) {
    if (logicGrid[x][y]["previous"] === 0 || 
        logicGrid[x][y] === logicGrid[goal[0]][goal[1]]){
        return;
    }

    domGrid[x][y].className = 'path';
    await sleep(20);
    retrace(logicGrid[x][y]["previous"][0], logicGrid[x][y]["previous"][1]);
}


const searchOrder = [];
function depthFirstSearch(x, y) {
    /*breakout condition: goal found*/
    if (logicGrid[x][y] === logicGrid[goal[0]][goal[1]]) {
        return true;
    }

    logicGrid[x][y]["visited"] = true;
    if (x != start[0] || y != start[1]){
        searchOrder.push([x, y]);
    }

    /*Purely logic based depth-first recursion search*/
    for (const [dc, dr] of directions) {
        const nCol = x + dc;
        const nRow = y + dr;

        if (nCol >= 0 && nCol < col && nRow >= 0 && nRow < row 
            && !logicGrid[nCol][nRow]["visited"] && !logicGrid[nCol][nRow]["isWall"]){
            
            logicGrid[nCol][nRow]["previous"] = [x, y]
            const found = depthFirstSearch(nCol, nRow);

            if (found) {
                return true;
            }
        }
    }
    return false;
}


async function replay() {
    for (i = 0; i < searchOrder.length; i++)
    {
        const [x, y] = searchOrder[i];
        domGrid[x][y].className = 'visited';
        
        for (const [dc, dr] of directions) {
            const nCol = x + dc;
            const nRow = y + dr;
            domGrid[nCol][nRow].className = 'frontier';
        }
        await sleep(20);    
    }
}
    