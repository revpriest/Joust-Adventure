/********************************************************
* The Map Block just hangs there, defying gravity.
*/

function MapBlock(name,x,y,w,h,collision){
  this.init(name,x,y);
  this.halfWidth = w/2;
  this.halfHeight = h/2;
  this.background=true;
  this.graphic = document.getElementById("mapBlock");
  if(collision=="^"){
    this.solidTop = true;
  }else if(collision=="_"){
    this.solidBottom = true;
  }else if(collision=="]"){
    this.solidRight = true;
  }else if(collision=="["){
    this.solidLeft = true;
  }else if(collision=="z"){
    this.solidTop = true;
    this.solidBottom = true;
  }else if(collision=="<"){
    this.solidTop = true;
    this.solidBottom = true;
    this.solidLeft = true;
  }else if(collision==">"){
    this.solidTop = true;
    this.solidBottom = true;
    this.solidRight = true;
  }else if(collision=="x"){
    this.solidTop = true;
    this.solidBottom = true;
    this.solidLeft = true;
    this.solidRight = true;
  }
  
}
MapBlock.prototype = new PhysicsItem();

/***********************************************
* Map blocks do not fall, they just hang there.
*/
MapBlock.prototype.fallUnderGravity = function(){
}

