export const gameStatus = {
  win: false,
  snakeBody: [{ x: 11, y: 11 }],
  newSegment: 0,
  resetSnakeBody() {
    this.snakeBody = [{ x: 11, y: 11 }];
  },
  speed: 8,
  resetSpeed() {
    this.speed = 8;
  },
  speedUp() {
    this.speed++;
  },
  score: 0,
  plusScore() {
    this.score++;
  },
  hunger: 3,
  resetHunger() {
    this.hunger = 3;
  },
  minusHunger() {
    this.hunger--;
  },
  level: 0,
  plusLevel() {
    this.level++;
  },
  resetGame() {
    this.resetSnakeBody();
    this.resetSpeed();
    this.score = 0;
    this.resetHunger();
    this.level = 0;
  },
};
