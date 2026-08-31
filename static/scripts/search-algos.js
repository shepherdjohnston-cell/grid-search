const directions = [[0, 1], [0, -1], [-1, 0], [1, 0]]; /*left, right, down, up traversal grid traversal*/
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const searchOrder = [];
const searchQueue = [];


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

function breadthFirst() {
    searchQueue.push([start[0], start[1]]);

    while (searchQueue.length > 0)
    {
        const [x, y] = searchQueue.shift();

        if (logicGrid[x][y] === logicGrid[goal[0]][goal[1]]){
            return true;
        }

        if (logicGrid[x][y] !== logicGrid[start[0]][start[1]])
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

function dijkstra() {
    searchQueue.push([start[0], start[1]]);

    while (searchQueue.length > 0){
        let [minX, minY] = searchQueue[0];
        let minIndex = 0;

        for (let i = 1; i < searchQueue.length; i++)
        {
            const [a, b] = searchQueue[i];
            if (logicGrid[a][b]['distance'] < logicGrid[minX][minY]['distance']){
                [minX, minY] = searchQueue[i];
                minIndex = i;
            }
        }

        searchQueue.splice(minIndex, 1);
        const currentCell = logicGrid[minX][minY];

        if (currentCell['visited'] == true) continue;
        currentCell['visited'] = true;

        if (currentCell === logicGrid[goal[0]][goal[1]]){
            return true;
        }

        if (currentCell !== logicGrid[start[0]][start[1]])
        {
            searchOrder.push([minX, minY]);
        }

        for (const [dr, dc] of directions)
        {
            const nRow = minX + dr;
            const nCol = minY + dc;

            if (nCol >= 0 && nCol < col && nRow >= 0 && nRow < row 
            && !logicGrid[nRow][nCol]["visited"] && !logicGrid[nRow][nCol]["isWall"])
            {
                const neighbor = logicGrid[nRow][nCol];
                const newDist = logicGrid[minX][minY]['distance'] + logicGrid[nRow][nCol]['weight'];
                if (newDist < logicGrid[nRow][nCol]['distance'])
                {
                    neighbor['distance'] = newDist;
                    neighbor['previous'] = [minX, minY];
                    searchQueue.push([nRow, nCol]);
                }
            }
        }
    }
    return false;
}


async function replay() {
    for (let i = 0; i < searchOrder.length; i++)
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
    