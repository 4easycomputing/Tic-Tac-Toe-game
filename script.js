// HTML elements
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const cells = [];

// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Create the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
}

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const index = clickedCell.getAttribute('data-index');

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer);
        checkWinner();
        togglePlayer();
    }
}

// Check for a winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `${currentPlayer} wins!`;
            highlightWinnerCells(combo);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        status.textContent = "It's a draw!";
    }
}

// Toggle player
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Highlight winner cells
function highlightWinnerCells(combo) {
    for (const index of combo) {
        const cell = cells[index];
        cell.style.backgroundColor = 'gold';
    }
}

// Reset the game
resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.style.backgroundColor = ''; // Reset cell background color
    });
});
