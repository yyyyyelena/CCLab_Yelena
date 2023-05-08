let cam;
let img;
let cnv;

// undo
let previousState;
let stateIndex = 0;
// undo

let button = document.getElementById('captureButton');
let selectedStamp; // need to give it a value in the very beginning

let stamp=[]; //array that makes loading image easier
let stampIndicator = 0 //click on the button and change the value of indicator to generate different stamps
let buttonFlower = document.getElementById('flowerStamp')
let buttonLeaf1 = document.getElementById('leafStamp1')
let buttonLeaf2 = document.getElementById('leafStamp2')
let buttonEarring1 = document.getElementById('earringStamp1')
let buttonEarring2 = document.getElementById('earringStamp2')
let buttonEyebrow = document.getElementById('eyebrowStamp')
let buttonFlower2 = document.getElementById('flowerStamp2')
let buttonFlower3 = document.getElementById('flowerStamp3')
let buttonFlower4 = document.getElementById('flowerStamp4')
let buttonParrot = document.getElementById('parrotStamp')
let buttonCurves = document.getElementById('curveStamp')
let buttonFlowerCurve = document.getElementById('flowerCurveStamp')

let scaleX = 0.6;
let scaleY = 0.6;

let textVisible = false;

let exportButton = document.getElementById('export')
// let flip = false;


function preload(){
  for(let i=1;i<13;i++){
    let filename = "../diy/Gallery/stamp"+i+".png";
    stamp.push(loadImage(filename));
}
}

function setup() {
  console.log(windowWidth)
  if(windowWidth>800){
    cnv= createCanvas(800,600);
  } else{
    cnv= createCanvas(windowWidth,(windowWidth/4)*3);
  }
  cnv.parent('canvasContainer');

  cam = createCapture(VIDEO);
  image(cam,0,0,4,3)
  img = createImage(640, 480);

  // undo
  // saveState();


}

function draw() {
  button.addEventListener('click', Captures);
  buttonFlower.addEventListener('click', flowerButtonPressed);
  buttonLeaf1.addEventListener('click', leaf1ButtonPressed);
  buttonLeaf2.addEventListener('click', leaf2ButtonPressed);
  buttonEarring1.addEventListener('click', earring1ButtonPressed);
  buttonEarring2.addEventListener('click', earring2ButtonPressed);
  buttonEyebrow.addEventListener('click', eyebrowButtonPressed);
  buttonFlower2.addEventListener('click', flower2ButtonPressed);
  buttonFlower3.addEventListener('click', flower3ButtonPressed);
  buttonFlower4.addEventListener('click', flower4ButtonPressed);
  buttonParrot.addEventListener('click', parrotButtonPressed);
  buttonCurves.addEventListener('click', curveButtonPressed);
  buttonFlowerCurve.addEventListener('click', flowerCurveButtonPressed);
  drag();


  let generateBtn = document.getElementById("generatetext");
  generateBtn.addEventListener("click", generateText);
  exportButton.addEventListener('click',Export);

}

function Captures(){
  // Pixel Manipulation
  // 1. load pixels of video
  // 2. load pixles of image  
  cam.loadPixels();
  img.loadPixels();

  // 3. look at every single pixel in the video
  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
      let index = (x + y * cam.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

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

// 4. based on video pixel, color correspondoing pixel in img
  img.updatePixels();

  // 5. then draw image:
  image(img, 0, 0,width, height);
// startX, startY, image width, image height (the last two have to be the same as the canvas)
}

function drag(){

  flipImages();

  if(mouseIsPressed && mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
    push()
    translate(mouseX,mouseY);
    scale(scaleX,scaleY);
    image(stamp[stampIndicator],-stamp[stampIndicator].width/2,-stamp[stampIndicator].height/2);
    pop()
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



// attach event listener
function flowerButtonPressed(){
  stampIndicator = 0
}
function leaf1ButtonPressed(){
  stampIndicator = 1
}
function leaf2ButtonPressed(){
  stampIndicator = 2
}
function earring1ButtonPressed(){
  stampIndicator = 3
}
function earring2ButtonPressed(){
  stampIndicator = 4
}
function eyebrowButtonPressed(){
  stampIndicator = 5
}
function flower2ButtonPressed(){
  stampIndicator = 6
}
function flower3ButtonPressed(){
  stampIndicator = 7
}
function flower4ButtonPressed(){
  stampIndicator = 8
}
function parrotButtonPressed(){
  stampIndicator = 9
}
function curveButtonPressed(){
  stampIndicator = 10
}
function flowerCurveButtonPressed(){
  stampIndicator = 11
}

function flipImages(){
  if (keyCode === LEFT_ARROW){
    scaleX =-0.6
  } else if (keyCode === RIGHT_ARROW){
    scaleX=0.6
  }
}

function generateText(){
  let textContainer = document.getElementById("textContainer");
  let newText = "<p>This is a creative project inspired by Frida Kahlo s self portraits. </p>"+
  "<p>The top left corner of the screen is the mirror, you can see your image over there :)</p>"+
  "<p>When you are ready, click the capture button, and… Voila!! You ve got your picture captured!!</p>"+
  "<p>Next, click on the stamps, and move your mouse to wherever you want to put these stamps. By hitting the key ←/→, you are able to flip these stamps :)</p>"+
  "<p>Click command+z at the same time as undo (but you can only undo the lastest stamp)</p>"+
  "<p>Note that you can recapture by clicking the capture button, but if you have already added stamps on your image, they will be gone;;</p>"+
  "<p>If you are ready, click the instruction button again, and this page will disappear~ </p>"+
  "<p>Click export to download your painting!!</p> "+
  "<p>Be creative ;) and do Check out Frida Kahlo s artworks!!</p>"

  textContainer.innerHTML = newText;


  if (textVisible) {
    textContainer.style.display = "none";
    textVisible = false;
  } else {
    textContainer.style.display = "block";
    textVisible = true;
  }
}

function Export (){
  saveCanvas('myCanvas', 'png');
}

// // 
// function keyPressed(e) {
//   // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
//   if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
//     undoToPreviousState();
//   }
// }

// function undoToPreviousState() {
//   // if previousState doesn't exist ie is null
//   // return without doing anything
//   if (!previousState) {
//     return;
//   }
//   // else draw the background (in this case white)
//   // and draw the previous state
//   image(previousState, 0, 0);
//   // then set previous state to null
//   previousState = null;
// }

// function mousePressed() {
//   // the moment input is detect save the state
//   saveState();
// }

// function saveState() {
//   // save state by taking image of background
//   // for more info look at reference for get
//   previousState = get();
// }