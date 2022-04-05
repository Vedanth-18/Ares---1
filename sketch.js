//Remember to shrink the canvas size by 100 units at the end to ensure that it fits into every screen

//Game variables
var gameState; //Gamestate is to change the initial 2d dashboard to 3d environment and back to 2d plane at game end
var cam; //Creating camera for the 3d workspace
var rover; //Var to load rover GIF.
var bg; //Var to load dashboard background GIF.
var canvas3d; //Var to create the 3d WEBGL canvas
var roverPositionZ; //Var to assign rover position over Z axis
var roverPositionX; //Var to assign rover position over X axis

//Terrain Assests - Vars
var M_Terrain; //Var to import 3d terrain model as obj object
var textureImg; //Var to aplly texture for the terrain

//Terrain Creation - Vars
var frameR; //Specialised Counting system for creating terrain synchronously with regard frameCount..
var Tpos = 0; //Var to calculate terrain position(z-axis) of successive terrains
var Tpos2 = -200; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos3 = -400; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos4 = -600; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos5 = -800; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var AcknowledgeS; //Variable to acknowledge the beginning of game[AcknowlegeS = 0, before game starts. AcknowledgeS = 1, to mark the start of the game].
var moveMag; //movementMagnitude[For both rover and camera]

//Texts - Var
var textGraphic;
var textFont1; 
var booster_text;

//Preload function
function preload(){
  M_Terrain = loadModel("Assets/3d Object/terrain.obj", true);
  rover = loadImage("Assets/Image/rover.gif");
  bg = loadImage("Assets/Image/Sample.webp");
  textureImg = loadImage("Assets/Image/texture1.jpg");
  textFont1 = loadFont("Assets/Text/textFont1.ttf")
}

//Setup function
function setup() {
  //Initialiasing gamestate
  gameState = 0;
  //CreatingCanvas - WEBGL Mode
  canvas3d = createCanvas(displayWidth, displayHeight, WEBGL);
  //Cam
  cam = createCamera(0, 0, 0);   
  //DebugModeON
  //debugMode(2100, 10,0 ,0, 0, 200, 0, 0, 0);
  //Initializing value of rover position
  roverPosition = 21;
  //Initialising frameR
  frameR = 0;
  //Creating Graphics
  //booster_text = createGraphic(200, 200);
  //Initialising roverPositionZ
  roverPositionZ = 21;
  //Initialising roverPositionX
  roverPositionX = 0;
  //Initialising AcknowledgeS to 0[Meaning - game didn't start]
  AcknowledgeS = 0;
}

function draw() {  
  //Console.Log
    //console.log("GameState : " + gameState);
    //console.log("frameR: " + frameR);
    //console.log("Tpos = " + Tpos);
    //console.log("Booster Count Log: " + boostCounter);
    //console.log("roverPosition: " + roverPosition);

  //Setting background - Colour
  background("BLACK");
  //Dashboard Screen
  if(gameState === 0){
    push();
    texture(bg);
    noStroke();
    plane(displayWidth, displayHeight);
    pop();
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

    //OrbitalControl
    orbitControl(1,1,1);
  
    //Defining frameR
    if(keyIsDown(UP_ARROW) && frameCount%1 === 0){
      frameR++;
      //Assigning frameR to moveMag with defined conditions
      moveMag = [-(frameR*15)];
    }

    //M_TerrainD - Properties of terrain - DEFAULT
    //push();
    //scale(6);
    //translate(0,0,0);
    //noStroke();
    //fill(255, 102, 94);
    //texture(img);
    //model(M_Terrain);
    //pop();

    //Calculating terrain positions
    if(frameR > 0 && frameR%220 === 0){
       //Calculating Tposition
       Tpos =  Tpos  - 200;
       Tpos2 = Tpos  - 200;
       Tpos3 = Tpos2 - 200;
       Tpos4 = Tpos3 - 200;
       Tpos5 = Tpos4 - 200;
    };

    //Camera movement
    //Initialising movement when  key "S" is pressed[Aligining camera relative to rover's position]
    if(keyIsDown(83)){
      cam.setPosition(0, 65, [-(frameR*15)]);
      AcknowledgeS = 1;
    }
    //Movement of camera when Up Arrow key is pressed
    if(keyIsDown(UP_ARROW)){
      cam.setPosition(0, 65, [-(frameR*15)]);
      //----//cam.move(0, 0, -4);
    }

    //MarsRover     
    push();
    //Starting the game and changing rover position to its beginning when letter "S" is pressed[Aligigning rover to the  initial camera movement/position]
    if(keyIsDown(83)){
      roverPositionZ = (-60);
      AcknowledgeS = 1;
    }
    push();
    if(keyIsDown(UP_ARROW)){
      roverPositionZ = (roverPositionZ) - 3.75;
    }
    if(keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)){
      roverPositionX = roverPositionX + 0.2; //Right movement
    }
    if(keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)){
      roverPositionX = roverPositionX - 0.2; //Left movement
    }
    scale(4);
    texture(rover);
    noStroke();
    translate(roverPositionX, 23, roverPositionZ);
    plane(25, 19);
    pop();
    pop();
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
       //M_Terrain(n) - Properties of terrain(n)
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
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain1)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain1..
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
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain2)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain2..
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
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain3)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain3..
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
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain4)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain4..
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
       model(M_Terrain);
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
  // //M_Terrain3 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-400);
    // stroke("BLUE");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain4 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-600);
    // stroke("Green");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain5 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-800);
    // stroke("RED");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();
    //   //M_Terrain6 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-1000);
    // stroke(0);
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();
  

    /////
    // //M_TerrainD2 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-200);
    // stroke("Yellow");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain3 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-400);
    // stroke("BLUE");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain4 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-600);
    // stroke("Green");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain5 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-800);
    // stroke("RED");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();
    // //M_Terrain6 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-1000);
    // stroke(0);
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();