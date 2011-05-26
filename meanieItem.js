/*********************************************************** * A meanie is like a player, only the keymap gets set by
* the AI here instead of by actual key-presses.
*/

MeanieItem = function(name,x,y,direction){
  this.init(name,x,y,direction);
  this.halfWidth = 25;
  this.halfHeight = 30;
  this.graphicsOffsetX = 15;
  this.graphicsOffsetY = 10;
  this.faceRightGraphic = document.getElementById("BaboonStand") ;
  this.faceLeftGraphic = document.getElementById("BaboonStandL");
  this.faceRightJumpGraphic = document.getElementById("BaboonJump") ;
  this.faceLeftJumpGraphic = document.getElementById("BaboonJumpL");
  this.walkAnimFrames =  [document.getElementById("BaboonWalk1") ,document.getElementById("BaboonWalk2") ,document.getElementById("BaboonWalk3") ,document.getElementById("BaboonWalk4") ];
  this.walkAnimFramesL = [document.getElementById("BaboonWalk1L"),document.getElementById("BaboonWalk2L"),document.getElementById("BaboonWalk3L"),document.getElementById("BaboonWalk4L")];
  this.delayFrames=0;
  this.animFrame=1;
  this.mortal = true;
  this.flying=null;
  this.gotLance = false;
  this.noQuittingJump=1;
  this.keyMap = [];
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
    if(soughtItem.x<this.x-64){
      this.keyMap[this.keyLeft]=true;
      this.keyMap[this.keyRight]=false;
    }else if(soughtItem.x>this.x+64){
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

/*****************************************8
* Meanies don't collect lances.
*/
MeanieItem.prototype.collectLanceIfPresent = function(){
  return;
}

