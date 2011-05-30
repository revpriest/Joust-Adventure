/*********************************************************** * A meanie is like a player, only the keymap gets set by
* the AI here instead of by actual key-presses.
*/

GirlfriendItem = function(name,x,y,direction){
  this.init(name,x,y,direction);
  this.halfWidth = 34;
  this.halfHeight = 30;
  this.graphicsOffsetX = 0;
  this.graphicsOffsetY = 40;
  this.faceRightGraphic = document.getElementById("PinkMonkeyStand") ;
  this.faceLeftGraphic = document.getElementById("PinkMonkeyStandL");
  this.faceRightJumpGraphic = document.getElementById("PinkMonkeyJump") ;
  this.faceLeftJumpGraphic = document.getElementById("PinkMonkeyJumpL");
  this.walkAnimFrames =  [document.getElementById("PinkMonkeyJump")];
  this.walkAnimFramesL = [document.getElementById("PinkMonkeyJumpL")];
  this.delayFrames=0;
  this.animFrame=1;
  this.mortal = false;
  this.flying=null;
  this.gotLance = false;
  this.noQuittingJump=1;
  this.keyMap = [];
  this.friendlyFireCode = 1;    //Can't kill things with the same Friendly Fire code as you.
  this.neverRemove = true;
  this.graphic = this.faceLeftGraphic;
  if(direction==this.faceDirectionRight){
    this.graphic = this.faceRightGraphic;
  }else{
    this.graphic = this.faceLeftGraphic;
  }
}
GirlfriendItem.prototype = new PlayerItem();




/*********************************
* She can't fly things, least not
* in the normal sense.
*/ 
GirlfriendItem.prototype.fly = function(flyableItem){
} 

GirlfriendItem.prototype.die = function(){
}

