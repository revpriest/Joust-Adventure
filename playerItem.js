/********************************************************
* The Player is obviously a type of PhysicsItem.
*/

function PlayerItem(name,x,y,keyMap){
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
  this.keyMap = keyMap;
  this.gotLance = false;
}
PlayerItem.prototype = new PhysicsItem();
PlayerItem.prototype.keyDown = 40;
PlayerItem.prototype.keyUp = 38;
PlayerItem.prototype.keyLeft = 37;
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
             this.graphic = this.faceLeftGraphic;
           }else{
             this.graphic = this.faceRightGraphic;
           }
         }
      }
    }else{
      if((this.dx<0)||((this.dx==0)&&(this.faceDirection==this.faceDirectionLeft))){
        this.faceDirection=this.faceDirectionLeft;
        this.graphic = this.faceLeftGraphic;
        if(this.flying){
          this.flying.faceDirection = this.faceDirectionLeft;
        }
      }else if((this.dx>0)||((this.dx==0)&&(this.faceDirection==this.faceDirectionRight))){
        this.faceDirection=this.faceDirectionRight;
        this.graphic = this.faceRightGraphic;
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



/********************************************************
* Player movement, including moving anything he's flying
*/
PlayerItem.prototype.doSelfControl = function(){
  if(!this.dying){
    //Collect a bird to fly?
    if(this.flying==null){
      var flyableItem = this.getTouchedFlyable();
      if(flyableItem!=null){
        this.flying=flyableItem;
        flyableItem.pilot = this;
        this.halfWidth = 35
        this.halfHeight = 49;
        this.graphicsOffsetX = -3;
        this.graphicsOffsetY = 0;
        this.faceDirection = flyableItem.faceDirection;
      }
    }else{
      //Oh, already flying! Collect a lance maybe?
      var collectableItem = this.getTouchedCollectable();
      if(collectableItem){
        debugPrint("Picked Up:"+collectableItem.name);
        collectableItem.die();
        this.gotLance = true;
        if(this.faceDirection==this.faceDirectionRight){
          this.deadlyBox = {x1:0,y1:-5,x2:100,y2:0}
        }else{
          this.deadlyBox = {x1:0,y1:-5,x2:-100,y2:0}
        }
      }
    }


    //Collision Stuff.
    if(this.collisionTop!=null){
       this.dy=-this.dy;
    }
    if(this.collisionBottom!=null){
       this.dy=0;
       this.y = this.collisionBottom.y-this.collisionBottom.halfHeight-this.halfHeight;
       if((!this.keyMap[this.keyLeft])&&(!this.keyMap[this.keyRight])){
         //Come slowly to a stop if there's no keys pressed. Floors have friction!
         this.dx=3*this.dx/4;
         if(Math.abs(this.dx)<1){this.dx=0;}
       }
    }
    if(this.collisionLeft!=null||this.collisionRight!=null){
       this.dx=-this.dx;
    }



    //Movement.
    if(this.flying==null){
      //Walking movement.
      if(this.keyMap[this.keyUp]){
        if(this.collisionBottom!=null){
          this.dy=-30; 
        }
      }else{
        if(this.dy<0){
          this.dy=0;
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
        this.dy=-10; 
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
      this.flying.dx=this.dx;
      this.flying.y=this.y+13;
      this.flying.dy=10;
      this.flying.faceDirection = this.faceDirection;
    }

    //Ditch a bird?
    if(this.flying&&this.keyMap[this.keyDown]){
      this.ditchBird();
    }

  }

  //Execute tiredness!
  if(this.dx>11){this.dx=11;}
  if(this.dx<-11){this.dx=-11;}

}

/****************************************************8
* Ditch the bird we're flying, and thus drop any
* lance we're carrying too
*/
PhysicsItem.prototype.ditchBird = function(){
   this.flying.pilot = null;
   this.flying=null;
   this.halfWidth = 25;
   this.halfHeight = 30;
   this.graphicsOffsetX = 15;
   this.graphicsOffsetY = 0;
   if(this.gotLance){
     this.gotLance=false;
     this.addItem(new LanceItem("lance"+n,this.x,this.y))
     this.deadlyBox=undefined;
   }
}



/**************************************************
* Oh dear, this is unforunate, i seem to be dead.
*/
PhysicsItem.prototype.die = function(){
  this.dying = 30;
  if(this.flying!=null){
    this.flying.pilot = false;
  }
  this.graphic=document.getElementById("splat");
}

