const numBoxes = 40;

const minHeight = 1;
const maxHeight = 150;

const noiseOffset = 100;
const noiseScale = 0.005;
const timeScale = 0.0002;
const rotateScale = 0.0001;

let seaLevel = 0.4;
const rockLevel = 0.25;
const sandLevel = 0.5;
const treeLevel = 0.75;

const rockColour = "#62718E";
const sandColour = "#D4A463";
const grassColour = "#90A944";
const forestColour = "#6D973E";
const seaColour = "#1098A688";
const seaColourSolid = "#1098A6";
const trunkColour = "#886622";
const leafColour = "#468343";

let cam;

let heightScale = 1;
let heightDir = 0.05;

// asdfasdfasdfasdfasdfasdfasdfasdf

let grid = [];
let n = 46;
sideLength = 10;

let dim;
let A = [],
  X = [],
  B = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  //   frameRate(1) ;
  background(200);
  dim = width / (n + 4);
  //   sideLength = 600/(n+4);
  //   sideLength = dim ;
  for (let i = 0; i <= n + 3; i++) {
    let row_i = [];
    for (let j = 0; j <= n + 3; j++) {
      let pxl = new PIXEL(i, j, 0);
      row_i.push(pxl);
    }
    grid.push(row_i);
  }

  setupCamera();

  fill_omega(grid, n);
}

function setupCamera() {
  cam = createCamera();
  const camHeight = -numBoxes * sideLength * 0.8;
  const orbitRad = numBoxes * sideLength * 1.2;
  cam.setPosition(0, camHeight, orbitRad);
  cam.lookAt(0, 0, 0);
}

function draw() {
  background(200);

  // fill_laplacian();

  if (false) linear_fill_1();
  else linear_fill_2();

  ambientLight(150, 150, 150);
  directionalLight(200, 200, 200, -1, 0.75, -1);

  heightScale = constrain(heightScale + heightDir, 0, 1);

  rotateY(frameCount * 0.01);

  for (let i = 0; i <= n + 3; i++) {
    for (let j = 0; j <= n + 3; j++) {
      grid[i][j].display();
    }
  }

  //   fill(255, 255, 255);
  //   textSize(32);
  //   text(frameCount, 10, 30);
}

function fill_omega(ArrayPoints, DomainSize) {
  for (let i = 0; i < DomainSize + 4; i++) {
    for (let j = 0; j < DomainSize + 4; j++) {
      let x = i * dim + dim / 2,
        y = j * dim + dim / 2;
      ArrayPoints[i][j].type = "D";

      x -= width / 2;
      y -= height / 2;
      x /= width / (2 * PI);
      y /= height / (2 * PI);

      if (
        (x - 0.8) * (x - 0.8) + y * y <= 1 ||
        (x + 0.8) * (x + 0.8) + y * y <= 1
      ) {
        ArrayPoints[i][j].value = sin(y) * cos(x);
        // ArrayPoints[i][j].value = (4 - y * y - x * x) / 4;
        ArrayPoints[i][j].type = "I";
        // ArrayPoints[i][j].display();
      }
    }
  }

  for (let i = 1; i < DomainSize + 3; i++) {
    ArrayPoints[i][1].type = "B";
    ArrayPoints[1][i].type = "B";
    ArrayPoints[i][DomainSize + 2].type = "B";
    ArrayPoints[DomainSize + 2][i].type = "B";
  }

  for (let i = 1; i < DomainSize + 3; i++) {
    for (let j = 1; j < DomainSize + 3; j++) {
      if (
        ArrayPoints[i][j + 1].type == "I" ||
        ArrayPoints[i][j - 1].type == "I" ||
        ArrayPoints[i + 1][j].type == "I" ||
        ArrayPoints[i - 1][j].type == "I"
      ) {
        if (ArrayPoints[i][j].type != "I") {
          ArrayPoints[i][j].type = "B";
        }
      }
    }
  }
}
