/************************************************
* An item in the game which is affected by the
* physics. All players, ai-bots, collectables,
* even bullets if we add 'em, inherit from this.
*/
function PhysicsItem(name,px,py,d){
    this.init(name,px,py,d);
}
PhysicsItem.prototype.gravityConstant = 2;
PhysicsItem.prototype.faceDirectionLeft = 1;
PhysicsItem.prototype.faceDirectionRight = 2;

/************************************************
* Initialization
*/
PhysicsItem.prototype.init = function(name,px,py,d){
    if(px==null){
      this.x=Math.floor(Math.random()*5000);
      this.y=Math.floor(Math.random()*5000);
    }else{
      this.x=px;
      this.y=py;
    }
    this.dx=0;
    this.dy=0;
    this.graphicsOffsetX=0;
    this.graphicsOffsetY=0;
    this.name=name;
    this.faceDirection = d;
    return this;
}








/*************************************************8
* Sometimes the graphic isn't initialized properly.
* We'll try again with this bit
*/
PhysicsItem.prototype.initGraphic = function(){
   this.graphic = document.getElementById("playerFaceLeft");
}


/********************************************
* Make this item fall under gravity. The engine
* will call this every loop. I know we probably
* should be calculating distances based on time
* elapsed since the last update or something but
* COME ON! Surely we can just do the same thing
* nice and regularly? It's SO MUCH easier.
*/
PhysicsItem.prototype.fallUnderGravity = function(){
  this.dy+=this.gravityConstant;
}

PhysicsItem.prototype.doInertia = function(){
  //Limit by air resistance I guess?
  if(this.dx<-10){this.dx=-10;} if(this.dx>10){this.dx=10;}
  if(this.dy<-30){this.dy=-30;} if(this.dy>20){this.dy=20;}

  //If it's moving, move it!
  if((this.dx!=0)||(this.dy!=0)){
    //Check for collisions.
    //Fetch an array:
    // index0 = true/false, was there a collision?
    // index1 = distance to the collision point
    // index2,3 = position of the collision point.
    this.y+=this.dy;
    this.x+=this.dx;
    if(this.x>mapWidth-screenWidth-this.halfWidth){this.dx=-this.dx;this.x=mapWidth-screenWidth-this.halfWidth;}
    if(this.x<=this.halfWidth){this.x=this.halfWidth;this.dx=-this.dx;this.x=this.halfWidth;}
    if(this.y>mapHeight-screenHeight-this.halfHeight){this.y=mapHeight-screenHeight-this.halfHeight;this.dy=-this.dy}
    if(this.y<=this.halfHeight){this.y=this.halfHeight;}
  }
}


/*****************************************************
* Work out the closest collision point on a line out
* of all the objects that are solid (other than this 
* one)
* Return a 'collisionPoint' object:
*   .x = xposition of collision
*   .y = yposition of collision
*   .collides = true/false
*   .distance = distance to collision
*   .physicsItem = which thing it collides with.
*/
PhysicsItem.prototype.doCollisionDetection = function(){
  hitSomething = false;
  this.collisionLeft=this.collisionRight=this.collisionTop=this.collisionBottom=null;
  for (var i in physicsItems){
    var item = physicsItems[i];
    if((item!=this)&&(item.solidTop||item.solidBottom||item.solidLeft||item.solidRight)){
      if(item.mightCross(this.x,this.y,this.dx,this.dy,this.halfWidth,this.halfHeight)){    
        if((item.solidTop)&&(item.crossesTop(this.x,this.y,this.dx,this.dy,this.halfWidth,this.halfHeight))){
          this.collisionBottom=item;
          hitSomething=true;
        }
        if((item.solidBottom)&&(item.crossesBottom(this.x,this.y,this.dx,this.dy,this.halfWidth,this.halfHeight))){
          this.collisionTop=item;
          hitSomething=true;
        }
        if((item.solidLeft)&&(item.crossesLeft(this.x,this.y,this.dx,this.dy,this.halfWidth,this.halfHeight))){
          this.collisionRight=item;
          hitSomething=true;
        }
        if((item.solidRight)&&(item.crossesRight(this.x,this.y,this.dx,this.dy,this.halfWidth,this.halfHeight))){
          this.collisionLeft=item;
          hitSomething=true;
        }
      }
    }
  }
  return hitSomething;
}



/****************************************************
* Collision Detection - given a line, is it likely
* to cross this item's collision square?
*/
PhysicsItem.prototype.mightCross = function(x1,y1,xv,yv,xsize,ysize){
  if((xv==0)&&(yv==0)){return {collides:false}}  //Not moving, can't collide.
  if((x1+xsize<this.x-this.halfWidth) &&(x1+xv+xsize<this.x-this.halfWidth)){return  false};  //Line left of box.
  if((x1-xsize>this.x+this.halfWidth) &&(x1+xv-xsize>this.x+this.halfWidth)){return  false};  //Line right of box.
  if((y1+ysize<this.y-this.halfHeight)&&(y1+yv+ysize<this.y-this.halfHeight)){return false}; //Line above box.
  if((y1-ysize>this.y+this.halfHeight)&&(y1+yv-ysize>this.y+this.halfHeight)){return false}; //Line below box.
  return true;
}

/****************************************************
* Collision Detection - given a line, does it
* cross the edge of this collision square?
*/
PhysicsItem.prototype.crossesLeft= function(x1,y1,xv,yv,xsize,ysize){
  if(xv>0){
    vertLine = this.x-this.halfWidth;
    if((x1<vertLine)&&(x1+xv+xsize>vertLine)){
      return true;
    }
  }
  return false;
}
PhysicsItem.prototype.crossesRight= function(x1,y1,xv,yv,xsize,ysize){
  if(xv<0){
    vertLine = this.x+this.halfWidth;
    if((x1>vertLine)&&(x1+xv-xsize<vertLine)){
      return true;
    }
  }
  return false;
}
PhysicsItem.prototype.crossesTop= function(x1,y1,xv,yv,xsize,ysize){
  if(yv>0){
    horizLine = this.y-this.halfHeight;
    if((y1<horizLine)&&(y1+yv+ysize>horizLine)){
      return true;
    }
  }
  return false;
}
PhysicsItem.prototype.crossesBottom= function(x1,y1,xv,yv,xsize,ysize){
  if(yv<0){
    horizLine = this.y+this.halfHeight;
    if((y1>horizLine)&&(y1+yv-ysize<horizLine)){
      return true;
    }
  }
  return false;
}



/*********************************************
* Control yourself! The player will over-ride
* this with control from keyboard. The AI players
* with the AI code. Anything else, well, 
* whatever that thing does to itself. Grow? If
* it's a plant or something?
*/
PhysicsItem.prototype.doSelfControl = function(){
  //Normal things have no self control. They
  //just lie there. Like a rock.
}


/****************************************************
* Does this item contain the given point?
*/
PhysicsItem.prototype.containsPoint = function(x,y){
  if((x>this.x-this.halfWidth)&&
     (x<this.x+this.halfWidth)&&
     (y>this.y-this.halfHeight)&&
     (y<this.y+this.halfHeight)){
    return true;
  }
  return false;
}


/****************************************************
* Does this item intersect with the given box?
*/
PhysicsItem.prototype.intersectsDeadlyBox = function(item){
  var x1=item.x+item.deadlyBox.x1;
  var x2=item.x+item.deadlyBox.x2;
  var y1=item.y+item.deadlyBox.y1;
  var y2=item.y+item.deadlyBox.y2;
  if(x2<x1){t=x1;x1=x2;x2=t;}
  if(y2<y1){t=y1;y1=y2;y2=t;}
  if(this.x+this.halfWidth<x1){return false;}
  if(this.x-this.halfWidth>x2){return false;}
  if(this.y+this.halfHeight<y1){return false;}
  if(this.y-this.halfHeight>y2){return false;}
  return true;
}


/****************************************************
* Does this item intersect with me?
*/
PhysicsItem.prototype.intersects = function(item){
  var x1=item.x-item.halfWidth;
  var x2=item.x+item.halfWidth;
  var y1=item.y-item.halfHeight;
  var y2=item.y-item.halfHeight;
  if(this.x+this.halfWidth<x1){return false;}
  if(this.x-this.halfWidth>x2){return false;}
  if(this.y+this.halfHeight<y1){return false;}
  if(this.y-this.halfHeight>y2){return false;}
  return true;
}





/****************************************************
* Get the object which is currently being killed by
* the deadly box for this item. Obviously that's
* only items which are moral and inside the deadlybox
* for this item.
*/
PhysicsItem.prototype.getItemKilled = function(){
  if(this.dying){return null;}
  for (var i in physicsItems){
    var item = physicsItems[i];
    if((item.friendlyFireCode)&&(item.friendlyFireCode==this.friendlyFireCode)){
      continue;
    }
    if((item!=this.flying)&&(item!=this)&&(item.mortal)&&(!item.dying)&&(item.intersectsDeadlyBox(this))){
      return item;
    }
  }
  return null;
}

/****************************************************
* Get any collectable item under this item.
*/
PhysicsItem.prototype.getTouchedCollectable = function(){
  if(this.dying){return null;}
  for (var i in physicsItems){
    var item = physicsItems[i];
    if((item!=this)&&(item.collectable)&&(!item.dying)&&(item.intersects(this))){
      return item;
    }
  }
  return null;
}
/****************************************************
* Get any flyable item under this item.
*/
PhysicsItem.prototype.getTouchedFlyable = function(){
  if(this.dying){return null;}
  for (var i in physicsItems){
    var item = physicsItems[i];
    if((item!=this)&&(item.flyable)&&(!item.dying)&&(item.intersects(this))&&(item.pilot==null)){
      return item;
    }
  }
  return null;
}


/******************************************************
* Calculate the distance from here to some other object
*/
PhysicsItem.prototype.distanceTo = function(item){
  var x=item.x-this.x;
  var y=item.y-this.y;
  return Math.sqrt((x*x)+(y*y));
}


/************************************************
* Find the closest thing which satisfies some
* function
*/
PhysicsItem.prototype.findClosestX = function(f){
  soughtItem=null;
  closestDist = 100000000000000;
  for (var i in physicsItems){
    var item = physicsItems[i];
    if(item!=this){
      if(f(item)){
        if((d=this.distanceTo(item))<closestDist){
          soughtItem = item;
          closestDist = d;
        }
      }
    }
  }
  return soughtItem;
}



/**************************************************
* Oh dear, this is unfortunate, I seem to be dead.
*/
PhysicsItem.prototype.die = function(){
  this.dying = 30;
  this.graphic=document.getElementById("splat");
}


/*************************************************
* Kill tip - anything you manage go get your
* tip into is signaled to die
*/
PhysicsItem.prototype.killTip = function(){
  if(this.dying){return;}
  killedItem = this.getItemKilled();
  if(killedItem!=null){
    if((!killedItem.deadlyBox)||(!this.intersectsDeadlyBox(killedItem))){
      killedItem.die();
    }else{
      //Ahha, it's a stand-off, they're killing each other.
      //We give it to whoever has the highest deadlybox.
      if((((killedItem.deadlyBox.y2+killedItem.deadlyBox.y1)/2)+killedItem.y)>
         (((this.deadlyBox.y2+this.deadlyBox.y1)/2)+this.y)){
         killedItem.die();
      }else{
        //Well, the other deadlybox will kill this soon enough. Do nothing.
      }
    }
  }
}



/********************************************************
* Make sure the thing is facing a particular way, if
* it's actually moving, and changes the image when
* it's pointing a different way
*/
PhysicsItem.prototype.doAnimation = function(){
  if(!this.faceLeftGraphic){return;}    //Unanimated.
  if(!this.dying){
    if((this.faceDirection==null)||(this.faceDirection==0)||(this.dx<0)){
       this.faceDirection=this.faceDirectionLeft;
       this.graphic=this.faceLeftGraphic;
    }else if(this.dx>0){
       this.faceDirection=this.faceDirectionRight;
       this.graphic=this.faceRightGraphic;
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


/**************************************
* Method to move the item, ensure it's
* actually doing it's thing.
*/
PhysicsItem.prototype.updatePosition = function(){
  if((!levelComplete)||(this.isParticle)){
    this.doCollisionDetection();
    this.doAnimation();
    this.doInertia();
    this.doSelfControl();
    this.fallUnderGravity();
    if(this.deadlyBox){
      this.killTip();
    }
  }else if(this==player || this ==girlfriend){
     this.doLove();
  }
}
  

/****************************************************
* Standard collision detection, bounce off things.
*/
PhysicsItem.prototype.doStandardCollision = function(){
    if(!this.neverBumpsHead){
      if(this.collisionTop!=null){
         this.dy=-this.dy;
         this.y = this.collisionTop.y+this.collisionTop.halfHeight+this.halfHeight;
      }
    }
    if(this.collisionBottom!=null){
       this.dy=0;
       this.y = this.collisionBottom.y-this.collisionBottom.halfHeight-this.halfHeight;
       if(this.keyMap){
         if((!this.keyMap[this.keyLeft])&&(!this.keyMap[this.keyRight])){
           //Come slowly to a stop if there's no keys pressed. Floors have friction!
           this.dx=3*this.dx/4;
           if(Math.abs(this.dx)<1){this.dx=0;}
         }
       }
    }
    if(this.collisionLeft!=null||this.collisionRight!=null){
       this.dx=-this.dx;
    }
}

