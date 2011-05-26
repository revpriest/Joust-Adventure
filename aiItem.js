/********************************************************
* The Player is obviously a type of PhysicsItem.
*/

function AiItem(name,x,y,d){
  this.init(name,x,y,d);
  this.halfWidth = 20;
  this.halfHeight = 40;
  this.graphicsOffsetX = 46;
  this.graphicsOffsetY = 0;
  this.deadlyBox= {x1:60,y1:-6,x2:0,y2:-9}
  this.faceLeftGraphic = document.getElementById("aiFaceLeft");
  this.faceRightGraphic = document.getElementById("aiFaceRight") ;
  this.mortal = true;
  this.dx = Math.floor(Math.random(6)-3);
  this.burn = 1
}
AiItem.prototype = new PhysicsItem();
AiItem.prototype.faceDirectionLeft = 1;
AiItem.prototype.faceDirectionRight = 2;

AiItem.prototype.doSelfControl = function(){
  if(Math.floor(Math.random()*6)<1){
    this.burn=1;
  }else{
    this.burn=0;
  }
  if(this.burn){
    if(!this.dying){
      this.dy=-10; 
    }
  }
}



