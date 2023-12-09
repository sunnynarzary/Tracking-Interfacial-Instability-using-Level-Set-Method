function boundry_condition(i, j) {
  if (grid[i][j - 1].type == "I") grid[i][j + 1].value = -1*grid[i][j - 1].value;
  if (grid[i][j + 1].type == "I") grid[i][j - 1].value = -1*grid[i][j + 1].value;
  if (grid[i - 1][j].type == "I") grid[i + 1][j].value = -1*grid[i - 1][j].value;
  if (grid[i + 1][j].type == "I") grid[i - 1][j].value = -1*grid[i + 1][j].value;
  if (grid[i][j + 1].type == "O") grid[i][j + 1].value = -1*grid[i][j - 1].value;
  if (grid[i][j - 1].type == "O") grid[i][j - 1].value = -1*grid[i][j + 1].value;
  if (grid[i + 1][j].type == "O") grid[i + 1][j].value = -1*grid[i - 1][j].value;
  if (grid[i - 1][j].type == "O") grid[i - 1][j].value = -1*grid[i + 1][j].value;
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

  return (1 * out) / 20;
}
