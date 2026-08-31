const logicGrid = [];
const domGrid = [];
const col = 25;
const row = 25;
const gridContainer = document.getElementById('grid-container');
let gamestate = 0; /*0 for idle, 1 for running search */
let start = [0, 0];
let goal = [(col-10), (row-10)];

/*Combine into an array to simplify code*/
/*temp run-sim buttons */
const startSim = document.getElementById('start-sim');


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

    /*Used for search algorithms that evualte weight*/
    logicGrid[start[0]][start[1]]['distance'] = 0;


    /*Set start and goal on visual grid*/
    domGrid[start[0]][start[1]].className = 'start';
    domGrid[goal[0]][goal[1]].className = 'goal';


    /*BUG: start button inteferes with retrace function*/
    startSim.addEventListener('click', () => {
        /*searchStart(depthFirst);*/
        searchStart(currentSearchAlgo);
    });
}

function resetGrid() {
   
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            logicGrid[i][j] = {isWall:false, visited:false, distance:Infinity, previous:0, weight:(Math.floor((Math.random() + 1) * 10))};
            domGrid[i][j].className = 'cell'
        }
    }
    
    domGrid[start[0]][start[1]].className = 'start';
    domGrid[goal[0]][goal[1]].className = 'goal';
    logicGrid[start[0]][start[1]]['distance'] = 0;
}




async function searchStart(searchAlgo) {
    /*Set grid back to default settings*/
    await resetGrid(); /*TEMP: change when wall feature is added*/

    /*Empty search order and queue before each search*/
    searchOrder.length = 0;
    searchQueue.length = 0;

    /*Measure straight algorithim time*/
    console.time("searchTimer");
    await searchAlgo(start[0], start[1]); /*TODO: Add return false case*/
    console.timeEnd("searchTimer");

    /*Run Visual search algorithim*/
    console.time("searchTimer");
    await replay(start[0], start[1]);
    await retrace(goal[0], goal[1]);
    console.timeEnd("searchTimer");
}

startup();