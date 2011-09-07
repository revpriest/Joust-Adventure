/*******************************************************
* Joust Adventure is a work in progress, but ideally
* ends with many nice levels worth of commons hostage
* fun.
*/
var nextLevel = "level2.php";
var timer=null;
var physicsItems=[];
var keyMap = [];
var cameraX=200;
var cameraY=10;
var mapHeight=120*64;
var mapHeightBlocks = mapHeight/64;
var mapWidth=32*64;
var mapWidthBlocks = mapWidth/64;
var showCollision=false;
var screenWidth=800;
var screenHeight=500;
var player=null;
var bigBad = null;
var girlfriend = null;
var maxObjInt = 1;
var pi = PhysicsItem.prototype;
var frameNumber=0;
var levelComplete=-1;
var levelCompleteParticleSpeed = 3;
var gamePaused = true;
var debug = false;
var completePercent = 0;

if(location.search=="?debug=true"){
  debug=true;
}

var map = new Array
          ("                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           " } s                ",
           "<ZZZZZZ>        ^   ",
           " l              N   ",
           "                N   ",
           "    s           N   ",
           "                N   ",
           " s    p         N   ",
           "<ZZZZZZ>        N   ",
           "                N   ",
           "                N   ",
           "    s           V  {",
           "                <ZZZ",
           "                    ",
           " p                  ",
           "           lS     Q ",
           "         <ZZZZZZZZZ>",
           "                    ",
           "                    ",
           "          s         ",
           "                  l ",
           "      Ps l          ",
           "  S  <ZZZZZZ>       ",
           "         N          ",
           "    l    V          ",
           "    ^               ",
           "    N               ",
           "    N           S   ",
           "    N         l   Q ",
           "p   N      <ZZZZZZZ>",
           "    N               ",
           "    N               ",
           "    V               ",
           "                    ",
           "                    ",
           "l      S            ",
           "<ZZZZZZZ>           ",
           "                    ",
           "                    ",
           " s                  ",
           "                    ",
           "            l  s  Q ",
           "           <ZZZZZZZ>",
           "                    ",
           "    <Z>             ",
           "      s             ",
           "          l  s      ",
           "   l     <ZZZ>      ",
           "   ^p               ",
           "   N                ",
           "   N  s             ",
           "   N       S        ",
           "   N         pl     ",
           "   N     <ZZZZZ>    ",
           "   N                ",
           "   N                ",
           "   V       p        ",
           "                    ",
           "                 s  ",
           "         <ZZZZZZZZ> ",
           "  s                 ",
           "        q           ",
           "                    ",
           " Ps                 ",
           " <ZZZZZZZ>          ",
           "           S        ",
           "                    ",
           "              S     ",
           "                    ",
           "    <ZZZZZZZZZZ>    ",
           "                    ",
           "p                   ",
           "ZZ>       s  lp     ",
           "         <ZZZZ>     ",
           "                    ",
           "    p  l            ",
           "    <ZZZZ>          ",
           "         s          ",
           "                    ",
           "         ^          ",
           "         N Sl       ",
           "     <ZZZNZZZ>      ",
           "         N          ",
           "  s l    Ns         ",
           "         N          ",
           "         N         p",
           "      s  N     <ZZZZ",
           "         N          ",
           "         N          ",
           "    p    N          ",
           "         V          ",
           "                    ",
           "                    ",
           "   <ZZZZZZZZ>       ",
           "                    ",
           "                    ",
           "    p    s          ",
           "<ZZZZZZZZ>          ",
           "    s            l  ",
           "       S         ^  ",
           "                 N  ",
           "              s  N  ",
           "                 N  ",
           "                 N  ",
           "      <ZZZZZZ>   N  ",
           "lq               N  ",
           "<Z>              V  ",
           "                   Q",
           "ZZZZZZZZZZZZZZZZZZZ>",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "<ZZZZZZZZZZZZZZZZZZ>");



/**********************************************
* Print something for debugging.
*/
function textOut(s){
  var e = document.getElementById("stringy");
  e.innerHTML = s;
}
function completeText(s){
  var e = document.getElementById("complete");
  e.innerHTML = s;
}


/******************************************************
* Add an item to the tracker array
*/
addPhysicsItem = function(name,x){
  if(name==null){
    name="newItem"+(maxObjInt++);
  }
  physicsItems[name]=x;
  return x;
}

/************************************************************
* The camera looks out over the game, usually following 
* the object called 'player'
*/
function updateCamera(){
  cameraX=Math.floor(player.x-screenWidth/2);
  cameraY=Math.floor(player.y-screenHeight/2);
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
  if(!gamePaused){
    frameNumber++;
    var n=0;
    for (var i in physicsItems){
       var item = physicsItems[i];
       item.updatePosition();
       if(item.dying){
         item.dying--;
         if(item.dying==1){
           delete physicsItems[i];
         }
      }
      n++;
    }
  }
  checkForLevelEnd();
  var oldX=cameraX;
  var oldY=cameraY;
  updateCamera();
  addNewMapBlocks(cameraX,cameraY,oldX,oldY);
  deleteDistantObjects(player);
  if(showCollision){
    showCollisionLines();
  }
  if(gamePaused){
    //Draw a "Click To Play" graphic somewhere
    drawGraphic(document.getElementById("clickToPlay"),screenWidth/2-230,screenHeight/2-35);
  }
}


/*************************************************
* Check for the level end. If it's all over, dance
* or flash or animate or something.
*/
function checkForLevelEnd(){
  if((levelComplete>-1) && (levelComplete<frameNumber-50)){
    textOut("Click To Continue");
  }
  if(levelComplete>-1){
    completeText("100% complete");
    if(frameNumber%levelCompleteParticleSpeed==0){
      name=this.name+(new Date).getTime()+"LC";
      addPhysicsItem (name, new ParticleItem(name,cameraX+screenWidth/2-110,cameraY+screenHeight/2,this.faceDirection,"levelComplete")).background=false;
    }
  }else{
    var currentComplete = Math.floor((((111*64+11-150)-(player.y-150))/(111*64+11-150))*100);
    if(currentComplete>99){currentComplete=99;}
    if(currentComplete>completePercent){completePercent=currentComplete};
    completeText(""+completePercent+"% complete");
    if(player){
      if(player.y<150){
        if(girlfriend.distanceTo(player)<200){
          levelComplete=frameNumber;
        } 
      }
    }
  }
}


/********************************
* Function to get key events
*/
var nextTimePrint=false;
keyDownHandler = function(e){
  keyMap[e.which]=true;
  if(e.which==67){
    showCollision=!showCollision;
  }
  if(e.which==32){
    gamePaused = !gamePaused;
  }
  if(debug){
    if(nextTimePrint){
      nextTimePrint=false;
      if(e.which==27){
        textOut("");
      }else{
        textOut("KeyCode:"+e.which);
      }
    }else if(e.which==27){
      nextTimePrint=true;
    }
    //Cheat Keys!
    if(e.which==68){
      //CHEAT! Warp to the top.
      player.x = 50;
      player.y = 50;
      bigBad.y=100;
      updateCamera();
      fillFromMap();
    }
    if(e.which==69){
      //CHEAT! Warp to the Girlfriend.
      player.x = girlfriend.x
      player.y = girlfriend.y;
      updateCamera();
      fillFromMap();
    }
    if(e.which==70){
      //CHEAT! Warp to the Bottom again.
      player.x = 280;
      player.y = 111*64;
      updateCamera();
      fillFromMap();
    }
  }
}

keyUpHandler = function(e){
  keyMap[e.which]=false;
}
mouseDownHandler = function(e){
  if(e.target == document.getElementById("gameCanvas")){
    gamePaused = !gamePaused;
    if(levelComplete>-1){
      document.location = nextLevel;
    }
  }else{
    gamePaused = true;
  }
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



/***************************************************
* Add a map block at a given location. This is what
* determines which chars in the map correspond to 
* which items in the game
*
* x = Block with all four collision edges
* ] = Block collision edge right
* [ = Block collision edge left
* ^ = Block collision edge top
* _ = Block collision edge bottom
* z = Block with collision top and bottom
* < = Block with collision left, top and bottom
* > = Block with collision right, top and bottom
* p = Parrot moving right
* q = Parrot moving left
* l = Lance
* P = Parrot facing right, sleeping.
* Q = Parrot facing left, sleeping.
* 
* Not done yet:
* } = Mounted rider facing right
* { = Mounted rider facing left
*/
function addMapBlock(block,x,y){
  if(block==" "){return;}               //No block for spaces.
  px = x>>6;
  py = y>>6;
  var name = "map"+px+","+py;
  if(physicsItems[name]!=null){return;}  //it's already there
  switch(block){
    case 'x': 
    case '<': 
    case 'Z': 
    case '>': 
    case '^': 
    case 'N': 
    case 'V':   //Map Blocks
       addPhysicsItem(name,new MapBlock(name,px<<6,py<<6,64,64,block));
       break;

    case 's':   //Sentinel - Face Left
       var m=addPhysicsItem(name,new SentinelItem(name,px<<6,py<<6,pi.faceDirectionLeft));
       addPhysicsItem(name+"mount",new ParrotItem(name+"mount",px<<6,py<<6,pi.faceDirectionLeft));
       m.getLance();
       break;

    case 'S':   //Sentinel - Face Right
       var m=addPhysicsItem(name,new SentinelItem(name,px<<6,py<<6,pi.faceDirectionRight));
       addPhysicsItem(name+"mount",new ParrotItem(name+"mount",px<<6,py<<6,pi.faceDirectionRight));
       m.getLance();
       break;

    case '{': //Meanie, hard dude, facing left
       var m=addPhysicsItem(name,new MeanieItem(name,px<<6,py<<6,pi.faceDirectionLeft));
       addPhysicsItem(name+"mount",new ParrotItem(name+"mount",px<<6,py<<6,pi.faceDirectionLeft));
       m.sleeping=true;
       m.getLance();
       break;

    case '}': //Meaning, hard dude, facing right.
       var m = addPhysicsItem(name,new MeanieItem(name,px<<6,py<<6,pi.faceDirectionRight));
       addPhysicsItem(name+"mount",new ParrotItem(name+"mount",px<<6,py<<6,pi.faceDirectionRight));
       m.sleeping=true;
       m.getLance();
       break;

    case 'q':   //A Parrot.
       addPhysicsItem(name,new ParrotItem(name,px<<6,py<<6,pi.faceDirectionLeft));
       break;
    case 'p':   //A parrot
       addPhysicsItem(name,new ParrotItem(name,px<<6,py<<6,pi.faceDirectionRight));
       break;

    case 'Q':   //A parrot, sleeping
       var p = addPhysicsItem(name,new ParrotItem(name,px<<6,py<<6,pi.faceDirectionLeft));
       p.sleeping=true; 
       break;
    case 'P':   //A parrot, sleeping
       var p = addPhysicsItem(name,new ParrotItem(name,px<<6,py<<6,PhysicsItems.faceDirectionRight));
       p.sleeping=true; 
       break;


    case 'l':   //A lance
       addPhysicsItem(name,new LanceItem(name,px<<6,(py<<6)-64,0));
       break;
        
  }
}





/**********************************************************
* Delete objects if they're too far from the camera. They'll
* be regenerated if the map goes near their initial thing
*/
function deleteDistantObjects(p){
  for (var i in physicsItems){
     var item = physicsItems[i];
     if(item.neverRemove){
       //Don't remove it, duh
     }else{
       if(item.x<p.x-screenWidth*2){
         delete physicsItems[i];
       }else if(item.x>p.x+screenWidth*2){
         delete physicsItems[i];
       }else if(item.y<p.y-screenHeight*2){
         delete physicsItems[i];
       }else if(item.y>p.y+screenHeight*2){
         delete physicsItems[i];
       }
    }
  }
  
}






/**********************************************************
* Fill from map. Fill the entire area around an object
* with blocks from the map. That is, create all the objects
* that are within a screen's width of the current position
*/
function fillFromMap(){
  var cx=cameraX+screenWidth/2;
  var cy=cameraY+screenHeight/2;
  for(var y=cy-screenHeight;y<=cy+screenHeight;y+=64){
    for(var x=cx-screenWidth;x<=cx+screenWidth;x+=64){
      var block = getMapBlockAt(x,y);
      addMapBlock(block,x,y);
    }
  }
}


/*******************************************************
* Add new blocks at the edge of the map as we move.
* Passed the current camera pos, and the post last
* time we ran. 
*/
function addNewMapBlocks(cx,cy,ox,oy){
  cx+=screenWidth/2;
  cy+=screenHeight/2;
  ox+=screenWidth/2;
  oy+=screenHeight/2;
  bcx=cx>>6;
  bcy=cy>>6;
  box=ox>>6;
  boy=oy>>6;
  var bdx=bcx-box;
  var bdy=bcy-boy;
  if(bdx>0){
    //Add a new line to the right
    var x=cx+screenWidth/2+128;
    for(n=0;n<2;n++){
      for(var y=cy-screenHeight;y<cy+screenHeight;y+=64){
        var block = getMapBlockAt(x,y);
        addMapBlock(block,x,y);
      }
      x-=64;
    }
  }else if(bdx<0){
    //Add a new line to the left
    var x=cx-screenWidth/2-128;
    for(n=0;n<2;n++){
      for(var y=cy-screenHeight;y<cy+screenHeight;y+=64){
        var block = getMapBlockAt(x,y);
        addMapBlock(block,x,y);
      }
      x+=64;
    } 
  }
  if(bdy>0){
    //Add a new line to the bottom
    var y=cy+screenHeight/2+128;
    for(n=0;n<2;n++){
      for(var x=cx-screenWidth;x<cx+screenWidth;x+=64){
        var block = getMapBlockAt(x,y);
        addMapBlock(block,x,y);
      }
      y-=64;
    }
  }else if(bdy<0){
    //Add a new line to the top
    var y=cy-screenHeight/2-128;
    for(n=0;n<2;n++){
      for(var x=cx-screenWidth;x<cx+screenWidth;x+=64){
        var block = getMapBlockAt(x,y);
        addMapBlock(block,x,y);
      }
      y+=64;
    }
  }
}






/*******************************
* Setup the game
*/
function start(){
  //Stop keys scrolling the page.
  document.onkeydown = function(e) {
    var k = e.keyCode;
    if(!gamePaused){
      if(k >= 37 && k <= 40) {
          return false;
      }
    }
    if(k == 32) {
        return false;
    }
  }
  player = addPhysicsItem('player',new PlayerItem("player",280,111*64+11,keyMap,pi.faceDirectionRight));
  girlfriend = addPhysicsItem('girlfriend',new GirlfriendItem('girlfriend',330,111*64+11,pi.faceDirectionLeft));
  bigBad = addPhysicsItem('bigbad',new BigBadItem('bigbad',30,103*64,pi.faceDirectionRight));
  updateCamera();
  fillFromMap();
  document.addEventListener('keydown',keyDownHandler,false);
  document.addEventListener('keyup',keyUpHandler,false);
  document.addEventListener('mousedown',mouseDownHandler,false);
  initCanvas();
  var x = document.getElementById("loading");
  x.innerHTML="Joust";
  timer = setInterval("runGame()",50);
  return true;
}


