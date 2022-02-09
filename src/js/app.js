import { gameStatus } from './game-status.js';
import {
  update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection,
} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
import { renderScoreElements } from './interface.js';
import { showModal, closeModal } from './save-results.js';

const modalForm = document.querySelector('.form');
const tableModal = document.querySelector('.modal__table');
const nextLevelModal = document.querySelector('.level');
const nextLevelButton = document.querySelector('.level__go-button');
const restartButtons = document.querySelectorAll('.restart-button');
const input = document.querySelector('.form__input');

let lastRenderTime = 0;
let gameOver = false;
let resetGame = false;

renderScoreElements();

const gameBoard = document.querySelector('#game-board');

const checkDeath = () => {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
};

const checkWin = () => {
  gameStatus.win = gameStatus.hunger === 0;
};

const update = () => {
  if (!gameStatus.isPaused) {
    updateSnake();
    updateFood();
    checkDeath();
    checkWin();
  }
};

const draw = () => {
  gameBoard.innerHTML = ''; // обновляем поле
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

const goToNextLevel = (evt) => {
  console.log(evt.key);
  if (evt.key && evt.key !== 'Enter') {
    return;
  }

  nextLevelButton.removeEventListener('click', goToNextLevel);
  window.removeEventListener('keydown', goToNextLevel);

  gameStatus.resetHunger();
  gameStatus.speedUp();
  gameStatus.resetSnakeBody();
  gameStatus.plusLevel();
  gameStatus.win = false;
  gameStatus.newSegment = 0;
  gameStatus.isPaused = false;
  renderScoreElements();
  closeModal(nextLevelModal);
};

function main(currentTime) {
  if (gameOver) {
    document.querySelector('.form__score').textContent = gameStatus.score;
    showModal(modalForm);
    input.focus();
    window.addEventListener('keydown', restartGame);
    return;
  }

  window.requestAnimationFrame(main); // в cb передаётся time stamp

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if ((secondsSinceLastRender < 1 / gameStatus.speed) && resetGame === false) {
    return;
  }
  resetGame = false;

  lastRenderTime = currentTime;
  update();
  draw();

  if (gameStatus.win) {
    gameStatus.isPaused = true;
    showModal(nextLevelModal);
    nextLevelButton.focus();
    nextLevelButton.addEventListener('click', goToNextLevel);
    window.addEventListener('keydown', goToNextLevel);
  }
}

const restartGame = (evt) => {
  if (evt.key && evt.key !== 'Escape') {
    return;
  }

  closeModal(modalForm);
  closeModal(tableModal);
  gameOver = false;
  gameStatus.resetGame();
  renderScoreElements();
  window.requestAnimationFrame(main);
  window.removeEventListener('keydown', restartGame);
};

restartButtons.forEach((button) => button.addEventListener('click', restartGame));

window.requestAnimationFrame(main);

console.log(`
Total Score: 50 / 60
[x] - Вёрстка присутствует:) (+10)
[x] - Логика игры (+10)
[x] - Реализовано завершение игры при достижении игровой цели (+10)
[x] - По окончанию игры выводится её результат - score (+10)
[x] - Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих (+10)
[] - Анимации или звуки, или настройки игры
[] - Качество оформления
`);
