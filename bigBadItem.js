/*********************************************************** * A meanie is like a player, only the keymap gets set by
* the AI here instead of by actual key-presses.
*/

BigBadItem = function(name,x,y,direction){
  this.init(name,x,y,direction);
  this.halfWidth = 25;
  this.halfHeight = 30;
  this.graphicsOffsetX = 15;
  this.graphicsOffsetY = 10;
  this.faceRightGraphic = document.getElementById("BaboonStand") ;
  this.faceLeftGraphic = document.getElementById("BaboonStandL");
  this.faceRightJumpGraphic = document.getElementById("BaboonJump") ;
  this.faceLeftJumpGraphic = document.getElementById("BaboonJumpL");
  this.walkAnimFrames =  [document.getElementById("BaboonWalk1") ,document.getElementById("BaboonWalk2") ,document.getElementById("BaboonWalk3") ,document.getElementById("BaboonWalk4") ];
  this.walkAnimFramesL = [document.getElementById("BaboonWalk1L"),document.getElementById("BaboonWalk2L"),document.getElementById("BaboonWalk3L"),document.getElementById("BaboonWalk4L")];
  this.delayFrames=0;
  this.animFrame=1;
  this.mortal = false;
  this.flying=null;
  this.noQuittingJump=1;
  this.neverBumpsHead = true;   //Fly straight through platforms!
  this.keyMap = [];
  this.friendlyFireCode = 1;    //Can't kill things with the same Friendly Fire code as you.
  this.neverRemove = true;

  //big bad has a mount. Basically always.
  var p = addPhysicsItem(this.name+"mount",new ParrotItem(this.mount+"mount",this.x,this.y,this.faceDirection)) 
  this.fly(p);
  this.getLance();
  this.mode = this.mode_wait;
  this.modeCount = 60;
  this.targetx = x;
  this.targety = y;
}
BigBadItem.prototype = new MeanieItem();
BigBadItem.prototype.mode_wait = 0;
BigBadItem.prototype.mode_seekGirlfriend = 1;
BigBadItem.prototype.mode_kidnapGirlfriend = 2;



/*********************************************************
* In the first instance, go get the girlfriend, when we
* have her run away! Run away!
*/
BigBadItem.prototype.doAi = function(){
  var g = physicsItems['girlfriend'];
  if(g){
    if(this.mode == this.mode_wait){
      this.seek(this.targetx,this.targety);
      this.modeCount--;
      if(this.modeCount<=0){
        this.mode++;
      } 
    }else if(this.mode == this.mode_seekGirlfriend){
        if(this.distanceTo(g)<32){
          this.mode++;
        }else{
          this.seek(g.x,g.y);
        }
    }else if(this.mode == this.mode_kidnapGirlfriend){
      this.seek(500,player.y-screenHeight-50);
      g.x = this.x;
      g.y = this.y+this.halfHeight*2;
      g.dx=this.dx;
      g.dy=this.dy; 
    }
  }
}




BigBadItem.prototype.die = function(){
}
