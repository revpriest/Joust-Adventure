/***********************************************************
* A meanie is like a player, only the keymap gets set by
* the AI here instead of by actual key-presses.
*/

function MeanieItem(name,x,y){
  this.init(name,x,y);
  this.halfWidth = 25;
  this.halfHeight = 30;
  this.graphicsOffsetX = 15;
  this.graphicsOffsetY = 0;
  this.faceRightGraphic = document.getElementById("SilverbackStand") ;
  this.faceLeftGraphic = document.getElementById("SilverbackStandL");
  this.delayFrames=0;
  this.animFrame=1;
  this.walkAnimFrames =  [document.getElementById("SilverbackWalk1") ,document.getElementById("SilverbackWalk2") ,document.getElementById("SilverbackWalk3") ,document.getElementById("SilverbackWalk4") ];
  this.walkAnimFramesL = [document.getElementById("SilverbackWalk1L"),document.getElementById("SilverbackWalk2L"),document.getElementById("SilverbackWalk3L"),document.getElementById("SilverbackWalk4L")];
  this.faceDirection = 1;
  this.mortal = true;
  this.flying=null;
  this.gotLance = false;
  this.noQuittingJump=1;
  this.keyMap = [];
}
MeanieItem.prototype = new PlayerItem();



/*************************************************
* Work out what we want, what keys this meanie
* should be pressing.
*/
MeanieItem.prototype.doAi = function(){
  var soughtItem = null;

  if(this.flying==null){
    //If we're unmounted, we want a mount!
    soughtItem = this.findClosestX(
      function(x){
        return x.flyable;
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
    if(soughtItem.x<this.x){
      this.keyMap[this.keyLeft]=true;
      this.keyMap[this.keyRight]=false;
    }else{
      this.keyMap[this.keyLeft]=false;
      this.keyMap[this.keyRight]=true;
    }
    
    if(soughtItem.y<this.y){
      this.keyMap[this.keyUp]=true;
    }else{
      this.keyMap[this.keyUp]=false;
    }
  } 
}


 
