const logicGrid = [];
const domGrid = [];
const col = 25;
const row = 25;
const gridContainer = document.getElementById('grid-container');

function reset() {
    const start = {x:1, y:1};
    const goal = {x:(col-2), y:(row-2)};

    resetGrid();
}

function resetGrid() {
   
    for (let i = 0; i < col, i++) {
        logicGrid[i] = [];
        domGrid[i] = [];
        for (let j = 0; j < row; j++) {
            logicGrid[i][j] = {isWall:false, visited:false, distance:Infinity, previous:0, weight:1}

            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            gridContainer.appendChild(newCell);
            domGrid[i][j] = newCell;
        }
    }
    domGrid[start[x], start[y]].classList.add('start');
    domGrid[goal[x], goal[y]].classList.add('goal');
}
