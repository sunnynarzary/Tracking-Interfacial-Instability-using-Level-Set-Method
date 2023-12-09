let grid = [];
let n = 116;
let dim;
let A = [],
  X = [],
  B = [];

function setup() {
  createCanvas(600, 600);
  // frameRate(1);
  background(0);
  dim = width / (n + 4);
  for (let i = 0; i <= n + 3; i++) {
    let row_i = [];
    for (let j = 0; j <= n + 3; j++) {
      let pxl = new PIXEL(i, j, 0);
      row_i.push(pxl);
    }
    grid.push(row_i);
  }

  // console.log( grid );

  fill_omega();
  fill_A_2();
  // console.log(A);
  // console.log(B);
}

function draw() {
  background(0, 0, 255);

  if (false) linear_fill_1();
  else linear_fill_2();

  let idx = 0;
  for (let i = 0; i <= n + 3; i++) {
    for (let j = 0; j <= n + 3; j++) {
      idx = i * (n + 4) + j;
      // grid[i][j].value = X[idx];
      grid[i][j].display();
      idx++;
    }
  }

  fill(255, 255, 255);
  textSize(32);
  text(frameCount, 10, 30);

  // update_grid();
}

function update_grid() {
  // implement gauss seidal

  let new_X = [];
  let X_i;
  for (let i = 0; i < (n + 2) * (n + 2); i++) {
    if (A[i][0] == -1) {
      continue;
    }
    X_i = B[i];
    for (let j = 0; j < i; j++) {
      // something
      X_i -= X[i] * A[i][j];
    }
    for (let j = i + 1; j < (n + 2) * (n + 2); j++) {
      // other thing
      X_i -= X[i] * A[i][j];
    }
    new_X.push(X_i / (A[i][i] + 0.001));
  }

  X = new_X;
}

function fill_A_1() {
  // for( let i=0; i<(n+4)*(n+4); i++ ) {
  let single_row = [];
  for (let j = 0; j < (n + 4) * (n + 4); j++) {
    single_row.push(0);
    X.push(0);
    B.push(0);
  }
  // A.push(single_row);

  // }

  let sz = -1;

  for (let i = 1; i <= n + 2; i++) {
    for (let j = 1; j <= n + 2; j++) {
      A.push(single_row);
      sz++;
      let idx = i * (n + 4) + j;
      X[sz] = grid[i][j].value;
      switch (grid[i][j].type) {
        case "B":
          A[sz][idx - (n + 4)] = -1;
          A[sz][idx - 1] = -1;
          A[sz][idx] = 4; // 0 ? maybe
          A[sz][idx + 1] = -1;
          A[sz][idx + (n + 4)] = -1;
          break;
        case "I":
          A[sz][idx] = 1;
          B[sz] = grid[i][j].value;
          break;
        case "O":
          console.log(i, j);
          break;
        case "D":
          A[sz][idx - (2 * n + 8)] = 1;
          A[sz][idx - (n + 5)] = 2;
          A[sz][idx - (n + 4)] = -8;
          A[sz][idx - (n + 3)] = 2;
          A[sz][idx - 2] = 1;
          A[sz][idx - 1] = -8;
          A[sz][idx] = 20;
          A[sz][idx + 1] = -8;
          A[sz][idx + 2] = 1;
          A[sz][idx + (n + 3)] = 2;
          A[sz][idx + (n + 4)] = -8;
          A[sz][idx + (n + 5)] = 2;
          A[sz][idx + (2 * n + 8)] = 1;
          break;
        default:
        //
      }
    }
  }
}

function fill_A_2() {
  for (let i = 0; i < (n + 4) * (n + 4); i++) {
    let single_row = [];
    for (let j = 0; j < (n + 4) * (n + 4); j++) {
      single_row.push(0);
    }
    A.push(single_row);
    X.push(0);
    B.push(0);
  }

  let sz = -1;

  for (let i = 0; i <= n + 3; i++) {
    for (let j = 0; j <= n + 3; j++) {
      // A.push(single_row);
      // sz++;
      let idx = i * (n + 4) + j;
      sz = idx;
      X[sz] = grid[i][j].value;
      switch (grid[i][j].type) {
        case "B":
          A[sz][idx - (n + 4)] = -1;
          A[sz][idx - 1] = -1;
          A[sz][idx] = 4; // 0 ? maybe
          A[sz][idx + 1] = -1;
          A[sz][idx + (n + 4)] = -1;
          break;
        case "I":
          A[sz][idx] = 1;
          B[sz] = grid[i][j].value;
          break;
        case "O":
          // console.log( i, j);
          A[idx][0] = -1;
          break;
        case "D":
          A[sz][idx - (2 * n + 8)] = 1;
          A[sz][idx - (n + 5)] = 2;
          A[sz][idx - (n + 4)] = -8;
          A[sz][idx - (n + 3)] = 2;
          A[sz][idx - 2] = 1;
          A[sz][idx - 1] = -8;
          A[sz][idx] = 20;
          A[sz][idx + 1] = -8;
          A[sz][idx + 2] = 1;
          A[sz][idx + (n + 3)] = 2;
          A[sz][idx + (n + 4)] = -8;
          A[sz][idx + (n + 5)] = 2;
          A[sz][idx + (2 * n + 8)] = 1;
          break;
        default:
        //
      }
    }
  }
}

function fill_omega() {
  for (let i = 2; i <= n + 1; i++) {
    for (let j = 2; j <= n + 1; j++) {
      let x = i * dim + dim / 2,
        y = j * dim + dim / 2;
      grid[i][j].type = "D";
      // point(x,y);

      x -= width / 2;
      y -= height / 2;
      x /= width / (2 * PI);
      y /= height / (2 * PI);

      if (
        (x - 0.8) * (x - 0.8) + y * y <= 1 ||
        (x + 0.8) * (x + 0.8) + y * y <= 1
      ) {
        grid[i][j].value = sin(y) * cos(x);
        grid[i][j].type = "I";
        grid[i][j].display();
      }
    }
  }

  for (let i = 1; i <= n + 2; i++) {
    // if( i != 1 && i!= n+2 ) {
    grid[i][1].type = "B";
    grid[1][i].type = "B";
    grid[i][n + 2].type = "B";
    grid[n + 2][i].type = "B";
    // }
  }

  for (let i = 2; i <= n + 1; i++) {
    for (let j = 2; j <= n + 1; j++) {
      if (
        grid[i][j + 1].type == "I" ||
        grid[i][j - 1].type == "I" ||
        grid[i + 1][j].type == "I" ||
        grid[i - 1][j].type == "I"
      ) {
        if (grid[i][j].type != "I") {
          grid[i][j].type = "B";
        }
      }
    }
  }
}
