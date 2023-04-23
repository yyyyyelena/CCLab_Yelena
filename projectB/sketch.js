let capture;
let button = document.getElementById('start_capture');

function setup() {
  let cnv = createCanvas(800, 800);
  cnv.parent('canvasContainer');
  
  capture = createCapture(VIDEO);
  capture.hide();
  
  noLoop();
}

button.addEventListener('click', function() {
  loop();
});

function draw() {
  background(0);
  push();
  scale(0.8);
  image(capture, 100, 150, width, width * capture.height / capture.width);
  pop();
}

function showCapturedImage() {
  image(capture, 0, 0, width, height);
}
