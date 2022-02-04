import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';
import { gameStatus } from './game-status.js';
import { updateElement } from './interface.js';

const getRandomFoodPosition = () => {
  let newFoodPosition = null;
  while (newFoodPosition === null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition;
};

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export const update = () => {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    gameStatus.plusScore();
    gameStatus.minusHunger();
    updateElement('score');
    updateElement('hunger');
  }
};

export const draw = (gameBoard) => {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.append(foodElement);
};
