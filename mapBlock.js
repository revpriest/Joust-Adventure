/********************************************************
* The Map Block just hangs there, defying gravity.
*/

function MapBlock(name,x,y,w,h){
  this.init(name,x,y);
  this.halfWidth = w/2;
  this.halfHeight = h/2;
  this.graphic = document.getElementById("mapBlock");
}
MapBlock.prototype = new PhysicsItem();
MapBlock.prototype.solidTop = true;

/***********************************************
* Map blocks do not fall, they just hang there.
*/
MapBlock.prototype.fallUnderGravity = function(){
}

