/********************************************************
* The Map Block just hangs there, defying gravity.
*/

function MapBlock(name,x,y,w,h,collision){
  this.init(name,x,y);
  this.halfWidth = w/2;
  this.halfHeight = h/2;
  this.background=true;
  this.graphic = document.getElementById("mapBlock");
  if(collision=="x"){
    this.solidLeft = true;
    this.solidRight = true;
    this.solidTop = true;
    this.solidBottom = true;
  }else if(collision=="^"){
    this.graphic = document.getElementById("balloonTop");
    this.graphicsOffsetY = +8;
    this.solidLeft = true;
    this.solidRight = true;
    this.solidTop = true;
  }else if(collision=="N"){
    this.graphic = document.getElementById("balloonMiddleV");
    this.graphicsOffsetY = +8;
    this.solidLeft = true;
    this.solidRight = true;
  }else if(collision=="V"){
    this.graphic = document.getElementById("balloonBottom");
    this.graphicsOffsetY = +8;
    this.solidLeft = true;
    this.solidRight = true;
    this.solidBottom = true;
  }else if(collision=="Z"){
    this.graphic = document.getElementById("balloonMiddle");
    this.solidTop = true;
    this.solidBottom = true;
    this.graphicsOffsetY = 1;
  }else if(collision=="<"){
    this.graphic = document.getElementById("balloonLeft");
    this.graphicsOffsetX = 27;
    this.solidTop = true;
    this.solidBottom = true;
    this.solidLeft = true;
  }else if(collision==">"){
    this.graphic = document.getElementById("balloonRight");
    this.graphicsOffsetY = 1;
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

