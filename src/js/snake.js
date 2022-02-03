import { getInputDirection } from './input.js';

export const SNAKE_SPEED = 10;
const snakeBody = [{ x: 10, y: 11 }];
let newSegment = 0;

const addSegments = () => {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegment = 0;
};

export const update = () => {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    // элементы перемещаются на место предыдущего, кроме первого
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  // snakeBody[0] === голова змеи
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
};

export const draw = (gameBoard) => {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.append(snakeElement);
  });
};

export const expandSnake = (amount) => {
  newSegment += amount;
};

const equalPosition = (pos1, pos2) => pos1.x === pos2.x && pos1.y === pos2.y;

export const onSnake = (position, { ignoreHead = false } = {}) => snakeBody.some((segment, index) => {
  if (ignoreHead && index === 0) {
    return false;
  }
  return equalPosition(segment, position);
});

export const getSnakeHead = () => snakeBody[0];

export const snakeIntersection = () => onSnake(snakeBody[0], { ignoreHead: true });
