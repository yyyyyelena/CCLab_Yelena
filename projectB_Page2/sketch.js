let capture;
let img;

let button = document.getElementById('start_capture');
let selectedStamp; // need to give it a value in the very beginning
let stampFlower1;
let stampFlower2;
let stampLeaf1;
let stampLeaf2;
let stampEarring1;
let stampEarring2;
let stamp=[];
// let num_dots =8000;

function preload(){
  stampFlower1 = loadImage("gallery/Flower-1.png");
  // stampFlower2 = loadImage("gallery/flower2.pdf");
  stampLeaf1= loadImage("gallery/Leaf_1.png");
  stampLeaf2= loadImage("gallery/Leaf2.png");
  stampEarring1= loadImage("gallery/Earring1.png");
  stampEarring2= loadImage("gallery/Earring2.png");
}


function setup() {
  let cnv = createCanvas(windowWidth*0.9, windowHeight*0.85);
  cnv.parent('canvasContainer');

  capture = createCapture(VIDEO);
  capture.hide();
  // img.hide();
  // backgroundTexture();

  stamp=[stampFlower1,stampLeaf1,stampLeaf2,stampEarring1,stampEarring2]
  noLoop();

}

start_capture.addEventListener('click', Captures);

function draw() {
  noFill;
  stroke(255,0,0)
  rect(0,0,width, height);
// set-ups for the stamps 
  for(let i=0; i<stamp.length;i++){
    push()
      scale(0.03)
      image(stamp[i],(capture.width)/0.013,(capture.height)*(i+0.5)/0.039);//stamp location
      console.log(stamp[i]);
    pop();

  }

// capture image
  Captures();
}

function keyPressed() {
  if (key === 'q') {
    selectedStamp = stampFlower1;
  // } else if (key === 'r') {
  //   selectedShape = 'rectangle';
  // } else if (key === 't') {
  //   selectedShape = 'triangle';
  }
}

function mousePressed() {
  if(mouseX>width*0.1 &&mouseX<capture.width&&mouseY>height*0.1&&capture.height){
  push()
    translate(mouseX,mouseY);
    scale(0.06)
    image(stampFlower1,-stampFlower1.width/2,-stampFlower1.height/2);
  pop()
  }
}

// function backgroundTexture(){
//   fill(220,random(10,50));
//   stroke(220,random(10,50));
//   strokeWeight(2)
// for (let i =0; i<num_dots;i++){
//     let x =random()*width
//     let y = random()*height
//     ellipse(x,y,3,0.7)
//   }
// for (let i =0; i<num_dots;i++){
//     let m =random()*width
//     let n = random()*height
//     ellipse(m,n,0.8,02)
//   }
//   let x1 = random()*width;
//   let y1 = random()*height;
//   let theta=random*2*PI;
//   let segmentLength = random()*5+2;
//   let x2 = cos(theta)*segmentLength+x1;
//   let y2 = sin(theta)*segmentLength+y1;
//   line(x1,y1,x2,y2)

//   rect(0,0,width,height);
// }

function Captures(){
  // loop()
  img = createImage(capture.width, capture.height);

  capture.loadPixels();
  img.loadPixels();

  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;

      let r = capture.pixels[index + 0];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      let avg = (r + g + b) / 3;
      let threshold = 0.4; // play with this number
      if (avg > 255 * threshold) {
        // white
        img.pixels[index + 0] = 255; // R
        img.pixels[index + 1] = 255; // G
        img.pixels[index + 2] = 255; // B
        img.pixels[index + 3] = 255; // A
      } else {
        // black
        img.pixels[index + 0] = 0; // R
        img.pixels[index + 1] = 0; // G
        img.pixels[index + 2] = 0; // B
        img.pixels[index + 3] = 255; // A
      }
    }
  }
  console.log("this is working xp");

  img.updatePixels();// this is not working ;;
  push();
  scale(0.8);
  image(img, 0,0, window.width*0.7, window.width*0.7 * capture.height / capture.width);
// image(img, x, y, [width], [height])
// x: window.width*0.1; y:window.height*0.1; width:window.width*0.7; 
// height:window.width*0.7 * capture.height / capture.width
  pop();

}