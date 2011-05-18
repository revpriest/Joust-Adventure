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
var mapHeightBlocks = mapHeight/64;
var mapWidth=32*64;
var mapWidthBlocks = mapWidth/64;
var showCollision=true;
var screenWidth=800;
var screenHeight=500;
var player=null;
var maxObjInt = 1;

var map = new Array
          ("________________________________",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]                              [",
           "]   x                          [",
           "]    x                         [",
           "]     x                        [",
           "]      x                       [",
           "]       x                      [",
           "]        x                     [",
           "]         x                    [",
           "]        x                     [",
           "]       x                      [",
           "]      x                       [",
           "]     x                        [",
           "]    x                         [",
           "]   x                          [",
           "]  x                           [",
           "]   x                          [",
           "]    x                         [",
           "]     x                        [",
           "]      x                       [",
           "]       x                      [",
           "]        x                     [",
           "]         x                    [",
           "]        x                     [",
           "]       x                      [",
           "]      x                       [",
           "]     x                        [",
           "]    x                         [",
           "]   x                          [",
           "]  x                           [",
           "]   x                          [",
           "]    x                         [",
           "]     x                        [",
           "]      x                       [",
           "]       x                      [",
           "]        x                     [",
           "]         x                    [",
           "]        x                     [",
           "]       x                      [",
           "]      x                       [",
           "]     x                        [",
           "]    x                         [",
           "]   x                          [",
           "]  x                           [",
           "]                              [",
           "]  x                           [",
           "]   x                          [",
           "]    x                         [",
           "]     x                        [",
           "]      x                       [",
           "]       x                      [",
           "]        x                     [",
           "]       x                      [",
           "]      x                       [",
           "]     x                        [",
           "]    x                         [",
           "]   x                          [",
           "]  x         x                 [",
           "]           x                  [",
           "]x         x                   [",
           "]         x                    [",
           "]^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^[",
           "]                              [",
           "]  Secret area.                [",
           "]  I actually have no idea     [",
           "]  why this bit is here.       [",
           "]  120 blocks should be down   [",
           "]  at the bottom, but appears  [",
           "]  to be 8 blocks higher or    [",
           "]  something. It's most odd.   [",
           "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");



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


/******************************************************
* Add an item to the tracker array
*/
addPhysicsItem = function(x){
  physicsItems[this.maxObjInt++]=x;
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




/**************************************************
* Which map-block is at a given location?
*/
function getMapBlockAt(x,y){
  var row = y>>6;
  var col = x>>6;
  if(((col>=0)&&(col<(mapWidthBlocks)))&&
     ((row>=0)&&(row<(mapHeightBlocks)))){
    return map[row].charAt(col);
  }
  return " ";
}


/**********************************************************
* Fill from map. Fill the entire area around an object
* with blocks from the map. That is, create all the objects
* that are within a screen's width of the current position
*/
function fillFromMap(p){
  var n=0;
  for(var y=p.y-screenHeight;y<p.y+screenHeight;y+=64){
    for(var x=p.x-screenWidth;x<p.x+screenWidth;x+=64){
      var block = getMapBlockAt(x,y);
      if(block!=" "){
        px = Math.floor(x)&0xffffffc;
        py = Math.floor(y)&0xffffffc;
        switch(block){
          case 'x': 
             addPhysicsItem(new MapBlock("mapFloor"+maxObjInt,px,py,64,64,"x"));
             break;
          case '^': 
             addPhysicsItem(new MapBlock("mapFloor"+maxObjInt,px,py,64,64,"t"));
             break;
          case '_': 
             addPhysicsItem(new MapBlock("mapFloor"+maxObjInt,px,py,64,64,"b"));
             break;
          case ']': 
             addPhysicsItem(new MapBlock("mapFloor"+maxObjInt,px,py,64,64,"r"));
             break;
          case ']': 
             addPhysicsItem(new MapBlock("mapFloor"+maxObjInt,px,py,64,64,"l"));
             break;
        }
      }
    }
  }
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
  player = physicsItems['player'] = new PlayerItem("player",128,110*64,keyMap);
  fillFromMap(player);
  document.addEventListener('keydown',keyDownHandler,false);
  document.addEventListener('keyup',keyUpHandler,false);
  initCanvas();
  var x = document.getElementById("loading");
  x.innerHTML="Joust Adventures";
  timer = setInterval("runGame()",50);
  return true;
}


