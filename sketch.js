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

//Texts - Var
var GenralT_1; 
var ARESfont;

//Preload function
function preload(){
  M_Terrain = loadModel("Assets/3d Object/terrain.obj", true);
  rover = loadImage("Assets/Image/rover.gif");
  bg = loadImage("Assets/Image/Sample.webp");
  textureImg = loadImage("Assets/Image/texture1.jpg");
  GenralT_1 = loadFont("Assets/Text/Ares.otf")  //Free commercial license
  ARESfont = loadFont("Assets/Text/Ares.ttf");  //Free commercial license
  controlPanel = loadImage("Assets/Image/controls.png");
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
}

function draw() {  
  //CONSOLE LOG
  console.log("MouseX: " + mouseX);
  console.log("MouseY: " + mouseY);
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

    //Calling createTerrains() function to create the terrains in the game
    createTerrains();
    
    //Text
    push();
    textFont(GenralT_1);
    textAlign(CENTER, CENTER);
    textSize(34);
    fill(100 + sin(frameCount*0.1) * 255);
    text("Press 'C' for controls", 0, -163);
    pop();
    //Text2
    push();
    textFont(GenralT_1);
    textAlign(CENTER, CENTER);
    textSize(34);
    fill(50 + sin(frameCount*0.1) * 255);
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
    if(AcknowledgeS === 0 && keyIsDown(67)){
    noStroke();
    texture(controlPanel);
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
  if(frameR > 0 && frameR%200 === 0){
    //Calculating Tposition
    Tpos =  Tpos  - 200;
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
       noStroke();
       //stroke(219, 101, 101, 0.27);
       //Terrain colour
       fill(255, 102, 94);
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
       texture(textureImg);
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain2)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain2..
       push();
       scale(15);
       translate(0,0,Tpos3);
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
    //M_Terrain(n) - Properties of terrain(n) - BufferTerrain3..
       push();
       scale(15);
       translate(0,0,Tpos5);
       noStroke();
       fill(255, 102, 94);
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

    //DebugModeON
  //debugMode(2100, 10,0 ,0, 0, 200, 0, 0, 0);
  //Camera movement
  //----//cam.move(0, 0, -4);