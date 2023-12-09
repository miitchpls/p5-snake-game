/** multiplier to define how much progressively darker the snake must become each time it eats */
const COLORAGINGMULTIPLIER = 1;

class Snake {
  startLenght;

  /** direction of snake */
  xDirection = 0;
  yDirection = 0;

  /** array of vectors containing the tail of the snake */
  tail = [];

  /**
   * @param {number} x the starting point on the x-axis
   * @param {number} y the starting point on the y-axis
   * @param {number} [startLenght=3] opzionale lunghezza inziiale coda
   */
  constructor(x, y, startLenght = 3) {
    this.startLenght = startLenght;
    this.spawn(x, y);
  }

  spawn(x, y) {
    this.tail = [];
    this.xDirection = 0;
    this.yDirection = 0;

    for (let i = 0; i < this.startLenght; i++) {
      this.tail.push(createVector(x, y));
    }
  }

  getTail() {
    return this.tail;
  }

  kill() {
    gameRunning = false;
    snake = new Snake(3, 9);
  }

  getNextPosition() {
    return {
      x: this.tail[0].x + this.xDirection,
      y: this.tail[0].y + this.yDirection,
    }
  }

  setDirection(direction) {
    if (!this.isPossibleDirection(direction)) return;

    switch (direction) {
      case UP: { this.xDirection = 0; this.yDirection = -1; } break;
      case DX: { this.xDirection = 1; this.yDirection = 0; } break;
      case DOWN: { this.xDirection = 0; this.yDirection = 1; } break;
      case SX: { this.xDirection = -1; this.yDirection = 0; } break;
    }
  }

  isPossibleDirection(toDirection) {
    let actualDirection = this.getDirection();

    switch (toDirection) {
      case UP: { if (actualDirection != DOWN) return true };
      case DX: { if (actualDirection != SX) return true };
      case DOWN: { if (actualDirection != UP) return true };
      case SX: { if (actualDirection != DX) return true };
      default: return false;
    }
  }

  getDirection() {
    if (this.yDirection == -1) { return UP }
    else if (this.xDirection == 1) { return DX }
    else if (this.yDirection == 1) { return DOWN }
    else if (this.xDirection == -1) { return SX }
  }

  getScore() {
    return this.tail.length - this.startLenght;
  }

  eat(food) {
    if (!food) return;

    if (dist(this.tail[0].x, this.tail[0].y, food.x, food.y) < 1) {
      let last = this.tail.at(-1);
      this.tail.push(createVector(last.x, last.y));
      field.updateScore(this.getScore());

      return true;
    } else {
      return false;
    }

  }

  update() {
    if (!gameRunning) return;

    let nextPosition = this.getNextPosition();
    if (this.isPositionOverTail(nextPosition.x, nextPosition.y)) {
      this.kill();
      return;
    }

    this.tail.unshift(createVector(nextPosition.x, nextPosition.y));
    this.tail.pop();

    field.updateScore(this.getScore());
  }

  isPositionOverTail(x, y) {
    return this.getTail().some(piece => piece.x == x && piece.y == y)
  }

  draw() {
    /** drawing the tail of the snake */
    for (let [index, piece] of this.tail.entries()) {
      let _tailX = (piece.x * SCALE);
      let _tailY = (piece.y * SCALE);

      /** calculating the gradation of the green in the
        * head based on the age of the snake */
      let tailGrad = 200 - (this.tail.length - index) * COLORAGINGMULTIPLIER;
      fill(34, tailGrad, 23);
      rect(_tailX, _tailY, SCALE, SCALE);
    }
  }

}