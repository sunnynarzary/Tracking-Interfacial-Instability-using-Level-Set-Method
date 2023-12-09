function fill_with_finite_diff(i, j) {
  if (grid[i][j].type == "B") {
    boundry_condition(i, j);
    return 0;
  } else if (grid[i][j].type == "D") {
    return second_order_diff(i, j);
  } else {
    return grid[i][j].value;
  }
}

function linear_fill_2() {
  let new_grid_vals = [];
  for (let i = 0; i <= n + 3; i++) {
    let new_row = [];
    for (let j = 0; j <= n + 3; j++) {
      new_row.push(0);
    }
    new_grid_vals.push(new_row);
  }

  for (let i = 2 + n / 2; i <= n + 1; i++) {
    for (let j = 2 + n / 2; j <= n + 1; j++) {
      new_grid_vals[i][j] = fill_with_finite_diff(i, j);
    }
  }
  for (let i = n / 2 + 1; i >= 2; i--) {
    for (let j = n / 2 + 1; j >= 2; j--) {
      new_grid_vals[i][j] = fill_with_finite_diff(i, j);
    }
  }
  for (let i = n / 2 + 1; i >= 2; i--) {
    for (let j = 2 + n / 2; j <= n + 1; j++) {
      new_grid_vals[i][j] = fill_with_finite_diff(i, j);
    }
  }
  for (let i = 2 + n / 2; i <= n + 1; i++) {
    for (let j = n / 2 + 1; j >= 2; j--) {
      new_grid_vals[i][j] = fill_with_finite_diff(i, j);
    }
  }

  for (let i = 0; i <= n + 3; i++) {
    for (let j = 0; j <= n + 3; j++) {
      grid[i][j].value = new_grid_vals[i][j];
    }

    // if (frameCount == 10) console.log(new_grid_vals);
  }
}

function linear_fill_1() {
  let vals = [];

  for (let i = 0; i <= n + 3; i++) {
    for (let j = 0; j <= n + 3; j++) {
      vals.push(grid[i][j].value);
    }
  }

  let fctr = +1;

  //   for( let i=2; i<=n+1; i++ ) {
  //     for( let j=2; j<=n+1; j++ ) {

  //       let idx = (n+4)*i + j ;

  //       if( grid[i][j].type == 'D') {
  //         let ij_val = 0 ;

  //         // ij_val +=  1*vals[idx-2*n-8] ;      // A[sz][idx-(2*n+8)] = 1;
  //         // ij_val +=  2*vals[idx-  n-5] ;      // A[sz][idx-( n+5 )] = 2;
  //         ij_val += -8*vals[idx-  n-4] ;      // A[sz][idx-( n+4 )] = -8;
  //         // ij_val +=  2*vals[idx-  n-3] ;      // A[sz][idx-( n+3 )] = 2;
  //         // ij_val +=  1*vals[idx-    2] ;      // A[sz][idx-   2   ] = 1;
  //         ij_val += -8*vals[idx-    1] ;      // A[sz][idx-   1   ] = -8;
  //         // ij_val += +20*vals[idx  ] ;      // A[sz][idx        ] = 20;
  //         ij_val += -8*vals[idx+    1] ;      // A[sz][idx+   1   ] = -8;
  //         // ij_val +=  1*vals[idx+    2] ;      // A[sz][idx+   2   ] = 1;
  //         // ij_val +=  2*vals[idx+  n+3] ;      // A[sz][idx+( n+3 )] = 2;
  //         ij_val += -8*vals[idx+  n+4] ;      // A[sz][idx+( n+4 )] = -8;
  //         // ij_val +=  2*vals[idx+  n+5] ;      // A[sz][idx+( n+5 )] = 2;
  //         // ij_val +=  1*vals[idx+2*n+8] ;      // A[sz][idx+(2*n+8)] = 1;

  //         grid[i][j].value = -1*ij_val/32;
  //       }
  //     }
  //   }

  for (let i = 2 + n / 2; i <= n + 1; i++) {
    for (let j = 2 + n / 2; j <= n + 1; j++) {
      let idx = (n + 4) * i + j;
      if (grid[i][j].type == "D") {
        let ij_val = 0;

        ij_val += 1 * vals[idx - 2 * n - 8]; // A[sz][idx-(2*n+8)] = 1;
        ij_val += 2 * vals[idx - n - 5]; // A[sz][idx-( n+5 )] = 2;
        ij_val += -8 * vals[idx - n - 4]; // A[sz][idx-( n+4 )] = -8;
        ij_val += 2 * vals[idx - n - 3]; // A[sz][idx-( n+3 )] = 2;
        ij_val += 1 * vals[idx - 2]; // A[sz][idx-   2   ] = 1;
        ij_val += -8 * vals[idx - 1]; // A[sz][idx-   1   ] = -8;
        // ij_val += +20*vals[idx  ] ;      // A[sz][idx        ] = 20;
        ij_val += -8 * vals[idx + 1]; // A[sz][idx+   1   ] = -8;
        ij_val += 1 * vals[idx + 2]; // A[sz][idx+   2   ] = 1;
        ij_val += 2 * vals[idx + n + 3]; // A[sz][idx+( n+3 )] = 2;
        ij_val += -8 * vals[idx + n + 4]; // A[sz][idx+( n+4 )] = -8;
        ij_val += 2 * vals[idx + n + 5]; // A[sz][idx+( n+5 )] = 2;
        ij_val += 1 * vals[idx + 2 * n + 8]; // A[sz][idx+(2*n+8)] = 1;

        grid[i][j].value = (fctr * ij_val) / 20;
      }
    }
  }

  for (let i = 2; i <= n / 2 + 1; i++) {
    for (let j = 2; j <= n / 2 + 1; j++) {
      let idx = (n + 4) * i + j;

      if (grid[i][j].type == "D") {
        let ij_val = 0;

        ij_val += 1 * vals[idx - 2 * n - 8]; // A[sz][idx-(2*n+8)] = 1;
        ij_val += 2 * vals[idx - n - 5]; // A[sz][idx-( n+5 )] = 2;
        ij_val += -8 * vals[idx - n - 4]; // A[sz][idx-( n+4 )] = -8;
        ij_val += 2 * vals[idx - n - 3]; // A[sz][idx-( n+3 )] = 2;
        ij_val += 1 * vals[idx - 2]; // A[sz][idx-   2   ] = 1;
        ij_val += -8 * vals[idx - 1]; // A[sz][idx-   1   ] = -8;
        // ij_val += +20*vals[idx  ] ;      // A[sz][idx        ] = 20;
        ij_val += -8 * vals[idx + 1]; // A[sz][idx+   1   ] = -8;
        ij_val += 1 * vals[idx + 2]; // A[sz][idx+   2   ] = 1;
        ij_val += 2 * vals[idx + n + 3]; // A[sz][idx+( n+3 )] = 2;
        ij_val += -8 * vals[idx + n + 4]; // A[sz][idx+( n+4 )] = -8;
        ij_val += 2 * vals[idx + n + 5]; // A[sz][idx+( n+5 )] = 2;
        ij_val += 1 * vals[idx + 2 * n + 8]; // A[sz][idx+(2*n+8)] = 1;

        grid[i][j].value = (fctr * ij_val) / 20;
      }
    }
  }

  for (let i = 2 + n / 2; i <= n + 1; i++) {
    for (let j = 2; j <= n / 2 + 1; j++) {
      let idx = (n + 4) * i + j;

      if (grid[i][j].type == "D") {
        let ij_val = 0;

        ij_val += 1 * vals[idx - 2 * n - 8]; // A[sz][idx-(2*n+8)] = 1;
        ij_val += 2 * vals[idx - n - 5]; // A[sz][idx-( n+5 )] = 2;
        ij_val += -8 * vals[idx - n - 4]; // A[sz][idx-( n+4 )] = -8;
        ij_val += 2 * vals[idx - n - 3]; // A[sz][idx-( n+3 )] = 2;
        ij_val += 1 * vals[idx - 2]; // A[sz][idx-   2   ] = 1;
        ij_val += -8 * vals[idx - 1]; // A[sz][idx-   1   ] = -8;
        // ij_val += +20*vals[idx  ] ;      // A[sz][idx        ] = 20;
        ij_val += -8 * vals[idx + 1]; // A[sz][idx+   1   ] = -8;
        ij_val += 1 * vals[idx + 2]; // A[sz][idx+   2   ] = 1;
        ij_val += 2 * vals[idx + n + 3]; // A[sz][idx+( n+3 )] = 2;
        ij_val += -8 * vals[idx + n + 4]; // A[sz][idx+( n+4 )] = -8;
        ij_val += 2 * vals[idx + n + 5]; // A[sz][idx+( n+5 )] = 2;
        ij_val += 1 * vals[idx + 2 * n + 8]; // A[sz][idx+(2*n+8)] = 1;

        grid[i][j].value = (fctr * ij_val) / 20;
      }
    }
  }

  for (let i = 2; i <= n / 2 + 1; i++) {
    for (let j = 2 + n / 2; j <= n + 1; j++) {
      let idx = (n + 4) * i + j;

      if (grid[i][j].type != "I") {
        let ij_val = 0;

        ij_val += 1 * vals[idx - 2 * n - 8]; // A[sz][idx-(2*n+8)] = 1;
        ij_val += 2 * vals[idx - n - 5]; // A[sz][idx-( n+5 )] = 2;
        ij_val += -8 * vals[idx - n - 4]; // A[sz][idx-( n+4 )] = -8;
        ij_val += 2 * vals[idx - n - 3]; // A[sz][idx-( n+3 )] = 2;
        ij_val += 1 * vals[idx - 2]; // A[sz][idx-   2   ] = 1;
        ij_val += -8 * vals[idx - 1]; // A[sz][idx-   1   ] = -8;
        // ij_val += +20*vals[idx  ] ;      // A[sz][idx        ] = 20;
        ij_val += -8 * vals[idx + 1]; // A[sz][idx+   1   ] = -8;
        ij_val += 1 * vals[idx + 2]; // A[sz][idx+   2   ] = 1;
        ij_val += 2 * vals[idx + n + 3]; // A[sz][idx+( n+3 )] = 2;
        ij_val += -8 * vals[idx + n + 4]; // A[sz][idx+( n+4 )] = -8;
        ij_val += 2 * vals[idx + n + 5]; // A[sz][idx+( n+5 )] = 2;
        ij_val += 1 * vals[idx + 2 * n + 8]; // A[sz][idx+(2*n+8)] = 1;

        grid[i][j].value = (fctr * ij_val) / 20;
      }
    }
  }
}
