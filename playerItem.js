/********************************************************
* The Player is obviously a type of PhysicsItem.
*/

function PlayerItem(name,x,y,keyMap){
  this.init(name,x,y);
  this.halfWidth = 20;
  this.halfHeight = 40;
  this.graphicsOffsetX = 30;
  this.graphicsOffsetY = 0;
  this.deadlyPoint= {x:60,y:7}
  this.faceLeftGraphic = document.getElementById("playerFaceLeft");
  this.faceRightGraphic = document.getElementById("playerFaceRight") ;
  this.faceDirection = 0;
  this.mortal = true;
  this.keyMap = keyMap;
}
PlayerItem.prototype = new PhysicsItem();
PlayerItem.prototype.keyUp = 38;
PlayerItem.prototype.keyLeft = 37;
PlayerItem.prototype.keyRight = 39;

PlayerItem.prototype.doSelfControl = function(){
  if(!this.dying){
    if(this.keyMap[this.keyUp]){
      this.dy-=4;
    }
    if(this.keyMap[this.keyLeft]){
      this.dx-=2;
    }
    if(this.keyMap[this.keyRight]){
      this.dx+=2;
    }
  }
  //Execute tiredness!
  if(this.dx>5){this.dx=5;}
  if(this.dx<-5){this.dx=-5;}
}



