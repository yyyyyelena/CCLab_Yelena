let cam;
let img;

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
let scaleForImagesX = 0.09
let scaleForImages = 0.09

let textVisible = false;

let exportButton = document.getElementById('export')
// let flip = false;


function preload(){
  for(let i=1;i<7;i++){
    let filename = "gallery/stamp"+i+".png";
    stamp.push(loadImage(filename));
    console.log("yess")
}
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
  image(cam,0,0,4,3)
  img = createImage(640, 480);
}

function draw() {
  // background(0);
  button.addEventListener('click', Captures);
  buttonFlower.addEventListener('click', flowerButtonPressed);
  buttonLeaf1.addEventListener('click', leaf1ButtonPressed);
  buttonLeaf2.addEventListener('click', leaf2ButtonPressed);
  buttonEarring1.addEventListener('click', earring1ButtonPressed);
  buttonEarring2.addEventListener('click', earring2ButtonPressed);
  buttonEyebrow.addEventListener('click', eyebrowButtonPressed);

  drag();


  let generateBtn = document.getElementById("generateBtn");
  generateBtn.addEventListener("click", generateText);
  exportButton.addEventListener('click',Export);

}

function Captures(){
  console.log("capture is working")

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
    scale(scaleForImagesX,scaleForImages);
    image(stamp[stampIndicator],-stamp[stampIndicator].width/2,-stamp[stampIndicator].height/2);
    pop()
  }
}


function flipImages(){
  if (keyCode === LEFT_ARROW){
    scaleForImagesX =-0.09
    console.log(scaleForImagesX)
  } else if (keyCode === RIGHT_ARROW){
    scaleForImagesX=0.09
    console.log(scaleForImagesX)

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
  console.log(stamp[stampIndicator])
  // drag();
    // change global variables that defines whats the current stamp
    // that bariable should than be used inside the p5 code
}
function leaf1ButtonPressed(){
  stampIndicator = 1
  // drag();
}
function leaf2ButtonPressed(){
  stampIndicator = 2
  // drag();
}
function earring1ButtonPressed(){
  stampIndicator = 3
  // drag();
}
function earring2ButtonPressed(){
  stampIndicator = 4
  // drag();
}
function eyebrowButtonPressed(){
  stampIndicator = 5
  // drag();
}


function generateText(){
  let textContainer = document.getElementById("textContainer");
  let newText = "<p>This is a creative project inspired by Frida Kahlo s self portraits. </p>"+
  "<p>The top left corner of the screen is the mirror, you can see your image over there :)</p>"+
  "<p>When you are ready, click the capture button, and… Voila!! You ve got your picture captured!!</p>"+
  "<p>Next, click on the stamps, and move your mouse to wherever you want to put these stamps. By hitting the key ←/→, you are able to flip these stamps :)</p>"+
  "<p>A small introduction on the stamps:</p>"+
  "<p>The first one (a bunch of flowers), the second earring(hand), two leaves and the eyebrow are all from Self Portrait Dedicated to Dr. Eloesser</p>"+
  "<p>The first earring (blue) is from Self Portrait with Curly Hair</p>"+
  "<p>Note that you can recapture by clicking the capture button, but if you have already added stamps on your image, they will be gone;;</p>"+
  "<p>If you are ready, click the instruction button again, and this page will disappear~ "
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