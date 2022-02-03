import {
  update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.querySelector('#game-board');

const checkDeath = () => {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
};

const update = () => {
  updateSnake();
  updateFood();
  checkDeath();
};

const draw = () => {
  gameBoard.innerHTML = ''; // обновляем поле
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(main); // в cb передаётся time stamp

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
    return;
  }

  lastRenderTime = currentTime;
  update();
  draw();
}

window.requestAnimationFrame(main);
