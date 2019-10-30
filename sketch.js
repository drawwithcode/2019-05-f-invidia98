var vid;
var vScale = 6;
var grect = [];
var temp = 0;
var mvalue = 255;
var raggio = 0;

function setup() {

  createCanvas(windowWidth, windowHeight);
  cursor(CROSS);
  background(0);
  pixelDensity(1);
  vid = createCapture(VIDEO);
  //frameRate(30)
  vid.position(-200, -200)
  vid.size(960 / vScale, 720 / vScale);

  for (var y = 0; y < vid.height; y++) {
    for (var x = 0; x < vid.width; x++) {
      grect[x + y] = new Grect();
    }
  }



}

function draw() {
  background(0);

  translate(width / 2 - (vid.width * vScale) / 2, height / 2 - (vid.height * vScale) / 2)
  vid.loadPixels();

  for (var i = 0; i < grect.length; i++) {

  }

  for (var y = 0; y < vid.height; y++) {
    for (var x = 0; x < vid.width; x++) {
      var loc = (vid.width - x - 1 + (y * vid.width)) * 4;
      var r = vid.pixels[loc + 0];
      var g = vid.pixels[loc + 1];
      var b = vid.pixels[loc + 2];
      var bright = (r + g + b) / 3
      var w = map(bright, 0, 255, 0, vScale * 2);
      noStroke();
      //fill(r, g, b);
      //fill(noise(frameCount) * r, noise(frameCount) * g, noise(frameCount) * b);
      if (mouseIsPressed) {
        fill(r, g, b);
      } else {
        fill("white")
      }
      rectMode(CENTER);
      rect(x * vScale + vScale / 2, y * vScale + vScale / 2, w, 1);
      // pixels[loc+0] = bright;
      // pixels[loc+1] = bright;
      // pixels[loc+2] = bright;
      // pixels[loc+3] = vid.pixels[loc+3];


      grect[x + y].coordinate(x, y);
      grect[x + y].display();




    }
  }





  fill('white')
  textSize(20)
  textAlign(CENTER,CENTER)
  text('Uncover your image', width/2-200,20,300,400)
  text('Press UP and DOWN arrows, and click to give some color', width/2-200,height-70,1000,400)

}

function keyPressed(){
  if (keyCode===DOWN_ARROW) {
    raggio+=50;
  }
  if (keyCode===UP_ARROW) {
    raggio-=50;
    if (raggio<0) {
      raggio=0;
    }
  }
}

function Grect(x, y) {

  this.coordinate = function(x, y) {
    this.x = x * vScale + vScale / 2;
    this.y = y * vScale + vScale / 2;


    var d = dist(mouseX-(width / 2 - (vid.width * vScale) / 2), mouseY-(height / 2 - (vid.height * vScale) / 2), this.x, this.y)
    if (d < raggio) {
      mvalue = 0;
    } else {
      mvalue = 255;
    }




    if (d < random(raggio, raggio+100) && d > raggio) {
      mvalue = 0;
    }
  }
  this.display = function() {


    noStroke();
    fill(0, 0, 0, mvalue);
    rect(this.x, this.y, vScale, vScale);
  }
}
//updatePixels();
