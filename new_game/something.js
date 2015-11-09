var boop = document.getElementById("bop");
var renderer = PIXI.autoDetectRenderer(1280,720, {backgroundColor : 0x1099bb});
boop.appendChild(renderer.view);
var stage = new PIXI.Container;
//..................image,width,height,true/false
function object(texture, wid, hei, inter){
	var skin = PIXI.Texture.fromImage(texture);
	this.thing = function(){return new PIXI.Sprite(skin)};
	this.width = wid;
	this.height = hei;
	this.interactive = inter;
}
function playerControlled(objectPrimary, x, y){
	this.theThing = objectPrimary.thing();
	this.theThing.interactive = objectPrimary.interactive;
	this.theThing.position.set(x,y);
	this.width = objectPrimary.width;
	this.heigt = objectPrimary.height;
	stage.addChild(this.theThing);
}
function statObj(objectPrimary, x, y){
	this.theThing = objectPrimary.thing();
	this.theThing.interactive = objectPrimary.interactive;
	this.theThing.position.set(x,y);
	this.width = objectPrimary.width;
	this.height = objectPrimary.height;
	stage.addChild(this.thing);
}