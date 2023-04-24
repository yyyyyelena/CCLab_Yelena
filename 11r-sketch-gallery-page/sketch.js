let spinSpeed;
let panelNum;
let speedSlider;
let panelSlider;

let panels = [];
let inter;
let x;
let y;
let m;
let n;
let angle;
let val;
let col;

function setup() {
    let cnv = createCanvas(900,800);
    cnv.parent("canvasContainer");

  invisibleCanvas2 = createGraphics(200, 600);
  inter = new interactionarea(30, 30);
  invisibleCanvas2.col = "#413f3bff"; // if i don't assign a value here, error will appear if I start with not clicking the color cubes

  speedSlider = select('#speedSlider');
  panelSlider = select('#panelSlider');
  speedSlider.input();
  panelSlider.input();
  spinSpeed = speedSlider.value();
  panelNum = panelSlider.value();
  myInputEvent();
}

function draw() {
  background("#413f3bff");

  spinSpeed = speedSlider.value();
  panelNum = panelSlider.value();
  
  console.log(spinSpeed);
  console.log(panelNum);

//   console.log(speedSlider)

  inter.setup();
  inter.interactions();
  inter.drawingfunction();
  inter.palette();
  inter.eraser();

  push();
  fill(255);
  textFont("Timesnewroman");

  text("press the color cube to change stroke color :D", 30, 740);
  text("press e & the mouse for eraser", 30, 760);

  pop();

  // display and update the panels
  for (let i = 0; i < panels.length; i++) {
    let p = panels[i];
    p.display();
    p.update();
  }

  push();
  fill("white");
  textSize(40);
  textFont("Cursive");
  text("Kaleidoscope of Spring", 300, 700);
  pop();

}

// num of panels 
function myInputEvent() {
  panels = []; // clear the panels array
  for (let i = 0; i < panelNum; i++) {
    angle = i * (360 / panelNum);
    panels[i] = new Panel(530, 330, 0.5, angle, spinSpeed);
  }
}


class interactionarea {
  constructor(thisX, thisY) {
    this.x = thisX;
    this.y = thisY;
  }

  setup() {
    //  reference frame
    push();
    translate(this.x, this.y);
    noFill();
    stroke(100);
    strokeWeight(1);
    rect(0, 0, 200, 600);
    pop();
  }

  interactions() {
    push();
    translate(this.x, this.y);
    image(invisibleCanvas2, 0, 0); //visible in area
    pop();
  }

  drawingfunction() {
    x = mouseX;
    y = mouseY;
    m = pmouseX;
    n = pmouseY;
    if (mouseIsPressed) {
      if (x > 40 && x < 80 && y > 640 && y < 680) {
        invisibleCanvas2.col = "#ff007f";
      }
      if (x > 80 && x < 120 && y > 640 && y < 680) {
        invisibleCanvas2.col = "#ffd7e9";
      }
      if (x > 120 && x < 160 && y > 640 && y < 680) {
        invisibleCanvas2.col = "#C7EA46";
      }
      if (x > 160 && x < 200 && y > 640 && y < 680) {
        invisibleCanvas2.col = "#00A86B";
      }
      invisibleCanvas2.stroke(invisibleCanvas2.col);
      invisibleCanvas2.line(m - 30, n - 30, x - 30, y - 30);
    }
  }
  
  eraser(){
    if (
    keyIsPressed == true &&
    keyCode == 69 &&
    mouseIsPressed == true &&
    mouseX > 30 &&
    mouseX < 230 &&
    mouseY > 30 &&
    mouseY < 630
  ) {
    //     eraser on visible canvas
    push();
    translate(mouseX, mouseY);
    stroke(255);
    strokeWeight(2);
    fill("lightblue");
    rectMode(CENTER);
    rect(0, 0, 20);
    pop();

    //  on invisibleCanvas
    invisibleCanvas2.push();
    invisibleCanvas2.translate(mouseX - 30, mouseY - 30);
    invisibleCanvas2.noStroke();
    invisibleCanvas2.col = "#413f3bff";
    invisibleCanvas2.fill(invisibleCanvas2.col);
    invisibleCanvas2.rectMode(CENTER);
    invisibleCanvas2.rect(0, 0, 20);
    invisibleCanvas2.pop();
  }
  }

  palette() {
    push();
    noStroke();
    fill("#ff007f");
    rect(40, 640, 40);
    pop();

    push();
    noStroke();
    fill("#ffd7e9");
    rect(80, 640, 40);
    pop();

    push();
    noStroke();
    fill("#C7EA46");
    rect(120, 640, 40);
    pop();

    push();
    noStroke();
    fill("#00A86B");
    rect(160, 640, 40);
    pop();

    push();
    stroke(255);
    strokeWeight(1);
    noFill();
    rect(200, 640, 40);
    text("eraser", 203, 665);
    pop();
  }
}

class Panel {
  constructor(x, y, s, r, speed) {
    this.x = x;
    this.y = y;
    this.scale = s;
    this.rotation = r;
    this.angle = 10;
    this.angleSpeed = speed;
  }

  update() {
    this.rotation += this.angleSpeed;
  }

  display() {
    push();
    translate(this.x, this.y); // 500,300
    scale(this.scale);
    rotate(radians(this.rotation));
    invisibleCanvas2.stroke(255);
    image(invisibleCanvas2, 0, 0);

    pop();
  }
}

function updateSpeed() {
  spinSpeed = speedSlider.value();
  for (let i = 0; i < panels.length; i++) {
    panels[i].spinSpeed = spinSpeed;
  }
}

function updatePanels() {
  panelNum = panelSlider.value();
  myInputEvent();
}