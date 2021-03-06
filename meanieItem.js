/*********************************************************** * A meanie is like a player, only the keymap gets set by
* the AI here instead of by actual key-presses.
*/

MeanieItem = function(name,x,y,direction){
  this.init(name,x,y,direction);

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
  this.friendlyFireCode = 1;    //Can't kill things with the same Friendly Fire code as you.
  if(direction==this.faceDirectionRight){
    this.dx = 2
    this.graphic = this.faceRightGraphic;
  }else{
    this.dx = -2
    this.graphic = this.faceLeftGraphic;
  }
}
MeanieItem.prototype = new PlayerItem();

/**************************************************
* Oh dear, this is unfortunate, I seem to be dead.
*/
MeanieItem.prototype.die = function(){
  if(this.flying){
    this.flying.die();
    this.ditchBird();
    this.dying = 30;
    this.graphic=document.getElementById("splat");
    this.background=true;
    return;
  }
}


/*************************************************
* Work out what we want, what keys this meanie
* should be pressing.
*/
MeanieItem.prototype.doAi = function(){
  var soughtItem = null;
  if(this.sleeping){
    var dist = this.distanceTo(physicsItems['player']);
    if(dist<360){
      this.sleeping=false;
    }
    return;
  }

  if(this.flying==null){
    //If we're unmounted, we want a mount!
    soughtItem = this.findClosestX(
      function(x){
        return x.flyable&&(x.pilot==null);
      }
    );
  }else if(!this.gotLance){
    //If we have no lance, go find one.
    soughtItem = this.findClosestX(
      function(x){
        return x.weapon;
      }
    );
  }else{
    //We're armed, mounted and dangerous. Seek the player!
    soughtItem = physicsItems['player'];
  }

  if(soughtItem!=null){
    this.seek(soughtItem.x,soughtItem.y);
  } 
}



/*****************************************8
* Meanies don't collect lances.
*/
MeanieItem.prototype.collectLanceIfPresent = function(){
  return;
}





/**********************************************************
* Press the keys to make him head towards some item
*/
MeanieItem.prototype.seek = function(x,y){
  if(x<this.x-64){
    this.keyMap[this.keyLeft]=true;
    this.keyMap[this.keyRight]=false;
  }else if(x>this.x+64){
    this.keyMap[this.keyLeft]=false;
    this.keyMap[this.keyRight]=true;
  }
  
  if(y<this.y){
    this.keyMap[this.keyUp]=true;
  }else{
    this.keyMap[this.keyUp]=false;
  }
}
