/********************************************************
* The Player is obviously a type of PhysicsItem.
*/

function ParrotItem(name,x,y,direction){
  this.init(name,x,y,direction);
  this.halfWidth = 30;
  this.halfHeight = 35;
  this.graphicsOffsetX = 13;
  this.graphicsOffsetY = 13;
  this.animFrame=1;
  this.flyFramesR = [document.getElementById("ParrotFly1"),document.getElementById("ParrotFly2"),document.getElementById("ParrotFly3")];
  this.walkFramesR = [document.getElementById("ParrotStanding"),document.getElementById("ParrotWalk1"),document.getElementById("ParrotStanding"),document.getElementById("ParrotWalk2")];
  this.flyFramesL = [document.getElementById("ParrotFly1L"),document.getElementById("ParrotFly2L"),document.getElementById("ParrotFly3L")];
  this.walkFramesL = [document.getElementById("ParrotStandingL"),document.getElementById("ParrotWalk1L"),document.getElementById("ParrotStandingL"),document.getElementById("ParrotWalk2L")];
  this.flyFramesRW = [document.getElementById("ParrotFly1W"),document.getElementById("ParrotFly2W"),document.getElementById("ParrotFly3W")];
  this.walkFramesRW = [document.getElementById("ParrotStandingW"),document.getElementById("ParrotWalk1W"),document.getElementById("ParrotStandingW"),document.getElementById("ParrotWalk2W")];
  this.flyFramesLW = [document.getElementById("ParrotFly1LW"),document.getElementById("ParrotFly2LW"),document.getElementById("ParrotFly3LW")];
  this.walkFramesLW = [document.getElementById("ParrotStandingLW"),document.getElementById("ParrotWalk1LW"),document.getElementById("ParrotStandingLW"),document.getElementById("ParrotWalk2LW")];
  this.mortal = true;
  this.flyable = true;
  if(this.faceDirection==this.faceDirectionLeft){
    this.graphic = this.walkFramesL[0];
  }else{
    this.graphic = this.walkFramesR[0];
  }
  this.burn = 1
  this.delayFrames=1;
  this.pilot = null; 
}
ParrotItem.prototype = new PhysicsItem();
ParrotItem.prototype.faceDirectionLeft = 1;
ParrotItem.prototype.faceDirectionRight = 2;


/******************************************************
* Move around. Jump up, jump up, and get down.
*/
ParrotItem.prototype.doSelfControl = function(){
  if(this.sleeping){
    if(this.collisionBottom!=null){
       this.dx=0;
       this.dy=0;
       this.y = this.collisionBottom.y-this.collisionBottom.halfHeight-this.halfHeight;
    }
    return;
  }
  if(this.pilot == null){
    //Collision Stuff.
    this.doStandardCollision();

    if(this.dx==0){
      //Don't stand still boy!
      if(this.faceDirection==1){
        this.dx = -1-Math.floor(Math.random()*3);
      }else{
        this.dx = 1+Math.floor(Math.random()*3);
      }
    }
    this.mortal = true;
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
  }else{
    this.dying=undefined;  //Immortal when mounted!
    this.mortal = false;
  }
}






/********************************************************
* Override the animation function coz parrots animate
* like parrots, not general things.
*/
ParrotItem.prototype.doAnimation = function(){

  if(!this.dying){
    if(this.collisionBottom){
      //Walking
      this.animFrame=(Math.floor(this.x/27))%this.walkFramesR.length;
    }else{
      //Flying
      if(this.animFrame>this.flyFramesR.length-1){this.animFrame=1;this.delayFrames=0}
      if((--this.delayFrames)<0){
        this.delayFrames=3
        --this.animFrame;
      }
      if(this.animFrame<0){
        var burn = this.burn
        if(this.pilot!=null){
          burn=this.pilot.burn;
        }
        if(burn){
          this.animFrame=this.flyFramesL.length-1;
        }else{
          this.animFrame=0;
        }
      }
    }
    if((this.dx<0)||((this.dx==0)&&(this.faceDirection==this.faceDirectionLeft))){
      this.faceDirection=this.faceDirectionLeft;
      if(this.collisionBottom){
        this.graphic = this.walkFramesL[this.animFrame];
        this.wingGraphic = this.walkFramesLW[this.animFrame];
      }else{
        this.graphic = this.flyFramesL[this.animFrame];
        this.wingGraphic = this.flyFramesLW[this.animFrame];
      }
    }else if((this.dx>0)||((this.dx==0)&&(this.faceDirection==this.faceDirectionRight))){
      this.faceDirection=this.faceDirectionRight;
      if(this.collisionBottom){
        this.graphic = this.walkFramesR[this.animFrame];
        this.wingGraphic = this.walkFramesRW[this.animFrame];
      }else{
        this.graphic = this.flyFramesR[this.animFrame];
        this.wingGraphic = this.flyFramesRW[this.animFrame];
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



