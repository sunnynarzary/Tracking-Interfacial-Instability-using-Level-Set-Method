class PIXEL {
  constructor(i, j, val) {
    this.i = i;
    this.j = j;
    this.value = val;
    this.type = "O"; // Domain | Boundry | Initial | Outside
    this.is_filled = true ;
    this.laplacian = int(0);
    this.next = 0;
  }

  display() {
    noStroke();
    let steps = 10;
    let vl = floor(this.value * steps) / steps;
    fill(vl * 128 + 128); // Black and White
    // fill(vl * 256 , 0 ,vl*-256 );  // red and blue

    if (this.type == "B") fill(0);
    // if( this.type == 'D') fill(0,64,64);
    // if( this.type == 'O') fill(255,255,120);
    const x = this.i * sideLength - ((n + 4) * sideLength) / 2;
    const z = this.j * sideLength - ((n + 4) * sideLength) / 2;
    drawBox(x, z, 0, 150 * (this.value + 0.8));
  }
}

function drawBox(x, z, t, ht) {
  const noiseValue = getNoiseValue(x, z, t);
  let h = getBoxHeight(noiseValue);

  h = max(h, 0.01);

  push();
  translate(x, +0, z);
  // fill(255, 2, 52);

  box(sideLength, ht, sideLength);

  pop();
}

function getNoiseValue(x, z, time) {
  x = x * noiseScale + noiseOffset;
  z = z * noiseScale + noiseOffset;
  time = time * timeScale + noiseOffset;
  return noise(x, z, time);
}

function getBoxHeight(noiseValue) {
  return map(noiseValue, 0, 1, minHeight, maxHeight) * heightScale;
}
