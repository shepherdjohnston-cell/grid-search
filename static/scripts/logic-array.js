const logicGrid = [];
const domGrid = [];
const col = 25;
const row = 25;
const gridContainer = document.getElementById('grid-container');
let gamestate = 0; /*0 for idle, 1 for running search */
let start = [1, 1];
let goal = [(col-2), (row-2)];

function reset() {
    resetGrid();
}

function resetGrid() {
   
    for (let i = 0; i < col; i++) {
        logicGrid[i] = [];
        domGrid[i] = [];
        for (let j = 0; j < row; j++) {

            /*Default parameters*/
            /*TODO: Add neighbors' coordinates to object*/
            logicGrid[i][j] = {isWall:false, visited:false, distance:Infinity, previous:0, weight:1}

            /* Create HTML Element for each grid and add to grid space array */
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            gridContainer.appendChild(newCell);
            domGrid[i][j] = newCell;
        }
    }

    /*Set start and goal on visual grid*/
    domGrid[start[0]][start[1]].classList.add('start');
    domGrid[goal[0]][goal[1]].classList.add('goal');
}




function simulate(searchAlgo, searchAlgoSim) {

    /*Measure straight algorithim time*/
    console.time("searchTimer");
    searchAlgo(start[0], start[1]);
    console.timeEnd("searchTimer");

    /*Run Visual search algorithim*/
    searchAlgoSim(start[0], start[1]);
}

reset();