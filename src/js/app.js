import { update as updateSnake, draw as drawSnake, SNAKE_SPEED } from './snake.js';

let lastRenderTime = 0;
const gameBoard = document.querySelector('#game-board');

const update = () => {
  updateSnake();
};

const draw = () => {
  gameBoard.innerHTML = ''; // обновляем поле
  drawSnake(gameBoard);
};

function main(currentTime) {
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
