/**
 * Created by melvin on 2/20/2016.
 */
var player = new PIXI.Sprite.fromImage('player.png');
player.anchor.x = .5;//anchors for rotation
player.anchor.y = .5;
var xOrigin = width/2;
var yOrigin = height/2;
var radius = height/6;
var theta = 0;
var thetaIncAmount = 0;
player.rotation = Math.PI/2;//fix inital rotation
player.position.set(xOrigin,yOrigin);
player.width = 20;player.height = 40;//scale by half
player.position.set(xOrigin+(radius*Math.cos(theta)),yOrigin-(radius*Math.sin(theta)));
stage.addChild(player);
function PCMRAnimate(){//60fps
    var animations = setInterval(doDat,16.66667);
    function doDat(){
        /*Player location and rotation*/
        theta += thetaIncAmount;
        player.position.set(xOrigin+(radius*Math.cos(theta)),yOrigin-(radius*Math.sin(theta)));
        player.rotation -= thetaIncAmount;
        /**/
    }
}
PCMRAnimate();

