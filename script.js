const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restart = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Human vs Human
cells.forEach(cell => cell.addEventListener('click', cellClicked));

restart.addEventListener('click', restartGame);

function cellClicked(e) {
    const index = e.target.getAttribute('data-index');
    if(board[index] !== '' || gameOver) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if(checkWin(currentPlayer)) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
    }

    if(board.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Win check
function checkWin(player) {
    return winCombos.some(combo => 
        combo.every(index => board[index] === player)
    );
}

// Restart game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    gameOver = false;
}