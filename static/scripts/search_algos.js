const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; /*left, right, down, up traversal grid traversal*/


function retrace(x, y) {
    if (logicGrid[x][y]["previous"] === 0 || 
        logicGrid[x][y] === logicGrid[goal[0]][goal[1]]){
        return;
    }

    domGrid[x][y].classList.add('path');
}

function depthFirstSearch(x, y) {
    /*breakout condition: goal found*/
    if (logicGrid[x][y] === logicGrid[goal[0]][goal[1]]) {
        return true;
    }

    logicGrid[x][y]["visited"] = true;

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

function depthFirstSim(x, y) {
    /*breakout condition: goal found*/
    if (logicGrid[x][y] === logicGrid[goal[0]][goal[1]]) {
        return true;
    }

    /*Mark coord as visited both logically and visually*/
    logicGrid[x][y]["visited"] = true;
    if (x != start[0] || y != start[1]) {
        domGrid[x][y].classList.add('visited')
    }
    

    /*Changes Bordering non-visited coords to fronteir color. Needs to be done before recursion*/
    for (const [dc, dr] of directions) {
        const simCol = x + dc;
        const simRow = y + dr;
        if (nCol >= 0 && nCol < col && nRow >= 0 && nRow < row && !logicGrid[nCol][nRow]["visited"]) {
            domGrid[simCol][simRow].classList.add('frontier');
        }
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