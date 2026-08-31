const slides = document.querySelectorAll('.algo-slide');
const algos = [depthFirst, breadthFirst, dijkstra];
let currentSearchAlgo = algos[0];
let currentIndex = 0;

function switchAlgo(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    currentSearchAlgo = algos[index];
}

document.getElementById('prev-algo').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    switchAlgo(currentIndex);
});

document.getElementById('next-algo').addEventListener('click', () => {
    currentIndex = (currentIndex + 1 + slides.length) % slides.length;
    switchAlgo(currentIndex);
});