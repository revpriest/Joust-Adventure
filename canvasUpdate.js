/************************************************
* All the things we need to update the canvas and
* make the pictures.
*/

var gameCanvas=null;
var gameCanvasContext = null;
var lanceLeft = null;
var lanceRight = null;
function initCanvas(){
  lanceLeft = document.getElementById("LanceL");
  lanceRight = document.getElementById("LanceR");
  gameCanvas = document.getElementById('gameCanvas');
  gameCanvasContext = gameCanvas.getContext('2d');
  gameBackground = document.getElementById('background');
}


function drawItems(){
  for (var i in physicsItems){
    var item = physicsItems[i];
    if(item.background){
      drawItem(item)
    }
  }
  for (var i in physicsItems){
    var item = physicsItems[i];
    if(!item.background){
      drawItem(item)
    }
  }
}

function drawGraphic(g,x,y){
  gameCanvasContext.drawImage(g,x,y);
}

function drawItem(i){
   try{
     if(i.pilot==undefined||i.pilot==null){     //Don't draw it if it's being ridden. We'll draw it with the rider.
       if(i.flying!=null){
         //If it's flying something, draw that, then this, then the wings.
         if(i.gotLance){
           if((i.dx<0)||((i.dx==0)&&(i.faceDirection==i.faceDirectionLeft))){
             gameCanvasContext.drawImage(lanceLeft, i.x-cameraX-100, i.y-5-cameraY);   
           }else{
             gameCanvasContext.drawImage(lanceRight, i.x-cameraX-50, i.y-5-cameraY);   
           }
         }
         gameCanvasContext.drawImage(i.flying.graphic, 
                                     i.flying.x-i.flying.halfWidth-i.flying.graphicsOffsetX-cameraX, 
                                     i.flying.y-i.flying.halfHeight-i.flying.graphicsOffsetY-cameraY);
         gameCanvasContext.drawImage(i.graphic, i.x-i.halfWidth-i.graphicsOffsetX-cameraX, i.y-i.halfHeight-i.graphicsOffsetY-cameraY);   
         gameCanvasContext.drawImage(i.flying.wingGraphic,
                                     i.flying.x-i.flying.halfWidth-i.flying.graphicsOffsetX-cameraX, 
                                     i.flying.y-i.flying.halfHeight-i.flying.graphicsOffsetY-cameraY);   
       }else{
         //Otherwise just draw.
         gameCanvasContext.drawImage(i.graphic, i.x-i.halfWidth-i.graphicsOffsetX-cameraX, i.y-i.halfHeight-i.graphicsOffsetY-cameraY);   
       }
     }
   }catch(e){
   }
}


function drawBackground(x,y){
   try{
     gameCanvasContext.drawImage(gameBackground, x,y,screenWidth,screenHeight,0,0,screenWidth,screenHeight);
   }catch(e){
   }
}


function showCollisionLinesForItem(i){
  gameCanvasContext.strokeStyle="#0000ff";
  gameCanvasContext.beginPath();
  gameCanvasContext.moveTo(i.x-i.halfWidth-cameraX,i.y-i.halfHeight-cameraY);
  gameCanvasContext.lineTo(i.x+i.halfWidth-cameraX,i.y-i.halfHeight-cameraY);
  gameCanvasContext.lineTo(i.x+i.halfWidth-cameraX,i.y+i.halfHeight-cameraY);
  gameCanvasContext.lineTo(i.x-i.halfWidth-cameraX,i.y+i.halfHeight-cameraY);
  gameCanvasContext.lineTo(i.x-i.halfWidth-cameraX,i.y-i.halfHeight-cameraY);
  gameCanvasContext.stroke();
  gameCanvasContext.strokeStyle="#00ff00";
  if(i.solidTop){
    gameCanvasContext.beginPath();
    gameCanvasContext.moveTo(i.x-i.halfWidth-cameraX,i.y-i.halfHeight-cameraY);
    gameCanvasContext.lineTo(i.x+i.halfWidth-cameraX,i.y-i.halfHeight-cameraY);
    gameCanvasContext.stroke();
  }
  if(i.solidBottom){
    gameCanvasContext.beginPath();
    gameCanvasContext.moveTo(i.x-i.halfWidth-cameraX,i.y+i.halfHeight-cameraY);
    gameCanvasContext.lineTo(i.x+i.halfWidth-cameraX,i.y+i.halfHeight-cameraY);
    gameCanvasContext.stroke();
  }
  if(i.solidLeft){
    gameCanvasContext.beginPath();
    gameCanvasContext.moveTo(i.x-i.halfWidth-cameraX,i.y-i.halfHeight-cameraY);
    gameCanvasContext.lineTo(i.x-i.halfWidth-cameraX,i.y+i.halfHeight-cameraY);
    gameCanvasContext.stroke();
  }
  if(i.solidRight){
    gameCanvasContext.beginPath();
    gameCanvasContext.moveTo(i.x+i.halfWidth-cameraX,i.y-i.halfHeight-cameraY);
    gameCanvasContext.lineTo(i.x+i.halfWidth-cameraX,i.y+i.halfHeight-cameraY);
    gameCanvasContext.stroke();
  }
  if(i.deadlyBox){
    gameCanvasContext.strokeStyle="#ff0000";
    gameCanvasContext.beginPath();
    gameCanvasContext.moveTo(i.x+i.deadlyBox.x1-cameraX,i.y+i.deadlyBox.y1-cameraY);
    gameCanvasContext.lineTo(i.x+i.deadlyBox.x1-cameraX,i.y+i.deadlyBox.y2-cameraY);
    gameCanvasContext.lineTo(i.x+i.deadlyBox.x2-cameraX,i.y+i.deadlyBox.y2-cameraY);
    gameCanvasContext.lineTo(i.x+i.deadlyBox.x2-cameraX,i.y+i.deadlyBox.y1-cameraY);
    gameCanvasContext.lineTo(i.x+i.deadlyBox.x1-cameraX,i.y+i.deadlyBox.y1-cameraY);
    gameCanvasContext.stroke();
  }
}


function showCollisionLines(){
  for (var i in physicsItems){
    var item = physicsItems[i];
    showCollisionLinesForItem(item)
  }
}
