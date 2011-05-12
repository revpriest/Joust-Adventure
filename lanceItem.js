/********************************************************
* The Map Block just hangs there, defying gravity.
*/

function LanceItem(name,x,y){
  this.init(name,x,y);
  this.halfWidth = 6;
  this.halfHeight = 75;
  this.graphic = document.getElementById("LanceV");
}
LanceItem.prototype = new PhysicsItem();
LanceItem.prototype.collectable = true;


/**************************************************
* Killed when collected really, not before.
*/
LanceItem.prototype.die = function(){
  this.dying = 2;
}

