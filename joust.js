/*******************************************************
* Joust Adventure is a work in progress, but ideally
* ends with many nice levels worth of commons hostage
* fun.
*/

var timer=null;
var physicsItems=[];
var keyMap = [];
var cameraX=200;
var cameraY=10;
var mapHeight=120*64;
var mapWidth=32*64;
var showCollision=true;
var screenWidth=800;
var screenHeight=500;
var player=null;

var map = ("xxxxxxxxxxxxxxx",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "x             x",
           "xxxxxxxxxxxxxxx");



/**********************************************
* Print something for debugging.
*/
function debugPrint(s){
  var e = document.getElementById("stringy");
  e.innerHTML = s;
}
function debugAppend(s){
  var e = document.getElementById("stringy");
  e.innerHTML += s;
}



/************************************************************
* The camera looks out over the game, usually following 
* the object called 'player'
*/
function updateCamera(){
  cameraX=player.x-screenWidth/2;
  cameraY=player.y-screenHeight/2;
  if(cameraX<0){cameraX=0;}
  if(cameraX>mapWidth-screenWidth-screenWidth){cameraX=mapWidth-screenWidth-screenWidth;}
  if(cameraY<0){cameraY=0;}
  if(cameraY>mapHeight-screenHeight-screenHeight){cameraY=mapHeight-screenHeight-screenHeight}
  drawBackground(cameraX/2,cameraY/2);
  drawItems();
}



/***********************************************************
* Run Game does one game tick. If it's falling behind 20 
* time a second, we're gonna be slow. So keep the code FAST.
*/
function runGame(){
  for (var i in physicsItems) {
     var item = physicsItems[i];
     item.updatePosition();
     if(item.dying){
       item.dying--;
       if(item.dying==1){
         delete physicsItems[i];
       }
    }
  }
  updateCamera();
  if(showCollision){
    showCollisionLines();
  }
}


/********************************
* Function to get key events
*/
var nextTimeAlert=false;
keyDownHandler = function(e){
  keyMap[e.which]=true;
  if(nextTimeAlert){
    nextTimeAlert=false;
    alert("KeyCode:"+e.which);
  }
  if(e.which==27){
    nextTimeAlert=true;
  }
  if(e.which==67){
    showCollision=!showCollision;
  }
}
keyUpHandler = function(e){
  keyMap[e.which]=false;
}


/*******************************
* Setup the game
*/
function startGame(){
  physicsItems['mapFloor'] = new MapBlock("mapFloor",16*64,113*64-22,33*64,64);
  physicsItems['ai'+1] = new AiItem("ai"+1);
  physicsItems['parrot'+1] = new ParrotItem("parrot"+1,250,100);
  for(n=0;n<5;n++){
    physicsItems['lance'+n] = new LanceItem("lance"+n,Math.floor(Math.random()*4000),1400,keyMap);
  }
  physicsItems['meanie'+1] = new MeanieItem("meanie"+1,140,1400);
  player = physicsItems['player'] = new PlayerItem("player",64,110*64,keyMap);
  document.addEventListener('keydown',keyDownHandler,false);
  document.addEventListener('keyup',keyUpHandler,false);
  initCanvas();
  var x = document.getElementById("loading");
  x.innerHTML="Joust Adventures";
  timer = setInterval("runGame()",50);
  return true;
}


