const SLICE_COUNT = 14;

function setup_pScope(pScope) {
  //pScope.output_mode(STATIC_FRAME);
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope) {
  new PLayer(null, 220); //lets us draw the whole circle background, ignoring the boundaries

  // var layer1 = new PLayer(faces);
  // layer1.mode(SWIRL(5));
  // layer1.set_boundary(200, 1000);

  var layer2 = new PLayer(waves);
  layer2.mode(RING);
  layer2.set_boundary(0, 200);

  var layer3 = new PLayer(kinashell);
  layer3.mode(RING);
  layer3.set_boundary(50, 1000);
}

function faces(x, y, animation, pScope) {
  scale(animation.frame * 2);

  ellipse(0, 0, 50, 50); // draw head
  fill(30);
  ellipse(-10, -10, 10, 10); //draw eye
  ellipse(10, -10, 10, 10); // draw eye
  arc(0, 10, 20, 10, 0, 180); // draw mouth
}

function squares(x, y, animation, pScope) {
  // this is how you set up a background for a specific layer
  let angleOffset = 360 / SLICE_COUNT / 2;
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;

  fill(66, 135, 245);
  arc(x, y, 800, 800, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background

  let waveX = -animation.wave() * 50;
  let waveY = -animation.wave() * 0;
  push();
  strokeWeight(10);
  noFill();
  beginShape();
  curveVertex(-100, -500);
  curveVertex(0, 0);
  curveVertex(-40 - waveX, -50 - waveY);
  curveVertex(40 - waveX, -100 - waveY);
  curveVertex(-40 - waveX, -200 - waveY);
  curveVertex(40 - waveX, -300 - waveY);
  curveVertex(-40, -400);
  curveVertex(40, -400);

  endShape();
  pop();
}

function waves(x, y, animation, pScope) {
  let waveX = 0 - animation.wave() * 40;
  let waveY = 100 - animation.wave() * 40;
  push();
  strokeWeight(20);
  stroke(113, 165, 222); //blue
  noFill();
  beginShape();
  curveVertex(-100, -500);
  curveVertex(0, 0);
  curveVertex(-40 - waveX, -50 - waveY);
  curveVertex(40 - waveX, -100 - waveY);
  curveVertex(-40 - waveX, -200 - waveY);
  curveVertex(40 - waveX, -300 - waveY);
  curveVertex(-40, -1000);
  curveVertex(4000, -1000);
  endShape();
  pop();
}
function kinashell(x, y, animation, pScope) {
  var kinaX = 20 - animation.wave() * 40;
  var kinaY = -450;

  var kinasize = 90;

  strokeWeight(1.5);
  fill(146, 195, 139); // yellow toned green
  ellipseMode(RADIUS);
  ellipse(kinaX, kinaY, kinasize);

  fill(0);
  ellipseMode(CENTER);
  ellipse(kinaX, kinaY, kinasize / 6);

  fill(204, 213, 174); //light sage green
  strokeWeight(0.5);
  ellipse(kinaX, kinaY - kinasize / 3, kinasize / 30);
  ellipse(kinaX, kinaY + kinasize / 3, kinasize / 30);
  ellipse(kinaX - kinasize / 3, kinaY, kinasize / 30);
  ellipse(kinaX + kinasize / 3, kinaY, kinasize / 30);

  ellipse(kinaX, kinaY - kinasize / 1.5, kinasize / 15);
  ellipse(kinaX, kinaY + kinasize / 1.5, kinasize / 15);
  ellipse(kinaX - kinasize / 1.5, kinaY, kinasize / 15);
  ellipse(kinaX + kinasize / 1.5, kinaY, kinasize / 15);

  ellipse(kinaX, kinaY - kinasize, kinasize / 10);
  ellipse(kinaX, kinaY + kinasize, kinasize / 10);
  ellipse(kinaX - kinasize, kinaY, kinasize / 10);
  ellipse(kinaX + kinasize, kinaY, kinasize / 10);

  ellipse(kinaX - kinasize / 3, kinaY - kinasize / 3, kinasize / 20);
  ellipse(kinaX + kinasize / 3, kinaY + kinasize / 3, kinasize / 20);
  ellipse(kinaX - kinasize / 3, kinaY + kinasize / 3, kinasize / 20);
  ellipse(kinaX + kinasize / 3, kinaY - kinasize / 3, kinasize / 20);

  ellipse(kinaX - kinasize / 1.5, kinaY - kinasize / 1.5, kinasize / 12);
  ellipse(kinaX + kinasize / 1.5, kinaY + kinasize / 1.5, kinasize / 12);
  ellipse(kinaX - kinasize / 1.5, kinaY + kinasize / 1.5, kinasize / 12);
  ellipse(kinaX + kinasize / 1.5, kinaY - kinasize / 1.5, kinasize / 12);
}
