const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const tileBag = document.getElementById('tile-bag');
const board = document.getElementById('board');
const resetBtn = document.getElementById('reset-btn');
const gridSizeSelector = document.getElementById('grid-size');
const chime = document.getElementById('chime-sound');

function generateTiles(count = 40) {
    tileBag.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.draggable = true;
        tile.textContent = letters[Math.floor(Math.random() * letters.length)];
        tile.addEventListener('dragstart', dragStart);
        tile.addEventListener('dragend', dragEnd);
        tileBag.appendChild(tile);
    }
}

function createBoard(size = 5) {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    board.style.gridTemplateRows = `repeat(${size}, 50px)`;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell empty';
        cell.dataset.index = i;
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', dropTile);
        board.appendChild(cell);
    }
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    event.target.classList.add('dragging');
    // Store reference to the dragged tile
    event.dataTransfer.setData('tile-id', event.target.textContent + Date.now());
    event.target.dataset.dragId = event.dataTransfer.getData('tile-id');
}

function dragEnd(event) {
    document.querySelectorAll('.dragging').forEach(el => {
        el.classList.remove('dragging');
    });
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    if (event.target.classList.contains('cell')) {
        event.target.classList.add('highlight');
    }
}

function dragLeave(event) {
    if (event.target.classList.contains('cell')) {
        event.target.classList.remove('highlight');
    }
}

function dropTile(event) {
    event.preventDefault();
    const letter = event.dataTransfer.getData('text/plain');
    const cell = event.target.closest('.cell');
    
    if (cell && !cell.textContent) {
        cell.textContent = letter;
        cell.classList.remove('empty', 'highlight');
        cell.classList.add('filled');
        
        // Find and remove the dragged tile
        const dragId = event.dataTransfer.getData('tile-id');
        const draggingTile = Array.from(tileBag.querySelectorAll('.tile')).find(
            tile => tile.dataset.dragId === dragId
        );
        
        if (draggingTile) {
            draggingTile.remove();
        }
        
        checkCompletion();
    } else {
        cell.classList.remove('highlight');
    }
}

function checkCompletion() {
    const emptyCells = document.querySelectorAll('.cell.empty');
    if (emptyCells.length === 0) {
        chime.play();
        setTimeout(() => {
            alert('Congratulations! You filled the board!');
        }, 300);
    }
}

resetBtn.addEventListener('click', () => {
    generateTiles();
    createBoard(parseInt(gridSizeSelector.value));
});

gridSizeSelector.addEventListener('change', () => {
    createBoard(parseInt(gridSizeSelector.value));
});

const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleButton.textContent = document.body.classList.contains('dark') ? '☀ Light Mode' : '🌙 Dark Mode';
});

// Initialize game
generateTiles();
createBoard();
