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
var showCollision=false;
var screenWidth=800;
var screenHeight=500;
var player=null;
var maxObjInt = 1;

var map = new Array
          ("                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           " }  }  }            ",
           "<ZZZZZZZZZ>         ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           " }  }   }           ",
           "<ZZZZZZZZZZ>        ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "            {   {   ",
           "         <ZZZZZZZZZ>",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "       {  }         ",
           "     <ZZZZZZ>       ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "            {   {   ",
           "           <ZZZZZZZ>",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "  }  }              ",
           "<ZZZZZZZ>           ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "               {    ",
           "           <ZZZZZZZ>",
           "                    ",
           "                    ",
           "                    ",
           "      {     }       ",
           "      <ZZZZZZ>      ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "          {         ",
           "         <ZZZZZ>    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                 {  ",
           "         <ZZZZZZZZ> ",
           "                    ",
           "                    ",
           "                    ",
           "  }                 ",
           " <ZZZZZZZ>          ",
           "                    ",
           "                    ",
           "                    ",
           "         {    {     ",
           "    <ZZZZZZZZZZ>    ",
           "                    ",
           "                    ",
           "          {         ",
           "         <ZZZZ>     ",
           "                    ",
           "                    ",
           "                    ",
           "    <ZZZZ>          ",
           "                    ",
           "                    ",
           "           }        ",
           "         <ZZZ>      ",
           "                    ",
           "  s   s   s         ",
           "  <ZZZZ>            ",
           "         S          ",
           "                    ",
           "          <ZZZ>     ",
           "                    ",
           "         S          ",
           "     <ZZZ>          ",
           "                    ",
           "                    ",
           "   <ZZZZZZZZ>       ",
           "                    ",
           "                    ",
           "         s          ",
           "<ZZZZZZZZ>          ",
           "    s            l  ",
           "                 ^  ",
           "       S         N  ",
           "           s     N  ",
           "                 N  ",
           "                 N  ",
           "      <ZZZZZZ>   N  ",
           "lp               N  ",
           "<Z>              V  ",
           "                   Q",
           "ZZZZZZZZZZZZZZZZZZZZ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "                    ",
           "ZZZZZZZZZZZZZZZZZZZZ");



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
//  debugPrint("Items:"+n);
  var oldX=cameraX;
  var oldY=cameraY;
  updateCamera();
  addNewMapBlocks(cameraX,cameraY,oldX,oldY);
  deleteDistantObjects(player);
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
  return false;
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
       var m=addPhysicsItem(name,new SentinelItem(name,px<<6,py<<6,1));
       addPhysicsItem(name+"mount",new ParrotItem(name+"mount",px<<6,py<<6,1));
       addPhysicsItem(name+"lance",new LanceItem(name+"lance",px<<6,py<<6,1));
       break;

    case 'S':   //Sentinel - Face Right
       var m=addPhysicsItem(name,new SentinelItem(name,px<<6,py<<6,2));
       addPhysicsItem(name+"mount",new ParrotItem(name+"mount",px<<6,py<<6,2));
       addPhysicsItem(name+"lance",new LanceItem(name+"lance",px<<6,py<<6,2));
       break;

    case '{': //Meanie, hard dude, facing left
       var m=addPhysicsItem(name,new MeanieItem(name,px<<6,py<<6,1));
       addPhysicsItem(name+"mount",new ParrotItem(name+"mount",px<<6,py<<6,1));
       addPhysicsItem(name+"lance",new LanceItem(name+"lance",px<<6,py<<6,1));
       m.sleeping=true;
       break;

    case '}': //Meaning, hard dude, facing right.
       var m = addPhysicsItem(name,new MeanieItem(name,px<<6,py<<6,2));
       addPhysicsItem(name+"mount",new ParrotItem(name+"mount",px<<6,py<<6,2));
       addPhysicsItem(name+"lance",new LanceItem(name+"lance",px<<6,py<<6,2));
       m.sleeping=true;
       break;

    case 'q':   //A Parrot.
       addPhysicsItem(name,new ParrotItem(name,px<<6,py<<6,2));
       break;
    case 'p':   //A parrot
       addPhysicsItem(name,new ParrotItem(name,px<<6,py<<6,1));
       break;

    case 'Q':   //A parrot, sleeping
       var p = addPhysicsItem(name,new ParrotItem(name,px<<6,py<<6,2));
       p.sleeping=true; 
       break;
    case 'P':   //A parrot, sleeping
       var p = addPhysicsItem(name,new ParrotItem(name,px<<6,py<<6,1));
       p.sleeping=true; 
       break;

    case 'l':   //A lance
       addPhysicsItem(name,new LanceItem(name,px<<6,(py<<6)-64,1));
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
function startGame(){
  player = physicsItems['player'] = new PlayerItem("player",280,110*64,keyMap);
  updateCamera();
  fillFromMap();
  document.keydown = function(){
    alert("Key!");
  }
  document.addEventListener('keydown',keyDownHandler,false);
  document.addEventListener('keyup',keyUpHandler,false);
  initCanvas();
  var x = document.getElementById("loading");
  x.innerHTML="Joust Adventures";
  timer = setInterval("runGame()",50);
  return true;
}


