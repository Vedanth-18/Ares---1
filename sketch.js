//Obstacles, Sounnd, Booster
//Game variables
var gameState; //Gamestate is to change the initial 2d dashboard to 3d environment and back to 2d plane at game end
var cam; //Creating camera for the 3d workspace
var rover; //Var to load rover GIF.
var bg; //Var to load dashboard background GIF.
var canvas3d; //Var to create the 3d WEBGL canvas
var roverPositionZ; //Var to assign rover position over Z axis
var roverPositionX; //Var to assign rover position over X axis
var controlsPanel; //Var to load the controls icon image
var ob1; //Position of obstacles
var ob2; //Position of obstacles
var ob3; //Position of obstacles
var ob4; //Position of obstacles
var ob5; //Position of obstacles
var ob6; //Position of obstacles
var ob7; //Position of obstacles
var ob8; //Position of obstacles
var ob9; //Position of obstacles
var ob10; //Position of obstacles
var model2; //Var to load obstacle model
var mx1; //Var to assign X position of obstacles
var mx2; //Var to assign X position of obstacles
var mx3; //Var to assign X position of obstacles
var mx4; //Var to assign X position of obstacles
var mx5; //Var to assign X position of obstacles
var mx6; //Var to assign X position of obstacles
var mx7; //Var to assign X position of obstacles
var mx8; //Var to assign X position of obstacles
var mx9; //Var to assign X position of obstacles
var mx10; //Var to assign X position of obstacles
const modelArray = [mx1, mx2, mx3, mx4, mx5, mx6, mx7, mx8, mx8, mx9, mx10]; //Array to add in the position/the models as a whole, to get (i).

var rand3; //Testing purpose

//Terrain Assests - Vars
var M_Terrain; //Var to import 3d terrain model as obj object
var textureImg; //Var to aplly texture for the terrain
var textureImg2;
//Terrain Creation - Vars
var frameR; //Specialised Counting system for creating terrain synchronously with regard frameCount..
var Tpos; //Var to calculate terrain position(z-axis) of successive terrains
var Tpos2 = -200; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos3 = -400; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos4 = -600; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos5 = -800; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var AcknowledgeS; //Variable to acknowledge the beginning of game[AcknowlegeS = 0, before game starts. AcknowledgeS = 1, to mark the start of the game].

//Texts - Var
var GenralT_1; 
var ARESfont;

//Preload function
function preload(){
  M_Terrain = loadModel("Assets/3d Object/terrain.obj", true);
  rover = loadImage("Assets/Image/rover.gif");
  bg = loadImage("Assets/Image/Ares.webp");
  textureImg = loadImage("Assets/Image/texture1.jpg");
  textureImg2 = loadImage("Assets/Image/texture2.jpg");
  GenralT_1 = loadFont("Assets/Text/Ares.otf")  //Free commercial license
  ARESfont = loadFont("Assets/Text/Ares.ttf");  //Free commercial license
  controlsPanel = loadImage("Assets/Image/controls.jpg");
  model2 = loadModel("Assets/3d Object/barricade.obj");
  //model2 = loadModel("Assets/3d Object/T2.obj");
}

//Setup function
function setup() {
  //Initialiasing gamestate
  gameState = 0;
  //CreatingCanvas - WEBGL Mode
  canvas3d = createCanvas(displayWidth, displayHeight, WEBGL);
  //Cam
  cam = createCamera(0, 0, 0);   
  //Initializing value of rover position
  roverPosition = 21;
  //Initialising frameR
  frameR = 0;
  //Initialising roverPositionZ
  roverPositionZ = 21;
  //Initialising roverPositionX
  roverPositionX = 0;
  //Initialising AcknowledgeS to 0[Meaning - game didn't start]
  AcknowledgeS = 0;
  //Initialising object position
  ob1 = -5;
  //Initialising X positions of the obstacles
  mx1 = 40; 
  mx2 = 24;
  mx3 = -1;
  mx4 = 20;
  mx5 = -4;
  mx6 = 15; 
  mx7 = -3;
  mx8 = 23;
  mx9 = 0;
  mx10 = 0;

  //Defining Terrain Position
  Tpos = 0;
}

function draw() {  
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
    //Smooth
    smooth();

    //orbitControl
    orbitControl();

    //Calling spawnObstacles() function to spawn the obstacles on the terrain
    spawnObstacles();

    //Calling createTerrains() function to create the terrains in the game
    createTerrains();

    //Text
    push();
    textFont(GenralT_1);
    textAlign(CENTER, CENTER);
    textSize(34);
    fill(100 + sin(frameCount*0.06) * 255);
    text("Hold on letter 'C' for controls", 0, -163);
    pop();
    //Text2
    push();
    textFont(GenralT_1);
    textAlign(CENTER, CENTER);
    textSize(34);
    fill(50 + sin(frameCount*0.06) * 255);
    text("Press 'S' to start", 0, -125);
    pop();
    //MainText
    push();
    textFont(ARESfont);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("A  R  E  S", 0, -250);
    pop();

    //Defining frameR
    if(keyIsDown(UP_ARROW) && frameCount%1 === 0 && AcknowledgeS === 1){
      frameR++;
    }
    //console.log("FrameR: " + frameR);
    //Camera movement
    //Initialising movement when  key "S" is pressed[Aligining camera relative to rover's position]
    if(keyIsDown(83) && AcknowledgeS === 0){
      cam.setPosition(0, 65, [-(frameR*15)]);
    }
    //Movement of camera when Up Arrow key is pressed
    if(keyIsDown(UP_ARROW) && AcknowledgeS === 1){
      cam.setPosition(0, 65, [-(frameR*15)]);
    }
    //MarsRover     
    push();
    //Starting the game and changing rover position to its beginning when letter "S" is pressed[Aligigning rover to the  initial camera movement/position]
    if(keyIsDown(83) && AcknowledgeS === 0){
      //roverPositionZ = 0;
      roverPositionZ = (-60);
      AcknowledgeS = 1;
    }
    push();
    if(keyIsDown(UP_ARROW) && AcknowledgeS === 1){
      roverPositionZ = (roverPositionZ) - 3.75;
    }
    if(keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW) && AcknowledgeS === 1 && roverPositionX<55){
      roverPositionX = roverPositionX + 0.2; //Right movement
    }
    if(keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW) && AcknowledgeS === 1 && roverPositionX>(-55)){
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
    //Movement Controls - Panel
    if(keyIsDown(67)){  //Shows up when the key "C" is pressed
    noStroke();
    texture(controlsPanel);
    translate(0, 0, 300);
    plane(400, 300);
    }
}

//MousePressed function - Change gameState
function mousePressed(){
    console.log("Pressed")
    gameState = 1;
}

//Terrain creation function - Called in main();
function createTerrains(){
  //Calculating terrain positions
  if(frameR > 0 && frameR%350 === 0){
    //Calculating Tposition
    Tpos =  Tpos  - 340;
    //console.log("Tpos: " + Tpos);
    Tpos2 = Tpos  - 200;
    Tpos3 = Tpos2 - 200;
    Tpos4 = Tpos3 - 200;
    Tpos5 = Tpos4 - 200;
    
 }

 //Terrain creation(MainTerrain)
       //M_Terrain(n) - Properties of terrain(n)
       push();
       //Describing the size of the terrain
       scale(15);
       //Assigning position to the terrain(z-axis position) - To appear like being continous
       translate(0,0,Tpos);
       //Removing strokes on the terrain to make it look plain
       //fill("YELLOW");
       //stroke("BLACK");
       noStroke();
       //Applying mars like texture to the 3d model
       texture(textureImg);
       //Loading terrain model..
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain1)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain1..
       push();
       scale(15);
       translate(0,0,Tpos2);
       noStroke();
       //fill("RED");
       //stroke("BLACK");
       texture(textureImg);
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain2)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain2..
       push();
       scale(15);
       translate(0,0,Tpos3);
       //fill("BLUE");
       //stroke("BLACK");
       noStroke();
       texture(textureImg);
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain3)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain3..
       push();
       scale(15);
       translate(0,0,Tpos4);
       noStroke();
       texture(textureImg);
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain4)
    //M_Terrain(n) - Properties of terrain(n) - BufferTerrain4..
       push();
       scale(15);
       translate(0,0,Tpos5);
       noStroke();
       fill(255, 102, 94);
       texture(textureImg);
       model(M_Terrain);
       pop();

       
}

//Function for Spawing the obstacles around on the terrain
 function spawnObstacles(){
   if(frameR > 0 && frameR%370 === 0){
     //console.log("Tpos2: " + Tpos);
    //Calculating object position
    ob1 = ob1 - 340;
  }
    ob2 = ob1 - 96;
    ob3 = ob2 - 96;
    ob4 = ob3 - 96;
    ob5 = ob4 - 96;
    ob6 = ob5 - 96;
    ob7 = ob6 - 96;
    ob8 = ob7 - 96;
    ob9 = ob8 - 96;
    ob10 = ob9- 96;
   
    //console.log("ob1: " + ob1);
    //console.log("Tpos; " + Tpos);
   //var ratio = ob1/frameR;
   //console.log("ob1: " + ob1);
   //console.log("Ratio: " + ratio)
   //console.log("frameR: " + frameR);
  
if(frameR>0 && frameR%140 === 0){
  mx1 = (random(-4, 27)); 
  mx2 = (random(10, 22));
  mx3 = (random(-4, 6));
  mx4 = (random(-1, 20));
  mx5 = (random(-4, 18));
  mx6 = (random(10, 22)); 
  mx7 = (random(0, 27));
  mx8 = (random(0, 27));
  mx9 = (random(-2, 27));
  mx10 = (random(1, 27));
}

 //console.log("Length: " + modelArray.length);
//for(var i = 0; i<1; i++){
  push();
  scale(15);
  fill("WHITE");
  translate(mx1, 17.9, ob1);
  noStroke();
  //texture(textureImg);
  model(model2);
  pop();
 
  push();
  scale(15);
  //fill("WHITE");
  translate(mx2, 17.9, ob2);
  noStroke();
  //texture(textureImg);
  model(model2);
  pop();
 
  push();
  scale(15);
  fill("WHITE");
  noStroke();
  translate(mx3, 17.9, ob3);
  model(model2);
  pop();
 
  push();
  scale(15);
  fill("WHITE");
  noStroke();
  translate(mx4, 17.9, ob4);
  model(model2);
  pop();
 
  push();
  scale(15);
  fill("WHITE");
  noStroke();
  translate(mx5, 17.9, ob5);
  model(model2);
  pop();

  push();
  scale(15);
  fill("WHITE");
  noStroke();
  translate(mx6, 17.9, ob6);
  model(model2);
  pop();

  push();
  scale(15);
  fill("WHITE");
  noStroke();
  translate(mx7, 17.9, ob7);
  model(model2);
  pop();

  push();
  scale(15);
  fill("WHITE");
  noStroke();
  translate(mx8, 17.9, ob8);
  model(model2);
  pop();

  push();
  scale(15);
  fill("WHITE");
  noStroke();
  translate(mx9, 17.9, ob9);
  model(model2);
  pop();

  push();
  scale(15);
  fill("WHITE");
  noStroke();
  translate(mx10, 17.9, ob10);
  model(model2);
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

    //DebugModeON
  //debugMode(2100, 10,0 ,0, 0, 200, 0, 0, 0);
  //Camera movement

  //Spawning boosters
// function boosterSpawn(){
//   if(AcknowledgeS === 1){
//     translate(random(-55, 55), random(Tpos, Tpos3), 0);
//     plane(100, 100);
//   }
// }
// function trial(){
//   ob1 = -200;
//   ob2 = ob1 - 250;
//   ob3 = ob2 - 250;
//   ob4 = ob3 - 250;
//   ob5 = ob4 - 250;
//   //
//   push();
//   translate(0, -20, ob1);
//   fill("WHITE");
//   plane(25, 19);
//   pop();

//   push();
//   translate(0, -20, ob2);
//   fill("WHITE");
//   plane(25, 19);
//   pop();

//   push();
//   translate(0, -20, ob3);
//   fill("WHITE");
//   plane(25, 19);
//   pop();

//   push();
//   translate(0, -20, ob4);
//   fill("WHITE");
//   plane(25, 19);
//   pop();

//   push();
//   translate(0, -20, ob5);
//   fill("WHITE");
//   plane(25, 19);
//   pop();
  
// }
  




///.....................EXTRA TERRAINS........................//
//Terrain creation(BufferTerrain5)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain5..
       //push();
       //scale(15);
       //translate(0,0,Tpos6);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop(); 
//
       ////Terrain creation(BufferTerrain6)
       ////M_Terrain(n) - Properties of terrain(n) - BufferTerrain6..
       //push();
       //scale(15);
       //translate(0,0,Tpos7);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain7)
       ////M_Terrain(n) - Properties of terrain(n) - BufferTerrain7..
       //push();
       //scale(15);
       //translate(0,0,Tpos8);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain7)
       ////M_Terrain(n) - Properties of terrain(n) - BufferTerrain8..
       //push();
       //scale(15);
       //translate(0,0,Tpos9);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain9)
       ////M_Terrain(n) - Properties of terrain(n) - BufferTerrain9..
       //push();
       //scale(15);
       //translate(0,0,Tpos10);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop();
       ////////////INITIALISATION CODE...........
       //Tpos6 = Tpos5 - 200;
    //Tpos7 = Tpos6 - 200;
    //Tpos8 = Tpos7 - 200;
    //Tpos9 = Tpos + 200;
    //Tpos10 = Tpos9 + 200;
    ////
    // var Tpos6 = -1000; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
// var Tpos7 = -1200;
// var Tpos8 = -1400;
// var Tpos9 = 200;
// var Tpos10 = 400;
///////////////.........................../////////////////////////