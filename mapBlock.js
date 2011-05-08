/********************************************************
* The Map Block just hangs there, defying gravity.
*/

function MapBlock(name,x,y,w,h,html,background){
  this.init(name,x,y);
  this.halfWidth = w/2;
  this.halfHeight = h/2;
  this.div.style.width = w+"px";
  this.div.style.height = h+"px";
  this.div.className+=" mapblock";
  if(html){
    this.div.innerHTML = html;
  }else{
    this.div.innerHTML = "&nbsp;";
  }
  if(background){
    this.div.style.background=background;
  }
}
MapBlock.prototype = new PhysicsItem();
MapBlock.prototype.solid=true;

/***********************************************
* Map blocks do not fall, they just hang there.
*/
MapBlock.prototype.fallUnderGravity = function(){
}

