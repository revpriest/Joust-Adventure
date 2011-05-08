/************************************************
* An item in the game which is affected by the
* physics. All players, ai-bots, collectables,
* even bullets if we add 'em, inherit from this.
*/
function PhysicsItem(px,py){
    this.init(px,py);
}
PhysicsItem.prototype.gravityConstant = 2;
PhysicsItem.prototype.faceDirectionLeft = 1;
PhysicsItem.prototype.faceDirectionRight = 2;

/************************************************
* Initialization
*/
PhysicsItem.prototype.init = function(name,px,py){
    if(px==null){
      this.x=Math.floor(Math.random()*500);
      this.y=Math.floor(Math.random()*500);
    }else{
      this.x=px;
      this.y=py;
    }
    this.dx=0;
    this.dy=0;
    this.graphicsOffsetX=0;
    this.graphicsOffsetY=0;
    this.name=name;
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
  if(this.dy<-10){this.dy=-10;} if(this.dy>10){this.dy=10;}

  //If it's moving, move it!
  if((this.dx!=0)||(this.dy!=0)){
    //Check for collisions.
    //Fetch an array:
    // index0 = true/false, was there a collision?
    // index1 = distance to the collision point
    // index2,3 = position of the collision point.
    collisionPoint = this.collisionPointWithAllObjects();
    if(collisionPoint.collides){
      if(collisionPoint.type=="b"){this.dy=-this.dy;}
      else if(collisionPoint.type=="t"){this.dy=0;}
      else if((collisionPoint.type=="l")||(collisionPoint.type=="r")){this.dx=-this.dx;}
      this.x = collisionPoint.x;
      this.y = collisionPoint.y;
    }else{
      this.y+=this.dy;
      this.x+=this.dx;
    }
    if(this.x>mapWidth-500-this.halfWidth){this.dx=-this.dx}
    if(this.x<=this.halfWidth){this.x=this.halfWidth;this.dx=-this.dx;}
    if(this.y>mapHeight-500-this.halfHeight){this.y=mapHeight-500-this.halfHeight;this.dy=-this.dy}
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
PhysicsItem.prototype.collisionPointWithAllObjects = function(){
  closestPoint = {collides:false, distance: 10000};
  for (var i in physicsItems) {
    var item = physicsItems[i];
    if((item!=this)&&(item.solid)){
      comparePoint = item.intersectsLine(this.x,this.y,this.dx,this.dy,this.halfWidth,this.halfHeight);
      if(comparePoint.collides==true){
        if(comparePoint.distance<closestPoint.distance){
          closestPoint = comparePoint;
        }
      }
    }
  }
  return closestPoint;
}



/****************************************************
* We have a moving object. All moving objects are
* cicrles, for now at least. We wanna see if that
* moving circle will hit the rectangle that this
* object represents. If not, return a collision
* object with collides.false. 
*
* If so, work out where the circle will be to just
* touch this square, and return a collision object
* with collides.true and .x,.y giving the point where
* the circle meets the box.
*
* We CAN assume the box isn't rotated, for now
* at least.
*/
PhysicsItem.prototype.intersectsLine = function(x1,y1,xv,yv,xsize,ysize){
  if((xv==0)&&(yv==0)){return {collides:false}}  //Not moving, can't collide.
  if((x1+xsize<this.x-this.halfWidth) &&(x1+xv+xsize<this.x-this.halfWidth)){return {collides:false}};  //Line left of box.
  if((x1-xsize>this.x+this.halfWidth) &&(x1+xv-xsize>this.x+this.halfWidth)){return {collides:false}};  //Line right of box.
  if((y1+ysize<this.y-this.halfHeight)&&(y1+yv+ysize<this.y-this.halfHeight)){return {collides:false}}; //Line above box.
  if((y1-ysize>this.y+this.halfHeight)&&(y1+yv-ysize>this.y+this.halfHeight)){return {collides:false}}; //Line below box.

  //Four lines in the box to check for collision with the moving circle...
  if(xv>0){
    //Left: y=this.x-this.halfWidth;
    vertLine = this.x-this.halfWidth;
    if((x1<vertLine)&&(x1+xv+xsize>vertLine)){
      return {collides:true,distance:yv,x:vertLine-ysize,y:y1+yv,physicsItem:this,type:'l'};
    }
  }
  if(xv<0){
    //Right: y=this.x+this.halfWidth;
    vertLine = this.x+this.halfWidth;
    if((x1>vertLine)&&(x1+xv-xsize<vertLine)){
      return {collides:true,distance:yv,x:vertLine+xsize,y:y1+yv,physicsItem:this,type:'r'};
    }
  }
  if(yv>0){
    //Top: x=this.y-this.halfHeight;
    horizLine = this.y-this.halfHeight;
    if((y1<horizLine)&&(y1+yv+ysize>horizLine)){
      return {collides:true,distance:xv,x:x1+xv,y:horizLine-ysize,physicsItem:this,type:'t'};
    }
  }
  if(yv<0){
    //Bottom: x=this.y+this.halfHeight;
    horizLine = this.y+this.halfHeight;
    if((y1>horizLine)&&(y1+yv-ysize<horizLine)){
      return {collides:true,distance:xv,x:x1+xv,y:horizLine+ysize,physicsItem:this,type:'b'};
    }
  }
  return {collides:false};
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
* Get the object at a given point. Not 'self', obviously
*/
PhysicsItem.prototype.getPhysicsItemAt = function(x,y){
  for (var i in physicsItems) {
    var item = physicsItems[i];
    if((item!=this)&&(item.containsPoint(x,y))){
      return item;
    }
  }
}

/****************************************************
* Get the object at a given point, but only if it's
* mortal.
*/
PhysicsItem.prototype.getMortalPhysicsItemAt = function(x,y){
  for (var i in physicsItems) {
    var item = physicsItems[i];
    if((item!=this)&&(item.mortal)&&(item.containsPoint(x,y))){
      return item;
    }
  }
}



/**************************************************
* Oh dear, this is unforunate, i seem to be dead.
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
  killedItem = this.getMortalPhysicsItemAt(this.x+this.deadlyPoint.x,this.y+this.deadlyPoint.y);
  if(killedItem){
    //Maybe it's close? Maybe they have a weapon too?
    if(killedItem.deadlyPoint){
      if(killedItem.getPhysicsItemAt(killedItem.x+killedItem.deadlyPoint.x,killedItem.y+killedItem.deadlyPoint.y)==this){
        if(this.y+this.deadlyPoint.y<killedItem.y+killedItem.deadlyPoint.y){
          killedItem.die();
        }
      }
    }else{
      killedItem.die();
    }
  }
}



/********************************************************
* Make sure the thing is facing a particular way, if
* it's actually moving, and changes the image when
* it's pointing a different way
*/
PhysicsItem.prototype.doFaceDirection = function(){
  if(!this.dying){
    if((this.faceDirection==null)||(this.faceDirection==0)||
       ((this.dx<0)&&(this.direction!=this.faceDirectionLeft))){
       if(this.deadlyPoint){this.deadlyPoint.x=-this.deadlyPoint.x;}
          this.faceDirection=this.faceDirectionLeft;
          this.graphic=this.faceLeftGraphic;
    }else if((this.dx>0)&&(this.direction!=this.faceDirectionRight)){
       if(this.deadlyPoint){this.deadlyPoint.x=-this.deadlyPoint.x;}
         this.faceDirection=this.faceDirectionRight;
          this.graphic=this.faceRightGraphic;
    }
  }
}


/**************************************
* Method to move the item, ensure it's
* actually doing it's thing.
*/
PhysicsItem.prototype.updatePosition = function(){
  this.doSelfControl();
  this.fallUnderGravity();
  //Turn around?
  if(this.faceLeftGraphic){
    this.doFaceDirection();
  }
  this.doInertia();
  if(this.deadlyPoint){
    this.killTip();
  }
}


