/********************************************************
* The Player is obviously a type of PhysicsItem.
*/

function AiItem(name,x,y){
  this.init(name,x,y);
  this.halfWidth = 32;
  this.halfHeight = 40;
  this.graphicsOffsetX = 40;
  this.graphicsOffsetY = 0;
  this.deadlyPoint= {x:60,y:7}
  this.faceLeftGraphic = document.getElementById("aiFaceLeft");
  this.faceRightGraphic = document.getElementById("aiFaceRight") ;
  this.faceDirection = 0;
  this.mortal = true;
  this.dx = Math.floor(Math.random(6)-3);
  this.burn = 1
}
AiItem.prototype = new PhysicsItem();
AiItem.prototype.faceDirectionLeft = 1;
AiItem.prototype.faceDirectionRight = 2;

AiItem.prototype.doSelfControl = function(){
  if(Math.floor(Math.random()*5)==1){
    this.burn=!this.burn;
  }
  if(this.burn){
    if(!this.dying){
      this.dy-=4;
    }
  }
}



