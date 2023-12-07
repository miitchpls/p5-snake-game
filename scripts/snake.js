class Snake {
  /** options */
  alive;
  trimOnSelfEat = true;

  /** init values */
  startlenght;
  xStart;
  yStart;

  /** direction of snake */
  xSpeed = 0;
  ySpeed = 0;

  /** array containing the body of the snake */
  tail = [];

  /** define the jump bouding from the green 
   * gradation of the pieces of the snake */
  COLORBOUDING = 3;

  constructor(x, y, startlenght = 3) {
    this.startlenght = startlenght;
    this.xStart = x;
    this.yStart = y;
    this.spawn();
  }

  spawn() {
    this.tail = [];
    this.xSpeed = 0;
    this.ySpeed = 0;
    for (let i = 0; i < this.startlenght; i++) {
      this.tail.push(createVector(this.xStart, this.yStart));
    }
  }

  getTail() {
    return this.tail;
  }

  nextCoords() {
    return {
      x: this.tail[0].x + this.xSpeed,
      y: this.tail[0].y + this.ySpeed,
    }
  }

  setDirection(direction) {
    if (this.canMove(direction)) {
      switch (direction) {
        case 'up': { this.xSpeed = 0; this.ySpeed = -1; } break;
        case 'dx': { this.xSpeed = 1; this.ySpeed = 0; } break;
        case 'down': { this.xSpeed = 0; this.ySpeed = 1; } break;
        case 'sx': { this.xSpeed = -1; this.ySpeed = 0; } break;
      }
    }
  }

  canMove(toDirection) {
    let actualDirection = this.getDirection();
    switch (toDirection) {
      case 'up': { if (actualDirection != 'down') { return true } } break;
      case 'dx': { if (actualDirection != 'sx') { return true } } break;
      case 'down': { if (actualDirection != 'up') { return true } } break;
      case 'sx': { if (actualDirection != 'dx') { return true } } break;
    }
    return false;
  }

  getDirection() {
    if (this.ySpeed == -1) { return 'up' }
    else if (this.xSpeed == 1) { return 'dx' }
    else if (this.ySpeed == 1) { return 'down' }
    else if (this.xSpeed == -1) { return 'sx' }
  }

  getScore() {
    return this.tail.length - this.startlenght;
  }

  eat(food) {
    if (food) {
      if (dist(this.tail[0].x, this.tail[0].y, food.x, food.y) < 1) {
        this.tail.push(createVector(this.tail[0].x, this.tail[0].y));
        return true;
      } else {
        return false;
      }
    }
  }

  update() {
    if (this.alive) {
      for (let [index, piece] of this.tail.entries()) {
        let antecedent = this.tail[index - 1];
        let nextX;
        let nextY;
        /** if the piece doenst have an antecedent just increase his coords with
         * the direction otherwise if has an antecednt replace his coords with 
         * the previous one of the antecedent  */
        if (!antecedent) {
          nextX = piece.x + this.xSpeed;
          nextY = piece.y + this.ySpeed;
        } else {
          nextX = antecedent.oldX;
          nextY = antecedent.oldY;
        }
        /** saving the coords before increasing it for taking track of it */
        piece.oldX = piece.x;
        piece.oldY = piece.y;

        if (index == 0) {
          if (this.isValidMove(nextX, nextY)) {
            /** assigning the new position to the piece */
            piece.x = nextX;
            piece.y = nextY;
          } else {
            /** killing the snake */
            this.kill();
          }
        } else {
          /** assigning the new position to the piece */
          piece.x = nextX;
          piece.y = nextY;
        }
      }
      document.getElementById("score").innerHTML = this.getScore();
    }
  }

  isValidMove(x, y) {
    // debugger
    /** if the piece is the head, after has moved, we must check here if collide with
     * another piece of his own tail. We must do this here because if we do this when we 
     * have updated the whole snake it could happen that the eaten piece has moved */
    // if (index == 0) {
    for (let [_i, _piece] of this.tail.entries()) {
      /** check with indexs that we aren't comparing the same pieces of the tail */
      if (_i != 0) {
        if (_piece.x == x && _piece.y == y) {
          return false;
        }
      }
    }
    return true;
  }

  trimTail(fromIndex) {
    this.tail.splice(0, fromIndex)
  }

  kill() {
    this.alive = false;
  }

  draw() {
    /** drawing the tail of the snake */
    for (let [index, piece] of this.tail.entries()) {
      let _tailX = (piece.x * SCALE);
      let _tailY = (piece.y * SCALE);

      /** calculating the gradation of the green in the
        * head based on the age of the snake */
      let tailGrad = 200 - (this.tail.length - index) * this.COLORBOUDING;
      fill(34, tailGrad, 23);
      rect(_tailX, _tailY, SCALE, SCALE);
    }
  }

}