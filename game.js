import { handleKeyPress, handleButtonPress } from './eventHandlers.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 10;
const cellSize = canvas.width / gridSize;

let player = { x: 0, y: 0 };
let target = { x: 9, y: 9 };
let enemy = { x: 0, y: 9 };
let score = 0;
let gameOver = false;

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  drawCircle(player.x, player.y, 'green');
  drawCircle(target.x, target.y, 'orange');
  drawCircle(enemy.x, enemy.y, 'red');
}

function drawCircle(x, y, color) {
  const radius = cellSize / 3;
  ctx.beginPath();
  ctx.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function movePlayer(dx, dy) {
  if (gameOver) return;
  const newX = player.x + dx;
  const newY = player.y + dy;
  if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
    player.x = newX;
    player.y = newY;
    checkCollision();
    moveEnemy();
    drawBoard();
  }
}

function moveEnemy() {
  const dx = player.x > enemy.x ? 1 : player.x < enemy.x ? -1 : 0;
  const dy = player.y > enemy.y ? 1 : player.y < enemy.y ? -1 : 0;
  enemy.x += dx;
  enemy.y += dy;
}

function checkCollision() {
  if (player.x === target.x && player.y === target.y) {
    score += 10;
    document.getElementById('score').innerText = `Score: ${score}`;
    target.x = Math.floor(Math.random() * gridSize);
    target.y = Math.floor(Math.random() * gridSize);
  }

  if (player.x === enemy.x && player.y === enemy.y) {
    alert("Game Over!");
    gameOver = true;
  }
}

function resetGame() {
  player = { x: 0, y: 0 };
  target = { x: 9, y: 9 };
  enemy = { x: 0, y: 9 };
  score = 0;
  gameOver = false;
  document.getElementById('score').innerText = `Score: ${score}`;
  drawBoard();
}

document.addEventListener('keydown', (e) => handleKeyPress(e, movePlayer));
document.getElementById('upBtn').addEventListener('click', () => handleButtonPress('ArrowUp', movePlayer));
document.getElementById('downBtn').addEventListener('click', () => handleButtonPress('ArrowDown', movePlayer));
document.getElementById('leftBtn').addEventListener('click', () => handleButtonPress('ArrowLeft', movePlayer));
document.getElementById('rightBtn').addEventListener('click', () => handleButtonPress('ArrowRight', movePlayer));
document.getElementById('restartBtn').addEventListener('click', resetGame);

drawBoard();

