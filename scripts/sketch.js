var snake;
var food;
var field;

var cols = 17 + 2;
var rows = 17 + 2;

const SCALE = 30;
const FRAMERATE = 8;

var lastKey;

function setup() {
  frameRate(FRAMERATE);
  startGame();
}

function startGame() {
  this.createMap();
  this.createSnake();
  this.generateFood();
}

function createMap() {
  field = new Field(rows, cols);
}

function createSnake() {
  snake = new Snake(3, 9);
}

function generateFood() {
  let coords = this.getFreeSlot();
  food = new Food(coords.x, coords.y);
}

function getFreeSlot() {
  do {

    let randomCoords = {
      x: floor(random(cols)),
      y: floor(random(rows)),
    }

    /** if is inside the field */
    if (field.isInside(randomCoords)) {

      /** and if is not above the snake */
      if (snake.getTail().filter(
        piece => { if (piece.x == randomCoords.x && piece.y == randomCoords.y) return piece }
      ).length == 0) {
        return {
          x: randomCoords.x,
          y: randomCoords.y,
        }
      }
    }
  } while (true);
}

function draw() {
  field.draw();

  if (snake.alive) {
    snake.setDirection(lastKey);

    if (!field.isInside(snake.nextCoords())) {
      snake.kill();
    }

    snake.update();
    

    if (snake.eat(food)) {
      generateFood();
    }
  } else {
    this.lastKey = null;
    snake.spawn();
  }

  snake.draw();
  food.draw();
}

function keyPressed() {
  snake.alive = true;
  let key = String.fromCharCode(keyCode).toLocaleLowerCase();
  if (keyCode == UP_ARROW || key == 'w') {
    this.lastKey = 'up';
  } else if (keyCode == RIGHT_ARROW || key == 'd') {
    this.lastKey = 'dx';
  } else if (keyCode == DOWN_ARROW || key == 's') {
    this.lastKey = 'down';
  } else if (keyCode == LEFT_ARROW || key == 'a') {
    this.lastKey = 'sx';
  }
}

function stop() {
  var cnv = createCanvas(cols * SCALE, rows * SCALE);
  background(0);
}