/***********************************************************
* A Sentinel is like a player, only the keymap gets set by
* the AI here instead of by actual key-presses. AI just
* bounces him right and left.
*/

function SentinelItem(name,x,y,direction){
  this.init(name,x,y);

  this.flyingHalfWidth = 35;
  this.flyingHalfHeight = 49;
  this.flyingOffsetX = -5;
  this.flyingOffsetY = 0;
  this.runningHalfWidth = 25;
  this.runningHalfHeight = 30;
  this.runningOffsetX = 15;
  this.runningOffsetY = 0;
  this.faceRightGraphic = document.getElementById("BaboonStand") ;
  this.faceLeftGraphic = document.getElementById("BaboonStandL");
  this.sitRightGraphic = document.getElementById("BaboonStand") ;
  this.sitLeftGraphic = document.getElementById("BaboonStandL");
  this.faceRightJumpGraphic = document.getElementById("BaboonJump") ;
  this.faceLeftJumpGraphic = document.getElementById("BaboonJumpL");
  this.walkAnimFrames =  [document.getElementById("BaboonWalk1") ,document.getElementById("BaboonWalk2") ,document.getElementById("BaboonWalk3") ,document.getElementById("BaboonWalk4") ];
  this.walkAnimFramesL = [document.getElementById("BaboonWalk1L"),document.getElementById("BaboonWalk2L"),document.getElementById("BaboonWalk3L"),document.getElementById("BaboonWalk4L")];

  this.halfWidth = this.runningHalfWidth;
  this.halfHeight = this.runningHalfHeight;
  this.graphicsOffsetY = this.runningOffsetY;
  this.graphicsOffsetX = this.runningOffsetX;
  this.delayFrames=0;
  this.animFrame=1;
  this.mortal = true;
  this.flying=null;
  this.gotLance = false;
  this.noQuittingJump=1;
  this.keyMap = [];
  this.targetY = y;
  if(direction==1){
    this.dx = -2
  }else{
    this.dx = 2
  }
}
SentinelItem.prototype = new MeanieItem();



/*************************************************
* Work out what we want, what keys this meanie
* should be pressing.
*/
SentinelItem.prototype.doAi = function(){
    if(this.dx<0){
     this.keyMap[this.keyLeft]=true;
     this.keyMap[this.keyRight]=false;
    }else{
     this.keyMap[this.keyLeft]=false;
     this.keyMap[this.keyRight]=true;
    }
    if(this.y>this.targetY+10){
      this.keyMap[this.keyUp]=true;
    }else if(this.y<this.targetY){
      this.keyMap[this.keyUp]=false;
    }
}


 
