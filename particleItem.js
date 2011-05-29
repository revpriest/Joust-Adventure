/********************************************************
* The Particle Item just falls under gravity really.
*/

function ParticleItem(name,x,y,direction,graphicName){
  this.init(name,x,y,direction);
  this.halfWidth = 16;
  this.halfHeight = 16;
  this.background=true;
  this.graphic = document.getElementById(graphicName);
  this.dx = 5-Math.floor(Math.random()*10);
  this.dy = 5-Math.floor(Math.random()*10)-15;
  this.dying = 50;
}
ParticleItem.prototype = new PhysicsItem();

