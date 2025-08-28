const letters = "EEEEAAAAIIOONNRRTTLLSSUU";
const extraLetters = "BCDFGHMPWY"; 
let tileBag = document.getElementById('tile-bag');
let board = document.getElementById('board');
const chime = document.getElementById('chime');
const resetBtn = document.getElementById('reset-btn');
const gridSizeSelect = document.getElementById('grid-size');

let draggedTile = null;
let placedTiles = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initGame() {
  tileBag.innerHTML = '';
  board.innerHTML = '';
  placedTiles = 0;

  const size = gridSizeSelect.value;
  let cols = 8, rows = 5, tileCount = 40;
  if (size === 'large') {
    cols = 10;
    rows = 6;
    tileCount = 60;
  }

  board.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
  board.style.gridTemplateRows = `repeat(${rows}, 50px)`;

  // Generate tiles
  const bag = (letters + extraLetters.repeat(3)).split('');
  const shuffledBag = shuffle(bag).slice(0, tileCount);

  shuffledBag.forEach(letter => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = letter;
    tile.draggable = true;
    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('dragend', dragEnd);
    tileBag.appendChild(tile);
  });

  // Generate board squares
  for (let i = 0; i < cols * rows; i++) {
    const square = document.createElement('div');
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', drop);
    board.appendChild(square);
  }
}

function dragStart(e) {
  draggedTile = e.target;
  setTimeout(() => draggedTile.classList.add('dragging'), 0);
}

function dragEnd() {
  draggedTile.classList.remove('dragging');
  draggedTile = null;
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  if (draggedTile && !this.hasChildNodes()) {
    this.appendChild(draggedTile);
    placedTiles++;
    if (placedTiles === board.childNodes.length || placedTiles === document.querySelectorAll('.tile').length) {
      chime.play();
    }
  }
}

// Event listeners
resetBtn.addEventListener('click', initGame);
gridSizeSelect.addEventListener('change', initGame);

// Start game on load
initGame();

const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleButton.textContent = document.body.classList.contains('dark') ? '☀ Light Mode' : '🌙 Dark Mode';
});

