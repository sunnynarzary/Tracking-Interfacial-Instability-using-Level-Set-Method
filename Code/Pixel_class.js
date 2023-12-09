class PIXEL {
  constructor(i, j, val) {
    this.i = i;
    this.j = j;
    this.value = val;
    this.type = "O"; // Domain | Boundry | Initial | Outside
  }

  display() {
    noStroke();
    let steps = 10;
    let vl = floor(this.value * steps) / steps;
    fill(vl * 128 + 128 );  // Black and White 
    // fill(vl * 256 , 0 ,vl*-256 );  // red and blue 

    // if( this.type == 'B') fill(255,0,0);
    // if( this.type == 'D') fill(0,64,64);
    // if( this.type == 'O') fill(255,255,120);
    square(this.i * dim, this.j * dim, dim);
  }
}
