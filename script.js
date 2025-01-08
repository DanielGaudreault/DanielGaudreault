const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const checkWin = () => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameActive = false;
      message.textContent = `Player ${currentPlayer} wins!`;
      return;
    }
  }
  if ([...cells].every(cell => cell.textContent)) {
    gameActive = false;
    message.textContent = "It's a draw!";
  }
};

const handleCellClick = (e) => {
  if (!gameActive || e.target.textContent) return;
  e.target.textContent = currentPlayer;
  checkWin();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
