const logicGrid = [];
const domGrid = [];
const col = 25;
const row = 25;
const gridContainer = document.getElementById('grid-container');
let gamestate = 0; /*0 for idle, 1 for running search */
let start = [0, 0];
let goal = [(col-10), (row-10)];
let idle = true;

/*Combine into an array to simplify code*/
/*temp run-sim buttons */
const startSim = document.getElementById('start-sim');

/*BUG: start button inteferes with retrace function*/
startSim.addEventListener('click', () => {
    /*searchStart(depthFirst);*/
    searchStart(currentSearchAlgo);
});


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
    logicGrid[start[0]][start[1]].distance = 0;


    /*Set start and goal on visual grid*/
    domGrid[start[0]][start[1]].className = 'start';
    domGrid[goal[0]][goal[1]].className = 'goal';
}

/*Hard reset*/
function resetGrid() {
   
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            logicGrid[i][j] = {isWall:false, visited:false, distance:Infinity, previous:0, weight:1};
            domGrid[i][j].className = 'cell'
            domGrid[i][j].textContent = '';
        }
    }
    
    /*set start and goal parameters*/
    domGrid[start[0]][start[1]].className = 'start';
    domGrid[goal[0]][goal[1]].className = 'goal';
    logicGrid[start[0]][start[1]].distance = 0;
    return true;
}

/*Soft Reset (leaves walls and weights)*/
function searchReset() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            logicGrid[i][j].visited = false;
            logicGrid[i][j].previous = 0;
            logicGrid[i][j].distance = Infinity;
            domGrid[i][j].className = 'cell'

            /*Matches logic Grid to dom grid*/
            if (logicGrid[i][j].isWall) domGrid[i][j].className = 'wall';
        }
    }
    
    /*Set start and goal parameters*/
    domGrid[start[0]][start[1]].className = 'start';
    domGrid[goal[0]][goal[1]].className = 'goal';
    logicGrid[start[0]][start[1]].distance = 0;
    return true;
}



async function searchStart(searchAlgo) {
    idle = false;
    /*Set grid back to default settings*/
    await searchReset(); /*TEMP: change when wall feature is added*/

    /*Empty search order and queue before each search*/
    searchOrder.length = 0;
    searchQueue.length = 0;

    /*Measure straight algorithim time*/
    console.time("searchTimer");
    await searchAlgo(start[0], start[1]); /*TODO: Add return false case*/
    console.timeEnd("searchTimer");

    /*Run Visual search algorithim*/
    await replay(start[0], start[1]);
    await retrace(goal[0], goal[1]);
    idle = true;
}

startup();