

//Matter JS - Declaration vars
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var engine, world;

//Game variables
var gameState; //Gamestate is to change the initial 2d dashboard to 3d environment and back to 2d plane at game end
var cam; //Creating camera for the 3d workspace
var bodyOne;
var rover; //Var to load rover GIF.
var bg; //Var to load dashboard background GIF.
var canvas2d; //Not in use currently - Testing purpose
var canvas3d; //Not in use currently - Testing purpose
var sprite; //Not in use currently - Testing purpose
var textFont1; //Not in use currently - Testing purpose
var roverPosition; //Var to assign rover position
var captureframeCount; //Capturing frameCount to use it in game at several instances
var cameraPosition; //Getting camera position - Not in use currently - Testing purpose
var boostCounter;
var booster_text;
var movement;

//Terrain Assests - Vars
var Mterrain; //Var to import 3d terrain model as obj object
var textureImg;

//Terrain Creation - Vars
var frameR; //Specialised Counting system for creating terrain synchronously with regard frameCount..
var n; //n = terrainCount .. Records number of terrains created
const d = -200; // Not in use - Testing purpose - A fixed adding value to the z(z-axis) position of the successive terrains
var a = -200; //Not in use - Testing purpose -The position(z-axis) of terrain to be created. Initial value = "-200".  of default terrain is "0". a(n) = a + (n-1)d
var Tpos = 0; //Var to calculate terrain position(z-axis) of successive terrains
var Tpos2 = -200; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos3 = -400; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos4 = -600; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos5 = -800; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var element;
var textGraphic;

//Preload function
function preload(){
  Mterrain = loadModel("terrain.obj", true);
  rover = loadImage("rover.gif");
  bg = loadImage("Sample.webp");
  textFont1 = loadFont("textFont1.ttf")
  textureImg = loadImage("texture1.jpg");
  element = loadModel("elements.obj");
}

//Setup function
function setup() {

  //MatterJS_SETUP
  engine = Engine.create();
  world = engine.world;
 
  //Initialiasing gamestate
  gameState = 0;

  //CreatingCanvas - WEBGL Mode
  canvas3d = createCanvas(displayWidth, displayHeight, WEBGL);
  
  //Cam
  cam = createCamera(0, 0, 0
    );
        
  //DebugModeON
  //debugMode(2100, 10,0 ,0, 0, 200, 0, 0, 0);

  //Initializing value of rover position
  roverPosition = 21;

  //Initializing value for counts in gamestate 1
  captureframeCount = 0;

  //Initialising frameR
  frameR = 0;

  //Initialising terrainFrameCount
  terrainCount = 0;

  //Defining n
  n = 5;

  ///Defining boostCounter
  boostCounter = 20;

  //Creating Graphics
  //booster_text = createGraphic(200, 200);
}

function draw() {  
  //scale(20);
  
  //Console.Log
    //console.log("GameState : " + gameState);
    //console.log("frameR: " + frameR);
    //console.log("n = " + n);
    //console.log("Tpos = " +  Tpos);
    //console.log("Tpos2 = " + Tpos2);
    //console.log("Booster Count Log: " + boostCounter);
    console.log("roverPosition: " + roverPosition);

  //Setting background
  //BackgroundColour
  //background(textureImg);
  background("BLACK");
  //Dashboard Screen
  if(gameState === 0){
    push();
    texture(bg);
    noStroke();
    plane(displayWidth, displayHeight);
    pop();
  }

  //Capturing counts when gamestate === 0 to reset camera and the rover
  if(gameState === 1 && frameCount%1.5 === 0){
    captureframeCount = captureframeCount + 1;
  }

  //GAME SCENE
  if(gameState === 1){
   //Initialising Game
    //Smooth
    smooth();

    //Calling createTerrains() function to create the terrain in the game
    createTerrains();
    
    //Text - Embedding in a plane
    //text and its attributes
    // booster_text.textFont(textFont1);
    // booster_text.textAlign(CENTER, TOP);
    // booster_text.textSize(100);
    // booster_text.text("Hello World!", displayWidth/2, displayHeight/2);
    //plane and it's texture
    //texture(booster_text);
    //plane(200, 200);

    // //Trial..
    // push();
    // scale(1);
    // texture(img);
    // model(element);
    // pop();

    //OrbitalControl
    orbitControl(1,1,1);
  
    //Defining frameR
    if(keyIsDown(UP_ARROW) && frameCount%1 === 0){
      frameR++;
    }

    //MterrainD - Properties of terrain - DEFAULT
    //push();
    //scale(6);
    //translate(0,0,0);
    //noStroke();
    //fill(255, 102, 94);
    //texture(img);
    //model(Mterrain);
    //pop();

    if(frameR > 0 && frameR%200 === 0){
       //Updating the number of terrains created
       n = n + 5;
       //Calculating Tposition
       Tpos =  Tpos  - 200;
       Tpos2 = Tpos  - 200;
       Tpos3 = Tpos2 - 200;
       Tpos4 = Tpos3 - 200;
       Tpos5 = Tpos4 - 200;
    };

    //Camera movement
    if(keyIsDown(UP_ARROW)){
      cam.setPosition(0, 0, -(frameR*15));
      //----//cam.move(0, 0, -4);
    }

     //MarsRover     
     //Setting rover position
     //roverPosition = Tpos -200;
     //Mars rover - GIF
     push();
     if(keyIsDown(UP_ARROW)){
      roverPosition = Tpos;
     }
     scale(10);
     texture(rover);
     noStroke();
     translate(0, 0, roverPosition);
     plane(25, 19);
     pop();

     
      
    //MatterJS - Creating body
    //bodyOne = new Sample(displayWidth/2-683, displayHeight/2-420, 160, 140);

    // if(keyIsDown(66) && boostCounter > 0 && frameCount%8 === 0){
    //   boostCounter = boostCounter - 1;
    // }
    //  if(boostCounter < 20 && frameCount%50 === 0 ){
    //    boostCounter = boostCounter + 1;
    //  }
    //Camera movement(front) when key is pressed and stop when released
    
    // //Camera movement(right) when key is pressed and stop when released
    // if(keyIsDown(RIGHT_ARROW)){
    //   cam.setPosition(0, 0, -(frameR*12));
    //   //cam.move(0, 0, -4);
    // }
    // //Camera movement(left) when key is pressed and stop when released
    // if(keyIsDown(LEFT_ARROW)){
    //   cam.setPosition(0, 0, -(frameR*19));
    // }
  }
}

//MousePressed function - Change gameState
  function mousePressed(){
    console.log("Pressed")
    gameState = 1;
  }

//Terrain creation function - Called in main();
function createTerrains(){
 //Terrain creation(MainTerrain)
       //Mterrain(n) - Properties of terrain(n)
       push();
       //Describing the size of the terrain
       scale(15);
       //Assigning position to the terrain(z-axis position) - To appear like being continous
       translate(0,0,Tpos);
       //Random colour(border) selection
       noStroke();
       //stroke(219, 101, 101, 0.27);
       //Terrain colour
       fill(255, 102, 94);
       //Loading terrain model..
       texture(textureImg);
       model(Mterrain);
       pop();

    //Terrain creation(BufferTerrain1)
       //Mterrain(n) - Properties of terrain(n) - BufferTerrain1..
       push();
       //Describing the size of the terrain
       scale(15);
       //Assigning position to the terrain(z-axis position) - To appear like being continous
       translate(0,0,Tpos2);
       //Random colour(border) selection
       noStroke();
       //stroke(219, 101, 101, 0.27); - RGBA(Red, Green, Blue, Alpha)
       //Terrain colour
       fill(255, 102, 94);
       //Loading terrain model..
       texture(textureImg);
       model(Mterrain);
       pop();

    //Terrain creation(BufferTerrain2)
       //Mterrain(n) - Properties of terrain(n) - BufferTerrain2..
       push();
       //Describing the size of the terrain
       scale(15);
       //Assigning position to the terrain(z-axis position) - To appear like being continous
       translate(0,0,Tpos3);
       //Random colour(border) selection
       noStroke();
       //stroke(219, 101, 101, 0.27);
       //Terrain colour
       fill(255, 102, 94);
       texture(textureImg);
       model(Mterrain);
       pop();

    //Terrain creation(BufferTerrain3)
       //Mterrain(n) - Properties of terrain(n) - BufferTerrain3..
       push();
       //Describing the size of the terrain
       scale(15);
       //Assigning position to the terrain(z-axis position) - To appear like being continous
       translate(0,0,Tpos4);
       //Random colour(border) selection
       noStroke();
       //stroke(171, 154, 154, 0);
       //Terrain colour
       fill(255, 102, 94);
       //Loading terrain model..
       texture(textureImg);
       model(Mterrain);
       pop();

    //Terrain creation(BufferTerrain4)
       //Mterrain(n) - Properties of terrain(n) - BufferTerrain4..
       push();
       //Describing the size of the terrain
       scale(15);
       //Assigning position to the terrain(z-axis position) - To appear like being continous
       translate(0,0,Tpos5);
       //Random colour(border) selection
       noStroke();
       //stroke(171, 154, 154);
       //Terrain colour
       fill(255, 102, 94);
       //Loading terrain model..
       texture(textureImg);
       model(Mterrain);
       pop();
}















//............Tested codes............///
  // perspective(PI / 2.0, width /height);
  //camX = map(mouseX, 0, width/10, -200, 200);
  //camera((Xpos) +30 , -height/8, 0);
  //camera((Xpos) +30 , -height/8, 0, width, height/6,0,0,1,0);
  // cam.move(delta, 0, 0);
  // if (frameCount % 10 === 0) {
  //   delta *= 2;
  // }
  // if (delta===2 || delta > 2.2) {
  //   delta =2;
  // }
  // perspective(PI / 2.0, width /height);
  //camX = map(mouseX, 0, width/10, -200, 200);
  //camera((Xpos) +30 , -height/8, 0);
  //camera((Xpos) +30 , -height/8, 0, width, height/6,0,0,1,0);
  //translate(0, 0, mouseX);
  //console.log(modelX);
  //box(85);
  //rotateY(90);
  //rotateZ(90);
  //rotate(180);
  //  if(frameCount%1===0){
  //    if(Xpos<0){
  //      Xpos+=6;
  //    }
  //    if(Xpos===0){
  //      Xpos= -600;
  //    }
  //  }, (height/2) / tan(PI/6),width/2, height/2, 100, 0,1,0
  //  if(Xpos>200){
  //    Xpos = -width/2;
  //  }
  // if(frameCount%1===0){
  //   Xpos=Xpos+10;
  // }
  //modelX(0,0,0);
  // cam.setPosition(sin(frameCount / 60) * 200, 0, 100);
  // perspective();
  // X = sliderGroup[0].value();
  // Y = sliderGroup[1].value();
  // Z = sliderGroup[2].value();
  // centerX = sliderGroup[3].value();
  // centerY = sliderGroup[4].value();
  // centerZ = sliderGroup[5].value();
  //camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
  // for (var i = 0; i < 6; i++) {
  //   if (i === 2) {
  //     sliderGroup[i] = createSlider(10, 400, 200);
  //   } else {
  //     sliderGroup[i] = createSlider(-400, 400, 0);
  //   }
  //   h = map(i, 0, 6, 5, 85);
  //   sliderGroup[i].position(10, height + h);
  //   sliderGroup[i].style('width', '80px');
  // }
  //BG
  //image(bgImg, displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  //BG_END
  //cam.setPosition(0,0,0);
  // function keyPressed(){
  //   if(keyCode === 38){
  //     cam.move(0, 0, +5);
  //     //cam.setPosition(0, 0, captureframeCount*4);
  //   }
  //   loop();
  // }

  // function keyReleased(){
  //   if(keyCode === 38){
  //     return false;
  //   }
  //}
  // //Mterrain3 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-400);
    // stroke("BLUE");
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();

    // //Mterrain4 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-600);
    // stroke("Green");
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();

    // //Mterrain5 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-800);
    // stroke("RED");
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();
    //   //Mterrain6 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-1000);
    // stroke(0);
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();
  

    /////
    // //MterrainD2 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-200);
    // stroke("Yellow");
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();

    // //Mterrain3 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-400);
    // stroke("BLUE");
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();

    // //Mterrain4 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-600);
    // stroke("Green");
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();

    // //Mterrain5 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-800);
    // stroke("RED");
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();
    // //Mterrain6 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-1000);
    // stroke(0);
    // fill(255, 102, 94);
    // model(Mterrain);
    // pop();