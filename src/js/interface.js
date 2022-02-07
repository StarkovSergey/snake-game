import { gameStatus } from './game-status.js';

// const scoreElement = document.querySelector('.score__number');
// const hungerScoreElement = document.querySelector('[data-parameter="hunger"]');
export const scoreParameters = {
  SCORE: 'score',
  HUNGER: 'hunger',
  LEVEL: 'level',
};

const getTrueFormatScore = (parameter) => (String(gameStatus[parameter]).length === 1 ? `0${gameStatus[parameter]}` : `${gameStatus[parameter]}`);

export const updateElement = (parameter) => {
  const value = getTrueFormatScore(parameter);
  const element = document.querySelector(`[data-parameter="${parameter}"]`);
  element.textContent = value;
};

export const renderScoreElement = (scoreParameter) => {
  const scoreElement = document.querySelector(`[data-parameter="${scoreParameter}"]`);
  scoreElement.textContent = getTrueFormatScore(scoreParameter);
};

export const renderScoreElements = () => {
  Object.values(scoreParameters).forEach((item) => renderScoreElement(item));
};
