let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 1, y: 0 };

window.addEventListener('keydown', (evt) => {
  switch (evt.key) {
    case 'ArrowUp':
      // если змейка уже бежала вертикально, она не может поменять вертикальное направление
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
    default: break;
  }
});

export const getInputDirection = () => {
  lastInputDirection = inputDirection;
  return inputDirection;
};
