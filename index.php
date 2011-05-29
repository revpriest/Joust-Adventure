<?php 
  $title = "Joust Adventure - Level One";
  if(!isset($prefix)){$prefix="../vPre/";}
  $prefix="";
  require $prefix."header.php" 
?>

    <link rel="stylesheet" media="screen" href="style.css" type="text/css" />
    <script rel="javascript" src="canvasUpdate.js" type="text/javascript" ></script>
    <script rel="javascript" src="physicsItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="aiItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="particleItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="lanceItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="mapBlock.js" type="text/javascript" ></script>
    <script rel="javascript" src="parrotItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="playerItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="meanieItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="bigBadItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="girlfriendItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="sentinelItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="joust.js" type="text/javascript" ></script>
    <h1 id="loading">Loading........</h1>
    <h2 id="subtitle">Adventure - Level One</h1>
    </div>
    <div id="joust">
      <canvas width="800" height="500" id="gameCanvas">
    </div>
    <p id="stringy"></p>
    <div style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden">
      <img src="images/BaboonStand.png" id="BaboonStand" width="10" height="1"/>
      <img src="images/BaboonJump.png" id="BaboonJump" width="10" height="1"/>
      <img src="images/BaboonWalk1.png" id="BaboonWalk1" width="10" height="1"/>
      <img src="images/BaboonWalk2.png" id="BaboonWalk2" width="10" height="1"/>
      <img src="images/BaboonWalk3.png" id="BaboonWalk3" width="10" height="1"/>
      <img src="images/BaboonWalk4.png" id="BaboonWalk4" width="10" height="1"/>
      <img src="images/BaboonStandL.png" id="BaboonStandL" width="10" height="1"/>
      <img src="images/BaboonJumpL.png" id="BaboonJumpL" width="10" height="1"/>
      <img src="images/BaboonWalk1L.png" id="BaboonWalk1L" width="10" height="1"/>
      <img src="images/BaboonWalk2L.png" id="BaboonWalk2L" width="10" height="1"/>
      <img src="images/BaboonWalk3L.png" id="BaboonWalk3L" width="10" height="1"/>
      <img src="images/BaboonWalk4L.png" id="BaboonWalk4L" width="10" height="1"/>
    </div><div style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden">
      <img src="images/PinkMonkeyStand.png" id="PinkMonkeyStand" width="10" height="1"/>
      <img src="images/PinkMonkeyJump.png" id="PinkMonkeyJump" width="10" height="1"/>
      <img src="images/PinkMonkeyStandL.png" id="PinkMonkeyStandL" width="10" height="1"/>
      <img src="images/PinkMonkeyJumpL.png" id="PinkMonkeyJumpL" width="10" height="1"/>
    </div><div style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden">
      <img src="images/SilverbackStand.png" id="SilverbackStand" width="10" height="1"/>
      <img src="images/SilverbackJump.png" id="SilverbackJump" width="10" height="1"/>
      <img src="images/SilverbackWalk1.png" id="SilverbackWalk1" width="10" height="1"/>
      <img src="images/SilverbackWalk2.png" id="SilverbackWalk2" width="10" height="1"/>
      <img src="images/SilverbackWalk3.png" id="SilverbackWalk3" width="10" height="1"/>
      <img src="images/SilverbackWalk4.png" id="SilverbackWalk4" width="10" height="1"/>
      <img src="images/SilverbackStandL.png" id="SilverbackStandL" width="10" height="1"/>
      <img src="images/SilverbackJumpL.png" id="SilverbackJumpL" width="10" height="1"/>
      <img src="images/SilverbackWalk1L.png" id="SilverbackWalk1L" width="10" height="1"/>
      <img src="images/SilverbackWalk2L.png" id="SilverbackWalk2L" width="10" height="1"/>
      <img src="images/SilverbackWalk3L.png" id="SilverbackWalk3L" width="10" height="1"/>
      <img src="images/SilverbackWalk4L.png" id="SilverbackWalk4L" width="10" height="1"/>
    </div><div style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden">
      <img src="images/ParrotStanding.png" id="ParrotStanding" width="10" height="1"/>
      <img src="images/ParrotWalk1.png" id="ParrotWalk1" width="10" height="1"/>
      <img src="images/ParrotWalk2.png" id="ParrotWalk2" width="10" height="1"/>
      <img src="images/ParrotFly1.png" id="ParrotFly1" width="10" height="1"/>
      <img src="images/ParrotFly2.png" id="ParrotFly2" width="10" height="1"/>
      <img src="images/ParrotFly3.png" id="ParrotFly3" width="10" height="1"/>
      <img src="images/ParrotStandingL.png" id="ParrotStandingL" width="10" height="1"/>
      <img src="images/ParrotWalk1L.png" id="ParrotWalk1L" width="10" height="1"/>
      <img src="images/ParrotWalk2L.png" id="ParrotWalk2L" width="10" height="1"/>
      <img src="images/ParrotFly1L.png" id="ParrotFly1L" width="10" height="1"/>
      <img src="images/ParrotFly2L.png" id="ParrotFly2L" width="10" height="1"/>
      <img src="images/ParrotFly3L.png" id="ParrotFly3L" width="10" height="1"/>
    </div><div style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden">
      <img src="images/ParrotStandingW.png" id="ParrotStandingW" width="10" height="1"/>
      <img src="images/ParrotWalk1W.png" id="ParrotWalk1W" width="10" height="1"/>
      <img src="images/ParrotWalk2W.png" id="ParrotWalk2W" width="10" height="1"/>
      <img src="images/ParrotFly1W.png" id="ParrotFly1W" width="10" height="1"/>
      <img src="images/ParrotFly2W.png" id="ParrotFly2W" width="10" height="1"/>
      <img src="images/ParrotFly3W.png" id="ParrotFly3W" width="10" height="1"/>
      <img src="images/ParrotStandingLW.png" id="ParrotStandingLW" width="10" height="1"/>
      <img src="images/ParrotWalk1LW.png" id="ParrotWalk1LW" width="10" height="1"/>
      <img src="images/ParrotWalk2LW.png" id="ParrotWalk2LW" width="10" height="1"/>
      <img src="images/ParrotFly1LW.png" id="ParrotFly1LW" width="10" height="1"/>
      <img src="images/ParrotFly2LW.png" id="ParrotFly2LW" width="10" height="1"/>
      <img src="images/ParrotFly3LW.png" id="ParrotFly3LW" width="10" height="1"/>
    </div><div style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden">
      <img src="images/LanceV.png" id="LanceV" width="10" height="1"/>
      <img src="images/LanceL.png" id="LanceL" width="10" height="1"/>
      <img src="images/LanceR.png" id="LanceR" width="10" height="1"/>
    </div><div style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden">
      <img src="images/birdb-left.png" id="playerFaceLeft" width="10" height="1"/>
      <img src="images/birdb-right.png" id="playerFaceRight" width="10"  height="1"/>
      <img src="images/bird-left.png" id="aiFaceLeft" width="10"  height="1"/>
      <img src="images/bird-right.png" id="aiFaceRight" width="10"  height="1"/>
      <img src="images/block.png" id="mapBlock" width="10"  height="1"/>
      <img src="images/BalloonLeft.png" id="balloonLeft" width="10"  height="1"/>
      <img src="images/BalloonRight.png" id="balloonRight" width="10"  height="1"/>
      <img src="images/BalloonMiddle.png" id="balloonMiddle" width="10"  height="1"/>
      <img src="images/BalloonTop.png" id="balloonTop" width="10"  height="1"/>
      <img src="images/BalloonBottom.png" id="balloonBottom" width="10"  height="1"/>
      <img src="images/BalloonMiddleV.png" id="balloonMiddleV" width="10"  height="1"/>
      <img src="images/background.jpg" id="background" width="10"  height="1"/>
      <img src="images/splat.png" id="splat" width="10"  height="1"/>
      <img src="images/Heart.png" id="heart" width="10"  height="1"/>
      <img src="images/Help.png" id="help" width="10"  height="1"/>
      <img src="images/LevelComplete.png" id="levelComplete" width="10"  height="1"/>
    </div>

<?php require $prefix."footer.php" ?>