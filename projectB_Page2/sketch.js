let cam;
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
let stampIndicator = 0
let scaleForImages = 0.06
let scaleForImagesX=0.06

let buttonFlower = document.getElementById('Flower1')
let buttonLeaf1 = document.getElementById('Leaf1')
let buttonLeaf2 = document.getElementById('Leaf2')
let buttonEarring1 = document.getElementById('Earring1')
let buttonEarring2 = document.getElementById('Earring2')

let stampButton=[]


function preload(){
  stampFlower1 = loadImage("gallery/Flower-1.png");
  // stampFlower2 = loadImage("gallery/flower2.pdf");
  stampLeaf1= loadImage("gallery/Leaf_1.png");
  stampLeaf2= loadImage("gallery/Leaf2.png");
  stampEarring1= loadImage("gallery/Earring1.png");
  stampEarring2= loadImage("gallery/Earring2.png");
}

function setup() {
  let cnv;
  console.log(windowWidth)
  if(windowWidth>800){
    cnv= createCanvas(800,600);
  } else{
    cnv= createCanvas(windowWidth,(windowWidth/4)*3);
  }
  // let cnv = createCanvas(windowWidth*0.9, windowHeight*0.85);
  cnv.parent('canvasContainer');

  cam = createCapture(VIDEO);

  img = createImage(640, 480);
  // capture.hide();
  // img.hide();
  // backgroundTexture();

  // stamp=[stampFlower1,stampLeaf1,stampLeaf2,stampEarring1,stampEarring2]
  // stampButton=[buttonFlower,buttonLeaf1,buttonLeaf2,buttonEarring1,buttonEarring2]
  // noLoop();

}

// start_capture.addEventListener('click', Captures);

function draw() {
  background(0);



  // 1. load pixels of video
  // 2. load pixles of image  
  // 3. look at every single pixel in the video
  // 4. based on video pixel, color correspondoing pixel in img

  // 5. then draw image:
  image(img, 0, 0)
  // might be this to fill full canvas:
  // image(img, 0, 0, width, height)


}

function mousePressed() {
  flipImages();

  if(mouseX>width*0.1 &&mouseX<capture.width&&mouseY>height*0.1&&capture.height){
  push()
    translate(mouseX,mouseY);
    scale(scaleForImagesX,scaleForImages);
    image(stamp[stampIndicator],-stamp[stampIndicator].width/2,-stamp[stampIndicator].height/2);
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
      let threshold = 0.3; // play with this number
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

  img.updatePixels();
  push();
  scale(0.8);
  image(img, 0,0, window.width*0.7, window.width*0.7 * capture.height / capture.width);

  pop();

}

function stampsLayout(){
  // set-ups for the stamps 
  for(let i=0; i<stamp.length;i++){
    push()
      scale(0.03);
      image(stamp[i],window.width*0.65/0.03,( window.height*0.2)*(i+0.2)/0.039);//stamp location
    pop();
  }

  for(let i=0; i<stamp.length;i++){
    push()
      image(stampButton[i],window.width*0.65/0.03+10,( window.height*0.2)*(i+0.2)/0.039);//stamp location
    pop();
  }
}

function flipImages(){
  if (keyCode === LEFT_ARROW){
    scaleForImagesX =-0.06
  } else if (keyCode === RIGHT_ARROW){
    scaleForImagesX=0.06
  }
}


function windowResized(){
  console.log("lalal")
  if(windowWidth>800){
    resizeCanvas(800,600);
  } else{
    resizeCanvas(windowWidth,(windowWidth/4)*3);
  }
}


// select button
let flowerButton = document.getElementById("flowerStamp");

// attach event listener
function flowerButtonPressed(){
    console.log("flower button was pressed");
    // change global variables that defines whats the current stamp
    // that bariable should than be used inside the p5 code
}
flowerButton.addEventListener("click", flowerButtonPressed);