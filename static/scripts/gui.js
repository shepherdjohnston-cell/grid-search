const slides = document.querySelectorAll('.algo-slide');
const algos = [depthFirst, breadthFirst, dijkstra];
let currentSearchAlgo = algos[0];
let currentIndex = 0;

/*Algo Carousel: Hide all texts, make selected one visible*/
function switchAlgo(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    currentSearchAlgo = algos[index];
}

/*Switch to prev algorithim*/
document.getElementById('prev-algo').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    switchAlgo(currentIndex);
});

/*Switch to next algorithim*/
document.getElementById('next-algo').addEventListener('click', () => {
    currentIndex = (currentIndex + 1 + slides.length) % slides.length;
    switchAlgo(currentIndex);
});

/*Keystroke Controls*/
document.addEventListener('keydown', (event) => {
    /*Only work when search isn't running*/
    if (idle) {
        if (event.key === 'w') addRandWeights();
    } 
});

function addRandWeights(){
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            if (logicGrid[i][j] !== logicGrid[start[0]][start[1]] && !logicGrid[i][j].isWall){

                let weight = (Math.floor(Math.pow(Math.random(), 7) * 5)) + 1; /*Random weight value weight towards 1 using exponential decay*/
                logicGrid[i][j].weight = weight;

                /*Only display weight if its higher than default(1)*/
                domGrid[i][j].textContent = '';
                if (weight > 1) domGrid[i][j].textContent = logicGrid[i][j].weight;    
            }
        }
    }
}

/*Hard Reset*/
document.getElementById('reset-btn').addEventListener('click', () => {
    resetGrid();
})