const logicGrid = [];
const domGrid = [];
const col = 25;
const row = 25;
const gridContainer = document.getElementById('grid-container');
let gamestate = 0; /*0 for idle, 1 for running search */
let start = [1, 1];
let goal = [(col-2), (row-2)];

/*temp run-sim button */
const runSim = document.getElementById('run-sim');


function startup() {
    for (let i = 0; i < col; i++) {
        logicGrid[i] = [];
        domGrid[i] = [];
        for (let j = 0; j < row; j++) {

            /*Default parameters*/
            logicGrid[i][j] = {isWall:false, visited:false, distance:Infinity, previous:0, weight:1}

            /* Create HTML Element for each grid and add to grid space array */
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            gridContainer.appendChild(newCell);
            domGrid[i][j] = newCell;
        }
    }

    /*Set start and goal on visual grid*/
    domGrid[start[0]][start[1]].className = 'start';
    domGrid[goal[0]][goal[1]].className = 'goal';

    runSim.addEventListener('click', () => {
        resetGrid();
        searchStart(depthFirstSearch);
    });

}

function resetGrid() {
   
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            logicGrid[i][j] = {isWall:false, visited:false, distance:Infinity, previous:0, weight:1};
            domGrid[i][j].className = 'cell'
        }
    }
    
    domGrid[start[0]][start[1]].className = 'start';
    domGrid[goal[0]][goal[1]].className = 'goal';
}




async function searchStart(searchAlgo) {

    /*Measure straight algorithim time*/
    console.time("searchTimer");
    await searchAlgo(start[0], start[1]);
    console.timeEnd("searchTimer");

    /*Run Visual search algorithim*/
    console.time("searchTimer");
    await replay(start[0], start[1]);
    retrace(goal[0], goal[1]);
    console.timeEnd("searchTimer");
}

startup();