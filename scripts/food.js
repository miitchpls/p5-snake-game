class Food {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    /** selecting red */
    fill(255, 30, 40);
    /** adding padding for draw the food in the middle of the slot */
    let _padding = SCALE / 2;
    /** getting current coords and mult per scale and adding padding */
    let _x = (this.x * SCALE) + _padding;
    let _y = (this.y * SCALE) + _padding;
    circle(_x, _y, _padding);
  }

}