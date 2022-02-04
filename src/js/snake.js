import { getInputDirection } from './input.js';
import { gameStatus } from './game-status.js';

const addSegments = () => {
  for (let i = 0; i < gameStatus.newSegment; i++) {
    gameStatus.snakeBody.push({ ...gameStatus.snakeBody[gameStatus.snakeBody.length - 1] });
  }

  gameStatus.newSegment = 0;
};

export const update = () => {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = gameStatus.snakeBody.length - 2; i >= 0; i--) {
    // элементы перемещаются на место предыдущего, кроме первого
    gameStatus.snakeBody[i + 1] = { ...gameStatus.snakeBody[i] };
  }

  // snakeBody[0] === голова змеи
  gameStatus.snakeBody[0].x += inputDirection.x;
  gameStatus.snakeBody[0].y += inputDirection.y;
};

export const draw = (gameBoard) => {
  gameStatus.snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.append(snakeElement);
  });
};

export const expandSnake = (amount) => {
  gameStatus.newSegment += amount;
};

const equalPosition = (pos1, pos2) => pos1.x === pos2.x && pos1.y === pos2.y;

// { ignoreHead = false } деструктуризация, в которой мы устанавливаем значение по умолчанию  для ignoreHead при деструктуризации
// { ignoreHead = false } = {} а также значения по умолчанию, если не будет передан параметр
export const onSnake = (position, { ignoreHead = false } = {}) => gameStatus.snakeBody.some((segment, index) => {
  if (ignoreHead && index === 0) {
    return false;
  }
  return equalPosition(segment, position);
});

export const getSnakeHead = () => gameStatus.snakeBody[0];

export const snakeIntersection = () => onSnake(gameStatus.snakeBody[0], { ignoreHead: true });
