function boundry_condition(i, j) {
  if (grid[i][j - 1].type == "I") {
    grid[i][j + 1].is_filled = true;
    grid[i][j + 1].next = -1 * grid[i][j - 1].value;
  }
  if (grid[i][j + 1].type == "I") {
    grid[i][j - 1].is_filled = true;
    grid[i][j - 1].next = -1 * grid[i][j + 1].value;
  }
  if (grid[i - 1][j].type == "I") {
    grid[i + 1][j].is_filled = true;
    grid[i + 1][j].next = -1 * grid[i - 1][j].value;
  }
  if (grid[i + 1][j].type == "I") {
    grid[i - 1][j].is_filled = true;
    grid[i - 1][j].next = -1 * grid[i + 1][j].value;
  }
  if (grid[i][j + 1].type == "O") {
    grid[i][j + 1].next = -1 * grid[i][j - 1].value;
  }
  if (grid[i][j - 1].type == "O") {
    grid[i][j - 1].next = -1 * grid[i][j + 1].value;
  }
  if (grid[i + 1][j].type == "O") {
    grid[i + 1][j].next = -1 * grid[i - 1][j].value;
  }
  if (grid[i - 1][j].type == "O") {
    grid[i - 1][j].next = -1 * grid[i + 1][j].value;
  }
}

function second_order_diff(i, j) {
  let out = 0;

  out += grid[i][j - 1].value;
  out += grid[i][j + 1].value;
  out += grid[i - 1][j].value;
  out += grid[i + 1][j].value;

  return out / 4;
}

function forth_order_diff(i, j) {
  let out = 0;

  out += grid[i][j - 1].laplacian;
  out += grid[i][j + 1].laplacian;
  out += grid[i - 1][j].laplacian;
  out += grid[i + 1][j].laplacian;

  let fctr = 2;
  // return ((fctr - 1)*grid[i][j].value + (-out) / 4)/fctr
  // return -out/4;

  out = 0;

  if (i <= 1 || j <= 1 || i >= n + 2 || j >= n + 2) {
    console.log(i, j);
    return 0;
  }

  out += grid[i][j - 2].value;
  out += grid[i][j + 2].value;
  out += grid[i - 2][j].value;
  out += grid[i + 2][j].value;

  out += 2 * grid[i - 1][j - 1].value;
  out += 2 * grid[i + 1][j + 1].value;
  out += 2 * grid[i - 1][j + 1].value;
  out += 2 * grid[i + 1][j - 1].value;

  out += -8 * grid[i][j - 1].value;
  out += -8 * grid[i][j + 1].value;
  out += -8 * grid[i - 1][j].value;
  out += -8 * grid[i + 1][j].value;

  if (abs((-1 * out) / 20) > 1) {
    return 0;
  }
  // return -out/20;
  fctr = 3;
  return ((fctr - 1) * grid[i][j].value + (-1 * out) / 20) / fctr;
}
