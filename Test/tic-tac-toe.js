const board = document.getElementById('board');
const statusDiv = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    board.innerHTML = '';
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(e) {
    const idx = e.target.dataset.index;
    if (!gameActive || cells[idx].textContent) return;
    cells[idx].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (cells.every(cell => cell.textContent)) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
    ];
    return winPatterns.some(pattern =>
        pattern.every(idx => cells[idx].textContent === player)
    );
}

resetBtn.addEventListener('click', () => {
    currentPlayer = 'X';
    gameActive = true;
    createBoard();
});

createBoard();
