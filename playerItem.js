/********************************************************
* The Player is obviously a type of PhysicsItem.
*/

function PlayerItem(name,x,y,keyMap,direction){
  this.init(name,x,y,direction);

  this.flyingHalfWidth = 35;
  this.flyingHalfHeight = 49;
  this.flyingOffsetX = 0;
  this.flyingOffsetY = 0;
  this.runningHalfWidth = 25;
  this.runningHalfHeight = 30;
  this.runningOffsetX = 15;
  this.runningOffsetY = 0;
  this.faceRightGraphic = document.getElementById("SilverbackStand") ;
  this.faceLeftGraphic = document.getElementById("SilverbackStandL");
  this.sitRightGraphic = document.getElementById("SilverbackStand") ;
  this.sitLeftGraphic = document.getElementById("SilverbackStandL");
  this.faceRightJumpGraphic = document.getElementById("SilverbackJump") ;
  this.faceLeftJumpGraphic = document.getElementById("SilverbackJumpL");
  this.walkAnimFrames =  [document.getElementById("SilverbackWalk1") ,document.getElementById("SilverbackWalk2") ,document.getElementById("SilverbackWalk3") ,document.getElementById("SilverbackWalk4") ];
  this.walkAnimFramesL = [document.getElementById("SilverbackWalk1L"),document.getElementById("SilverbackWalk2L"),document.getElementById("SilverbackWalk3L"),document.getElementById("SilverbackWalk4L")];

  this.halfWidth = this.runningHalfWidth;
  this.halfHeight = this.runningHalfHeight;
  this.graphicsOffsetY = this.runningOffsetY;
  this.graphicsOffsetX = this.runningOffsetX;
  this.delayFrames=0;
  this.animFrame=1;
  this.mortal = true;
  this.flying=null;
  this.keyMap = keyMap;
  this.gotLance = false;
  this.noRemount=1;
  this.particleSpeed=10;
  if(direction==this.faceDirectionRight){
    this.graphic = this.faceRightGraphic;
  }else{
    this.graphic = this.faceLeftGraphic;
  }
}
PlayerItem.prototype = new PhysicsItem();
PlayerItem.prototype.keyDown = 40;
PlayerItem.prototype.keyUp = 38;
PlayerItem.prototype.keyLeft = 37;
PlayerItem.prototype.keyLove = 76;
PlayerItem.prototype.keyRight = 39;



/********************************************************
* Animate the object.
*/
PlayerItem.prototype.doAnimation = function(){
  if(!this.dying){
    if(this.flying==null){
      if((this.collisionBottom)&&(this.dx!=0)){
        //Walking
        this.animFrame=(Math.floor(this.x/27))%this.walkAnimFrames.length;
        if(this.dx<0){
           this.faceDirection=this.faceDirectionLeft;
           this.graphic = this.walkAnimFramesL[(this.animFrame)];
        }else if(this.dx>0){
           this.faceDirection=this.faceDirectionRight;
           this.graphic = this.walkAnimFrames[(this.animFrame)];
        }
      }else{
         if(this.collisionBottom){
           //Standing
           if(this.faceDirection == this.faceDirectionLeft){
             this.graphic = this.faceLeftGraphic;
           }else{
             this.graphic = this.faceRightGraphic;
           }
         }else{
           //Jumping
           if(this.dx<0){
             this.faceDirection = this.faceDirectionLeft;
           }else if(this.dx>0){
             this.faceDirection = this.faceDirectionRight;
           }
           if(this.faceDirection == this.faceDirectionLeft){
             this.graphic = this.faceLeftJumpGraphic;
           }else{
             this.graphic = this.faceRightJumpGraphic;
           }
         }
      }
    }else{
      if((this.dx<0)||((this.dx==0)&&(this.faceDirection==this.faceDirectionLeft))){
        this.faceDirection=this.faceDirectionLeft;
        this.graphic = this.sitLeftGraphic;
        if(this.flying){
          this.flying.faceDirection = this.faceDirectionLeft;
        }
      }else if((this.dx>0)||((this.dx==0)&&(this.faceDirection==this.faceDirectionRight))){
        this.faceDirection=this.faceDirectionRight;
        this.graphic = this.sitRightGraphic;
        if(this.flying){
          this.flying.faceDirection = this.faceDirectionRight;
        }
      }
    }
  }
  if(this.oldFaceDirection!=this.faceDirection){
    this.oldFaceDirection=this.faceDirection;
    if(this.deadlyBox){
        this.deadlyBox.x1=-this.deadlyBox.x1;
        this.deadlyBox.x2=-this.deadlyBox.x2;
    }
  }
}


/******************************************************
* If there's a lance there, collect it
*/
PlayerItem.prototype.collectLanceIfPresent = function(){
   var collectableItem = this.getTouchedCollectable();
   if(collectableItem){
     if(!this.gotLance){
       collectableItem.die();
       this.getLance();
     }
   }
}


/***********************************************
* Give this player a lance
*/
PlayerItem.prototype.getLance = function(){
   this.gotLance = true;
   if(this.faceDirection==this.faceDirectionRight){
     this.deadlyBox = {x1:0,y1:-1,x2:100,y2:4}
   }else{
     this.deadlyBox = {x1:0,y1:-1,x2:-100,y2:4}
   }
}


/******************************************************
* Fly an item
*/
PlayerItem.prototype.fly = function(flyableItem){
  this.flying=flyableItem;
  flyableItem.pilot = this;
  this.halfWidth = this.flyingHalfWidth 
  this.halfHeight = this.flyingHalfHeight;
  this.graphicsOffsetX = this.flyingOffsetX;
  this.graphicsOffsetY = this.flyingOffsetY;
  this.faceDirection = flyableItem.faceDirection;
}




/********************************************************
* Player movement, including moving anything he's flying
*/
PlayerItem.prototype.doSelfControl = function(){


  this.invulnerable--;
  if(this.invulnerable<0){this.invulnerable=0;}

  //If this 'player' is an AI, then do the AI!
  if(typeof this.doAi == 'function') {
    this.doAi();
  }
  //If this 'player' can love, then do that
  if(typeof this.doLove == 'function') {
    this.doLove();
  }

  //Then get on with stuff.
  if(!this.dying){
    //Collect a bird to fly?
    if(this.flying==null){
      var flyableItem = this.getTouchedFlyable();
      if(flyableItem!=null){
        this.fly(flyableItem);
      }
    }else{
      //Oh, already flying! Collect a lance maybe?
      this.collectLanceIfPresent();
    }


    //Collision Stuff.
    this.doStandardCollision();


    //Movement.
    if(this.flying==null){
      //Walking movement.
      if(this.keyMap[this.keyUp]){
        if(this.collisionBottom!=null){
          this.dy=-30; 
        }
      }else{
        if(this.noRemount--<=0){
          this.noRemount=0;
          if(this.dy<0){
            this.dy=0;
          }
        }
      }
      if(this.keyMap[this.keyLeft]){
        this.dx-=2;
      }
      if(this.keyMap[this.keyRight]){
        this.dx+=2;
      }
    }else{
      //Flying movement
      if(this.keyMap[this.keyUp]){
        this.burn=true;
        this.dy-=3;
        if(this.dy<-10){this.dy=-10;} 
      }else{
        this.burn=false;
      }
      if(this.keyMap[this.keyLeft]){
        this.dx-=2;
      }
      if(this.keyMap[this.keyRight]){
        this.dx+=2;
      }
      this.flying.x=this.x;
      this.flying.dx=0;
      this.flying.y=this.y+5;
      this.flying.dy=10;
      this.flying.faceDirection = this.faceDirection;
    }

    //Ditch a bird?
    if(this.flying&&this.keyMap[this.keyDown]){
      this.ditchBird();
      this.dy=-30;
      this.noRemount=30;
    }

  }

  //Loving?
  if(this.keyMap[this.keyLove]){
    this.loveTime = 5;
  }

  //Execute tiredness!
  if(this.dx>11){this.dx=11;}
  if(this.dx<-11){this.dx=-11;}

}

/****************************************************8
* Ditch the bird we're flying, and thus drop any
* lance we're carrying too
*/
PlayerItem.prototype.ditchBird = function(){
   this.invulnerable=10;
   this.flying.pilot = null;
   this.flying=null;
   this.halfWidth = this.runningHalfWidth;
   this.halfHeight = this.runningHalfHeight;
   this.graphicsOffsetX = this.runningOffsetX;
   this.graphicsOffsetY = this.runningOffsetY;
   if(this.gotLance){
     this.gotLance=false;
//     addPhysicsItem(null,new LanceItem("lance"+this.maxObjInt,this.x,this.y))
     this.deadlyBox=undefined;
   }
}



/**************************************************
* Oh dear, this is unfortunate, I seem to be dead.
*/
PlayerItem.prototype.die = function(){
  if(this.invulnerable>0){return;}
  if(this.flying){
    this.flying.die();
    this.ditchBird();
    return;
  }
}


/*************************************************
* Give me some LOVE
*/
PlayerItem.prototype.doLove = function(){
  if(frameNumber%this.particleSpeed!=0){
    return;
  } 
  if(this==girlfriend || this==player){
    if(girlfriend.distanceTo(player)<200){
      //Create a love icon
      this.particleSpeed=6;
      var name = this.name+(new Date).getTime();
      addPhysicsItem (name, new ParticleItem(name,this.x,this.y,this.faceDirection,"heart"));
    }else{
      if(this==girlfriend){
        //Cry for help!
        this.particleSpeed=10;
        addPhysicsItem (name, new ParticleItem(name,this.x,this.y,this.faceDirection,"help"));
      }
    }
  }
}


