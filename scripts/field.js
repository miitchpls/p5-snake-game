class Field {
  canvas;
  rows;
  cols;
  mapBorder = true;

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.setupCanvas();
  }

  setupCanvas() {
    canvas = createCanvas(cols * SCALE, rows * SCALE);
    canvas.parent('snake-field');
  }

  isInside(coords) {
    if (coords) {
      if ((coords.x < 1) || (coords.x >= cols - 1) || (coords.y < 1) || (coords.y >= rows - 1)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  draw() {
    if (this.mapBorder) {
      /** disabling outline and selecting dark green */
      noStroke();
      fill(84, 138, 48);

      /** drawing top border  */
      rect(0, 0, rows * SCALE, SCALE);

      /** drawing left border */
      rect(0, 0, SCALE, cols * SCALE);

      /** drawing bottom border */
      rect(0, rows * SCALE - SCALE, rows * SCALE, SCALE);

      /** drawing right border */
      rect(cols * SCALE - SCALE, 0, SCALE, cols * SCALE);
    }

    /** drawing main field chess */
    for (let x = 1; x < cols - 1; x++) {
      for (var y = 1; y < rows - 1; y++) {

        var z = (x + y) % 2;
        if (z == 0) {
          /** selecting light green */
          fill(170, 215, 81);
        } else {
          /** selecting green */
          fill(162, 209, 73);
        }
        rect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
    }
  }

}