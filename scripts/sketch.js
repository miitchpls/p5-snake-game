var snake;
var food;
var field;

var cols = 17 + 2;
var rows = 17 + 2;

// game const
const SCALE = 30;
const TICKS = 8;

// possible directions
const UP = "up";
const DX = "dx";
const SX = "sx";
const DOWN = "down";

var lastKey = null;
var gameRunning = false;

function setup() {
  frameRate(TICKS);

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
  let cell = this.getEmptyCell();
  food = new Food(cell.x, cell.y);
}

function getEmptyCell() {
  do {
    let cell = {
      x: floor(random(cols)),
      y: floor(random(rows)),
    }

    if (!field.isInside(cell))
      continue;
  
    let collideWithSnake = snake.isPositionOverTail(cell.x, cell.y);

    if (!collideWithSnake) {
      return cell;
    }
  } while (true);
}

function draw() {
  field.draw();

  if (gameRunning) {
    snake.setDirection(lastKey);

    if (!field.isInside(snake.getNextPosition())) {
      snake.kill();
    }

    snake.update();
    

    if (snake.eat(food)) {
      generateFood();
    }
  } else {
    this.lastKey = null;
  }

  snake.draw();
  food.draw();
}

function keyPressed() {
  if(!gameRunning){
    gameRunning = true;
  }

  switch(key.toLowerCase()){
    case "w":
    case "arrowup": {
      this.lastKey = UP;
    } break;
    case "a":
    case "arrowleft": {
      this.lastKey = SX;
    } break;
    case "s":
    case "arrowdown": {
      this.lastKey = DOWN;
    } break;
    case "d":
    case "arrowright": {
      this.lastKey = DX;
    } break;
  }
}
