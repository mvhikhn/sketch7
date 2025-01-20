let rows, cols;
let resolution = 20;
let grid;
let colors = [
  [251, 232, 211],
  [248, 95, 115],
  [146, 138, 151],
  [40, 60, 99],
];

function setup() {
  frameRate(10);
  createCanvas(1700, 800);
  rows = height / resolution;
  cols = width / resolution;
  grid = createRandomGrid();
  background(255);
}

function draw() {
  updateGrid();
  drawGrid();
}

function createRandomGrid() {
  let grid = Array.from({ length: cols }, () => Array.from({ length: rows }, () => Math.random() > 0.5 ? 1 : 0));
  return grid;
}

function updateGrid() {
  let nextGrid = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(i, j);
      let state = grid[i][j];

      if (state === 0 && neighbors === 3) nextGrid[i][j] = 1;
      else if (state === 1 && (neighbors < 2 || neighbors > 3)) nextGrid[i][j] = 2;
      else if (state === 2) nextGrid[i][j] = 0;
      else nextGrid[i][j] = state;
    }
  }

  grid = nextGrid;
}

function countNeighbors(x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  return sum - grid[x][y];
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let state = grid[i][j];
      fill(colors[state][0], colors[state][1], colors[state][2]);
      stroke(0);
      rect(x, y, resolution, resolution);
    }
  }
}
