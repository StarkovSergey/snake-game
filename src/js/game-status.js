export const gameStatus = {
  speed: 8,
  win: false,
  snakeBody: [{ x: 11, y: 11 }],
  newSegment: 0,
  resetSnakeBody() {
    this.snakeBody = [{ x: 11, y: 11 }];
  },
  speedUp() {
    this.speed++;
  },
  score: 0,
  plusScore() {
    this.score++;
  },
  hunger: 2,
  minusHunger() {
    this.hunger--;
  },
  resetHunger() {
    this.hunger = 5;
  },
  level: 0,
  plusLevel() {
    this.level++;
  },
};
