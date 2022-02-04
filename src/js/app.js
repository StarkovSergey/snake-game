import { gameStatus } from './game-status.js';
import {
  update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
import { renderHunger } from './interface.js';

let lastRenderTime = 0;
let gameOver = false;

const gameBoard = document.querySelector('#game-board');
renderHunger();

const checkDeath = () => {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
};

const checkWin = () => {
  gameStatus.win = gameStatus.hunger === 0;
};

const update = () => {
  updateSnake();
  updateFood();
  checkDeath();
  checkWin();
};

const draw = () => {
  gameBoard.innerHTML = ''; // обновляем поле
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

function main(currentTime) {
  if (gameOver) {
    if (confirm(`You lost. Your score is ${gameStatus.score}. Press ok to restart.`)) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(main); // в cb передаётся time stamp

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / gameStatus.speed) {
    return;
  }

  lastRenderTime = currentTime;
  update();
  draw();

  if (gameStatus.win) {
    if (confirm('You win! Are you ready for next level?')) {
      gameStatus.resetHunger();
      gameStatus.speedUp();
      gameStatus.resetSnakeBody();
      gameStatus.plusLevel();
      gameStatus.win = false;
      gameStatus.newSegment = 0;
      renderHunger();
    }
  }
}

window.requestAnimationFrame(main);

console.log(`
[x] - Вёрстка (+10)
[x] - Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам (+10)
`);
