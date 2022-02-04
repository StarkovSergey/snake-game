import { gameStatus } from './game-status.js';

const scoreElement = document.querySelector('.score__number');
const hungerScoreElement = document.querySelector('[data-parameter="hunger"]');

export const updateElement = (parameter) => {
  const value = String(gameStatus[parameter]).length === 1 ? `0${gameStatus[parameter]}` : `${gameStatus[parameter]}`;
  const element = document.querySelector(`[data-parameter="${parameter}"]`);
  element.textContent = value;
};

export const renderHunger = () => {
  hungerScoreElement.textContent = gameStatus.hunger;
};
