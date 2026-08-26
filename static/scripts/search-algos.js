const directions = [[0, 1], [0, -1], [-1, 0], [1, 0]]; /*left, right, down, up traversal grid traversal*/
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const searchOrder = [];


async function retrace(x, y) {
    if (logicGrid[x][y]["previous"] === 0){
        return;
    }

    if (domGrid[x][y].className !== 'goal' && domGrid[x][y].className !== 'start'){
        domGrid[x][y].className = 'path';
    }
    
    await sleep(10);
    await retrace(logicGrid[x][y]["previous"][0], logicGrid[x][y]["previous"][1]);
}


function depthFirst(x, y) {
    /*breakout condition: goal found*/
    if (logicGrid[x][y] === logicGrid[goal[0]][goal[1]]) {
        return true;
    }

    logicGrid[x][y]["visited"] = true;
    if (x != start[0] || y != start[1]){
        searchOrder.push([x, y]);
    }

    /*Purely logic based depth-first recursion search*/
    for (const [dr, dc] of directions) {
        const nRow = x + dr;
        const nCol = y + dc;

        if (nCol >= 0 && nCol < col && nRow >= 0 && nRow < row 
            && !logicGrid[nRow][nCol]["visited"] && !logicGrid[nRow][nCol]["isWall"]){
            
            logicGrid[nRow][nCol]["previous"] = [x, y];
            const found = depthFirst(nRow, nCol);

            if (found) {
                return true;
            }
        }
    }
    return false;
}

const searchQueue = [];
function breadthFirst() {
    searchQueue.push([start[0], start[1]]);

    while (searchQueue.length > 0)
    {
        const [x, y] = searchQueue.shift();
        if (logicGrid[x][y] !== logicGrid[start[0]][start[1]] 
            && logicGrid[x][y] !== logicGrid[goal[0]][goal[1]])
        {
            searchOrder.push([x, y]);
        }



        for (const [dr, dc] of directions)
        {
            const nRow = x + dr;
            const nCol = y + dc;

            if (nCol >= 0 && nCol < col && nRow >= 0 && nRow < row 
            && !logicGrid[nRow][nCol]["visited"] && !logicGrid[nRow][nCol]["isWall"])
            {
                logicGrid[nRow][nCol]['previous'] = [x, y];
                searchQueue.push([nRow, nCol]);
                logicGrid[nRow][nCol]['visited'] = true;
            }
        }
    }
}


async function replay() {
    for (i = 0; i < searchOrder.length; i++)
    {
        const [x, y] = searchOrder[i];
        if (logicGrid[x][y] !== logicGrid[goal[0]][goal[1]])
        {
            domGrid[x][y].className = 'visited';
        }
        
        for (const [dr, dc] of directions) {
            const nRow = x + dr;
            const nCol = y + dc;
            

            if (nCol >= 0 && nCol < col && nRow >= 0 && nRow < row 
            && domGrid[nRow][nCol].className !== 'visited' && !logicGrid[nRow][nCol]["isWall"]
            && domGrid[nRow][nCol].className !== 'start' && domGrid[nRow][nCol].className !== 'goal') {
                domGrid[nRow][nCol].className = 'frontier';
            }
        }
        await sleep(10);    
    }
}
    