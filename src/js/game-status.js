export const gameStatus = {
  win: false,
  isPaused: false,
  snakeBody: [{ x: 11, y: 11 }],
  newSegment: 0,
  resetSnakeBody() {
    this.snakeBody = [{ x: 11, y: 11 }];
  },
  speed: 10,
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
  hunger: 15,
  resetHunger() {
    this.hunger = 15;
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
