const SLICE_COUNT = 12;

function setup_pScope(pScope) {
  pScope.output_mode(OUTPUT_GIF(1000));
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);

  pScope.load_image_sequence('fish_sequence', 'png', 12);
}

function setup_layers(pScope) {
  new PLayer(null, 153, 193, 222); //lets us draw the whole circle background, ignoring the boundaries

  var layer2 = new PLayer(waves);
  //layer2.mode(SWIRL(1));
  layer2.mode(RING);
  layer2.set_boundary(0, 50);

  var layer4 = new PLayer(seashell);
  layer4.mode(RING);
  layer4.set_boundary(0, 270);

  var layer3 = new PLayer(kinashell);
  layer3.mode(RING);
  layer3.set_boundary(0, 1000);

  var fishSequence = new PLayer(fish);
  fishSequence.mode(RING);
  fishSequence.set_boundary(0, 1000);

  var centerDesign = new PLayer(sun);
  centerDesign.mode(SWIRL(10));
  centerDesign.set_boundary(0, 1);
}

function faces(x, y, animation, pScope) {
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
  let waveX = 40 - animation.wave() * 40;
  let waveY = 210 - animation.wave() * 20;

  strokeWeight(10);
  stroke(113, 165, 222); //blue
  //stroke(113, 165, 222); //blue
  noFill();
  beginShape();
  //curveVertex(-100, -500);
  //curveVertex(0, 0);
  //curveVertex(-40 - waveX, -50 - waveY);
  //curveVertex(40 - waveX, -100 - waveY);
  curveVertex(-waveX, waveY);
  curveVertex(waveX, -90 - waveY);
  curveVertex(-waveX, -1010);
  curveVertex(4000, -1000);
  endShape();

  strokeWeight(15);
  beginShape();
  curveVertex(-waveX, waveY);
  curveVertex(waveX, -90 - waveY);
  curveVertex(-waveX * 2, -1010);
  curveVertex(4100, -1100);
  endShape();

  strokeWeight(20);
  beginShape();
  curveVertex(-waveX, waveY);
  curveVertex(waveX, -90 - waveY);
  curveVertex(-waveX * 3, -1010);
  curveVertex(4200, -1200);
  endShape();

  strokeWeight(7);
  beginShape();
  curveVertex(-waveX, waveY);
  curveVertex(waveX, -90 - waveY);
  curveVertex(-waveX * -0.5, -1010);
  curveVertex(4100, -1100);
  endShape();

  strokeWeight(4);
  beginShape();
  curveVertex(-waveX, waveY);
  curveVertex(waveX, -90 - waveY);
  curveVertex(-waveX * -2, -1010);
  curveVertex(4100, -1100);
  endShape();

  strokeWeight(2);
  stroke(113, 165, 222); //blue
  noFill();
  beginShape();
  curveVertex(-waveX, waveY);
  curveVertex(waveX, -90 - waveY);
  curveVertex(-waveX * -3, -1010);
  curveVertex(4000, -1000);
  endShape();
}
function kinashell(x, y, animation, pScope) {
  var kinaX = 0;
  var kinaY = -475 - animation.wave() * 40;

  var kinasize = 50 + animation.wave() * 40;

  strokeWeight(1.5);
  fill(146, 195, 139); // yellow toned green
  ellipseMode(RADIUS);
  ellipse(kinaX, kinaY, kinasize);

  fill(0);
  ellipseMode(CENTER);
  ellipse(kinaX, kinaY, kinasize / 6);

  fill(204, 213, 174); //light sage green
  strokeWeight(1);
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

function seashell(x, y, animation, pScope) {
  let angleOffset = 360 / SLICE_COUNT / 2;
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;

  fill(113, 165, 222);
  noStroke();
  arc(x, y, 400, 400, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 100);
  arc(x, y, 400, 600, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 100);
  arc(x, y, 400, 800, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 100);
  arc(x, y, 600, 1000, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 80);
  arc(x, y, 1000, 1100, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 60);
  arc(x, y, 1000, 1200, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 40);
  arc(x, y, 1000, 1300, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 30);
  arc(x, y, 1400, 1400, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 20);
  arc(x, y, 1500, 1500, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(113, 165, 222, 10);
  arc(x, y, 1500, 1600, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background

  var seashellX = 0;
  var seashellY = -250 - animation.wave() * 20;

  let seashellWidth = 25 - animation.wave() * 20;
  let seashellHeight = seashellY - 80;
  let seashellPoint = seashellHeight - 20;

  stroke(0); //black
  fill(255, 229, 189); //light pale yellow

  triangle(
    //right bottom piece
    seashellX,
    seashellY,
    seashellX + seashellWidth + 10,
    seashellHeight + 30,
    seashellX + seashellWidth + 7,
    seashellY + 2
  );

  triangle(
    //left bottom piece
    seashellX,
    seashellY,
    seashellX - seashellWidth - 10,
    seashellHeight + 30,
    seashellX - seashellWidth - 7,
    seashellY + 2
  );

  beginShape(); // number three left from center
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX - seashellWidth - 18, seashellHeight + 30);
  curveVertex(seashellX - 20, seashellPoint + 30); //apex of segment
  curveVertex(seashellX + seashellWidth - 15, seashellHeight + 30);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  endShape();

  beginShape(); // number three right from center
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX - seashellWidth + 15, seashellHeight + 30);
  curveVertex(seashellX + 20, seashellPoint + 30); //apex of segment
  curveVertex(seashellX + seashellWidth + 18, seashellHeight + 30);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  endShape();

  beginShape(); // number two left from center
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX - seashellWidth - 17, seashellHeight + 15);
  curveVertex(seashellX - 17, seashellPoint + 15); //apex of segment
  curveVertex(seashellX + seashellWidth - 15, seashellHeight + 15);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  endShape();

  beginShape(); // number two right from center
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX - seashellWidth + 15, seashellHeight + 15);
  curveVertex(seashellX + 17, seashellPoint + 15); //apex of segment
  curveVertex(seashellX + seashellWidth + 16, seashellHeight + 15);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  endShape();

  beginShape(); // number one left from center
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX - seashellWidth - 10, seashellHeight + 5);
  curveVertex(seashellX - 10, seashellPoint + 5); //apex of segment
  curveVertex(seashellX + seashellWidth - 10, seashellHeight + 5);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  endShape();

  beginShape(); // number one right from center
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX - seashellWidth + 10, seashellHeight + 5);
  curveVertex(seashellX + 10, seashellPoint + 5); //apex of segment
  curveVertex(seashellX + seashellWidth + 10, seashellHeight + 5);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  endShape();

  beginShape(); //central segment
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX - seashellWidth, seashellHeight);
  curveVertex(seashellX, seashellPoint); //apex of segment
  curveVertex(seashellX + seashellWidth, seashellHeight);
  curveVertex(seashellX, seashellY);
  curveVertex(seashellX, seashellY);
  endShape();
}

function fish(x, y, animation, pScope) {
  translate(0, -850);
  frameRate(8);
  pScope.draw_image_from_sequence('fish_sequence', 0, 0, animation.frame);
}

function sun(x, y, animation, pScope) {
  let angleOffset = 360 / SLICE_COUNT / 2;
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;

  fill(250, 183, 75, 100);
  noStroke();
  rotate(animation.wave() * 200);
  arc(x, y, 20, 350, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  fill(250, 183, 75, 200);
  arc(x, y, 150, 150, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
}
