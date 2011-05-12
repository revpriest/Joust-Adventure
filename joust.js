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
var mapHeight=2000;
var mapWidth=4096;
var showCollision=true;
var screenWidth=800;
var screenHeight=500;
var player=null;

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



/**************************************
* The camera looks out over the game,
* usually following the object called
* 'player'
*/
function updateCamera(){
  var p=null
  if(p=physicsItems['player']){
    cameraX=p.x-250;
    cameraY=p.y-250;
    if(cameraX<0){cameraX=0;}
    if(cameraX>mapWidth-screenWidth-screenWidth){cameraX=mapWidth-screenWidth-screenWidth;}
    if(cameraY<0){cameraY=0;}
    if(cameraY>mapHeight-screenHeight-screenHeight){cameraY=mapHeight-screenHeight-screenHeight}
  }
  drawBackground(cameraX/2,cameraY/2);
  drawItems();
}



/*******************************
* Run Game does one game tick.
* If it's falling behind 20 
* time a second, we're gonna be
* slow. So keep the code FAST.
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
  for(n=0;n<50;n++){
    physicsItems['mapBlock'+n] = new MapBlock("mapBlock"+n,Math.floor(Math.random()*4000),Math.floor(Math.random()*1514),180,30);
  }
  physicsItems['mapFloor'] = new MapBlock("mapFloor",2000,1514,4000,30);
  physicsItems['ai'+1] = new AiItem("ai"+1);
  physicsItems['parrot'+1] = new ParrotItem("parrot"+1,250,100);
  physicsItems['parrot'+2] = new ParrotItem("parrot"+2);
  physicsItems['parrot'+3] = new ParrotItem("parrot"+3);
  physicsItems['parrot'+4] = new ParrotItem("parrot"+4);
  for(n=0;n<5;n++){
    physicsItems['lance'+n] = new LanceItem("lance"+n,Math.floor(Math.random()*4000),1400,keyMap);
  }
  player = physicsItems['player'] = new PlayerItem("player",100,1400,keyMap);
  document.addEventListener('keydown',keyDownHandler,false);
  document.addEventListener('keyup',keyUpHandler,false);
  initCanvas();
  var x = document.getElementById("loading");
  x.innerHTML="Joust Adventures";
  timer = setInterval("runGame()",50);
  return true;
}


