<?php 
  $title = "Joust Adventure - Level One";
  require "header.php" 
?>

    <link rel="stylesheet" media="screen" href="style.css" type="text/css" />
    <script rel="javascript" src="canvasUpdate.js" type="text/javascript" ></script>
    <script rel="javascript" src="physicsItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="aiItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="particleItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="lanceItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="mapBlock.js" type="text/javascript" ></script>
    <script rel="javascript" src="parrotItem.js" type="text/javascript" ></script>
    <script rel="javascript" src="crowItem.js" type="text/javascript" ></script>
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
        <h1>Old Browser</h1>
        <p>Sorry, this is a HTML 5 game and your browser is too
           old or incompatible to use the &lt;canvas&gt; element.</p>
        <p>Try using the latest version of <a href="http://www.mozilla.com/en-US/firefox/new/">Firefox</a>, 
           <a href="http://www.google.com/chrome/">Chrome</a>,
           <a href="http://www.apple.com/safari/">Safari</a>,
           or even <a href="http://www.opera.com/">Opera</a> 
           (though it seems a bit slow and rubbish on Opera).</p>
           <p>I'm told it might work on IE9, but I don't have a windows 
           machine so I can't tell. Let me know (though if it's working I 
           guess you can't see this)</p>
      </canvas>
    </div>
    <p>Use the cursor keys to move the monkey. Collect yourself a parrot, and
       a stick, and start jousting to the rescue. In head-on collisions, highest joust wins.</p>
    <p><a href="http://en.wikipedia.org/wiki/Copyright">Copyright</a> <a href="http://en.wikipedia.org/wiki/2011">2011</a> <a href="http://dalliance.net/">Adam Priest</a> - <a href="http://www.gnu.org/licenses/gpl.html">GPL Licenced</a> - <a href="https://github.com/revpriest/Joust-Adventure">Source Code Available</a>.</p>
    <p>If it seems slow, try updating your browser. This years browsers have much faster javascript execution.</p>
    <p id="stringy"></p>
    <p id="complete">Loading...</p>
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
      <img src="images/AlienStand.png" id="AlienStand" width="10" height="1"/>
      <img src="images/AlienSit.png" id="AlienSit" width="10" height="1"/>
      <img src="images/AlienJump.png" id="AlienJump" width="10" height="1"/>
      <img src="images/AlienWalk1.png" id="AlienWalk1" width="10" height="1"/>
      <img src="images/AlienWalk2.png" id="AlienWalk2" width="10" height="1"/>
      <img src="images/AlienStandL.png" id="AlienStandL" width="10" height="1"/>
      <img src="images/AlienSitL.png" id="AlienSitL" width="10" height="1"/>
      <img src="images/AlienJumpL.png" id="AlienJumpL" width="10" height="1"/>
      <img src="images/AlienWalk1L.png" id="AlienWalk1L" width="10" height="1"/>
      <img src="images/AlienWalk2L.png" id="AlienWalk2L" width="10" height="1"/>
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
      <img src="images/CrowStand.png" id="CrowStand" width="10" height="1"/>
      <img src="images/CrowWalk1.png" id="CrowWalk1" width="10" height="1"/>
      <img src="images/CrowWalk2.png" id="CrowWalk2" width="10" height="1"/>
      <img src="images/CrowFly1.png" id="CrowFly1" width="10" height="1"/>
      <img src="images/CrowFly2.png" id="CrowFly2" width="10" height="1"/>
      <img src="images/CrowFly3.png" id="CrowFly3" width="10" height="1"/>
      <img src="images/CrowStandL.png" id="CrowStandL" width="10" height="1"/>
      <img src="images/CrowWalk1L.png" id="CrowWalk1L" width="10" height="1"/>
      <img src="images/CrowWalk2L.png" id="CrowWalk2L" width="10" height="1"/>
      <img src="images/CrowFly1L.png" id="CrowFly1L" width="10" height="1"/>
      <img src="images/CrowFly2L.png" id="CrowFly2L" width="10" height="1"/>
      <img src="images/CrowFly3L.png" id="CrowFly3L" width="10" height="1"/>
    </div><div style="position:absolute;top:0px;left:0px;width:1px;height:1px;visibility:hidden">
      <img src="images/CrowStandW.png" id="CrowStandW" width="10" height="1"/>
      <img src="images/CrowWalk1W.png" id="CrowWalk1W" width="10" height="1"/>
      <img src="images/CrowWalk2W.png" id="CrowWalk2W" width="10" height="1"/>
      <img src="images/CrowFly1W.png" id="CrowFly1W" width="10" height="1"/>
      <img src="images/CrowFly2W.png" id="CrowFly2W" width="10" height="1"/>
      <img src="images/CrowFly3W.png" id="CrowFly3W" width="10" height="1"/>
      <img src="images/CrowStandLW.png" id="CrowStandLW" width="10" height="1"/>
      <img src="images/CrowWalk1LW.png" id="CrowWalk1LW" width="10" height="1"/>
      <img src="images/CrowWalk2LW.png" id="CrowWalk2LW" width="10" height="1"/>
      <img src="images/CrowFly1LW.png" id="CrowFly1LW" width="10" height="1"/>
      <img src="images/CrowFly2LW.png" id="CrowFly2LW" width="10" height="1"/>
      <img src="images/CrowFly3LW.png" id="CrowFly3LW" width="10" height="1"/>
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
      <img src="images/ClickToPlay.png" id="clickToPlay" width="10"  height="1"/>
    </div>

<?php require $prefix."footer.php" ?>
