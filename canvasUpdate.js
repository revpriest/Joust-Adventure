/************************************************
* All the things we need to update the canvas and
* make the pictures.
*/

var gameCanvas=null;
var gameCanvasContext = null;
function initCanvas(){
  gameCanvas = document.getElementById('gameCanvas');
  gameCanvasContext = gameCanvas.getContext('2d');
  gameBackground = document.getElementById('background');
}


function drawItems(){
  for (var i in physicsItems) {
    var item = physicsItems[i];
    drawItem(item)
  }
}


function drawItem(i){
   try{
     gameCanvasContext.drawImage(i.graphic, i.x-i.halfWidth-i.graphicsOffsetX-cameraX, i.y-i.halfHeight-i.graphicsOffsetY-cameraY);   
   }catch(e){
   }
}

function drawBackground(x,y){
   try{
     gameCanvasContext.drawImage(gameBackground, x,y,500,500,0,0,500,500);
   }catch(e){
   }
}
