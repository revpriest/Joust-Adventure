/********************************************************
* The Map Block just hangs there, defying gravity.
*/

function LanceItem(name,x,y,d){
  this.init(name,x,y,d);
  this.halfWidth = 6;
  this.halfHeight = 75;
  this.graphic = document.getElementById("LanceV");
//  this.deadlyBox= {x1:-3,y1:-64,x2:+3,y2:-76}
}
LanceItem.prototype = new PhysicsItem();
LanceItem.prototype.collectable = true;
LanceItem.prototype.weapon = true;


/**************************************************
* Killed when collected really, not before.
*/
LanceItem.prototype.die = function(){
  this.dying = 2;
}



LanceItem.prototype.doSelfControl = function(){
    //Collision Stuff.
    if(this.collisionBottom!=null){
       this.dy=-this.dy;
       this.y = this.collisionBottom.y-this.collisionBottom.halfHeight-this.halfHeight;
    }
}
