/********************************************************
* The Player is obviously a type of PhysicsItem.
*/

function CrowItem(name,x,y,direction){
  this.init(name,x,y,direction);
  this.animFrame=1;

  this.halfWidth = 30;
  this.halfHeight = 35;
  this.graphicsOffsetX = 13;
  this.graphicsOffsetY = 13;
  this.flyFramesR = [document.getElementById("CrowFly1"),document.getElementById("CrowFly2"),document.getElementById("CrowFly3")];
  this.walkFramesR = [document.getElementById("CrowStand"),document.getElementById("CrowWalk1"),document.getElementById("CrowStand"),document.getElementById("CrowWalk2")];
  this.flyFramesL = [document.getElementById("CrowFly1L"),document.getElementById("CrowFly2L"),document.getElementById("CrowFly3L")];
  this.walkFramesL = [document.getElementById("CrowStandL"),document.getElementById("CrowWalk1L"),document.getElementById("CrowStandL"),document.getElementById("CrowWalk2L")];
  this.flyFramesRW = [document.getElementById("CrowFly1W"),document.getElementById("CrowFly2W"),document.getElementById("CrowFly3W")];
  this.walkFramesRW = [document.getElementById("CrowStandW"),document.getElementById("CrowWalk1W"),document.getElementById("CrowStandW"),document.getElementById("CrowWalk2W")];
  this.flyFramesLW = [document.getElementById("CrowFly1LW"),document.getElementById("CrowFly2LW"),document.getElementById("CrowFly3LW")];
  this.walkFramesLW = [document.getElementById("CrowStandLW"),document.getElementById("CrowWalk1LW"),document.getElementById("CrowStandLW"),document.getElementById("CrowWalk2LW")];

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
  this.friendlyFireCode = 1;    //Can't kill things with the same Friendly Fire code as you.
}
CrowItem.prototype = new ParrotItem();
