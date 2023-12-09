function fill_with_finite_diff(i, j) {
  // if (grid[i][j].is_filled == true) {
  //   return grid[i][j].value;
  // } else
  // if (grid[i][j].type == "B") {
  //   boundry_condition(i, j);
  //   return 0;
  // } else
  if (grid[i][j].type == "D") {
    return forth_order_diff(i, j);
  } else {
    return grid[i][j].value;
  }
}

function linear_fill_2() {
  for (let i = 0; i <= n + 3; i++) {
    for (let j = 0; j <= n + 3; j++) {
      grid[i][j].is_filled = false;
    }
  }

  for (let i = 1; i <= n + 2; i++) {
    for (let j = 1; j <= n + 2; j++) {
      grid[i][j].laplacian = second_order_diff(i, j);

      if (grid[i][j].type == "B") {
        boundry_condition(i, j);
      }
    }
  }

  for (let i = 2 + n / 2; i <= n + 1; i++) {
    for (let j = 2 + n / 2; j <= n + 1; j++) {
      grid[i][j].next = fill_with_finite_diff(i, j);
    }
  }
  for (let i = n / 2 + 1; i >= 1; i--) {
    for (let j = n / 2 + 1; j >= 1; j--) {
      grid[i][j].next = fill_with_finite_diff(i, j);
    }
  }
  for (let i = n / 2 + 1; i >= 1; i--) {
    for (let j = 2 + n / 2; j <= n + 1; j++) {
      grid[i][j].next = fill_with_finite_diff(i, j);
    }
  }
  for (let i = 2 + n / 2; i <= n + 1; i++) {
    for (let j = n / 2 + 1; j >= 1; j--) {
      grid[i][j].next = fill_with_finite_diff(i, j);
    }
  }

  for (let i = 0; i <= n + 3; i++) {
    for (let j = 0; j <= n + 3; j++) {
      if (grid[i][j].type == "B") grid[i][j].value = 0;
      else grid[i][j].value = grid[i][j].next;
    }
  }
}
