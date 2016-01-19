/*
Start creating train lines
 */
//9 positions position in array corresponds to line num
// [x,y]
//to calculate train line pos's, +- to start and end x or start and end y

var linePositionsStart = [[300,675],[650,480],[655,225],[1000,365],[630,570],[630,570],[630,570],[550,355],[740,400]];
var linePositionsEnd = [[515,575],[550,355],[740,400],[700,630],[515,575],[650,480],[700,630],[740,400],[1000,365],];
                        //y           x         x         y         y         x         y         y         y
var deviation = 5;

var graphics = new PIXI.Graphics();
graphics.lineStyle(4, 0xffd900, 1);

for(i=0;i<linePositionsStart.length;i++){
    graphics.lineStyle(4, 0xffd900, 1);
    graphics.moveTo(linePositionsStart[i][0], linePositionsStart[i][1]);
    graphics.lineTo(linePositionsEnd[i][0], linePositionsEnd[i][1]);
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.beginFill(0xFF0000);
    graphics.drawCircle(linePositionsStart[i][0], linePositionsStart[i][1], 5);
    graphics.drawCircle(linePositionsEnd[i][0], linePositionsEnd[i][1], 5);
    graphics.endFill();
}
stage.addChild(graphics);







//testing trains
/*var train = new PIXI.Sprite.fromImage('trains2.png');
train.anchor.x = .5;
train.anchor.y = .5;
train.rotation -= -(3.1415)/2;
train.rotation += Math.atan((575-675)/(515-300));
//var trainCenterModX = 12;
//var trainCenterModY = 39;
train.x = 300; //- trainCenterModX;
train.y = 675; //- trainCenterModY;
stage.addChild(train);

*/

//line, 0-8 to indicate which line


/*
    *parameter line - int from 0 - 8, corresponding to lines 1-9
    *parameter reverse - if true, will move make train move in reverse direction/path
    * DESCRIPTION: animates a train for it's respective path, has the option for reverse movement for realism,
    * train is removed once end point reached.
 */
function animateTrainLine(line, reverse){
    var train = new PIXI.Sprite.fromImage('trains2.png');
    train.anchor.x = .5;
    train.anchor.y = .5;
    train.rotation -= -(Math.PI)/2;
    train.rotation += Math.atan((linePositionsEnd[line][1]-linePositionsStart[line][1])/(linePositionsEnd[line][0]-linePositionsStart[line][0]));
    train.x = linePositionsStart[line][0];
    train.y = linePositionsStart[line][1];
    if(reverse){
        train.x = linePositionsEnd[line][0];
        train.y = linePositionsEnd[line][1];
    }
    stage.addChild(train);
    moveTrain(train, line, reverse);
}
function moveTrain(train, line, reverse){
    var deltx = linePositionsEnd[line][0]-linePositionsStart[line][0];
    var delty = linePositionsEnd[line][1]-linePositionsStart[line][1];
    if(reverse){
        deltx *= -1;
        delty *= -1;
    }
    var count = 0;
    var movement = setInterval(moveDat,16.66667);
    function moveDat(){
        if(count >= 500){
            clearInterval(movement);
            train.destroy();
            stage.removeChild(train);
        }
        else{
            count++;
            train.x += deltx/500;
            train.y += delty/500;
        }
    }
}
animateTrainLine(0);







/*
    making menu
 */
var menuResources = new PIXI.Container();

var moneyImg = new PIXI.Sprite.fromImage('money.png');
moneyImg.width = 50;moneyImg.height = 50;
var moneyText = new PIXI.Text('0', { font: 'bold 35px Courier', fill: '#ccffcc', align: 'center', stroke: '#339966', strokeThickness: 7 });
moneyText.x = 50;

var steelImg = new PIXI.Sprite.fromImage('steel.png');
steelImg.width = 50;steelImg.height = 50;steelImg.y = 50;
var steelText = new PIXI.Text('0', { font: 'bold 35px Technical', fill: '#f2f2f2', align: 'center', stroke: '#333333', strokeThickness: 7 });
steelText.x = 50;steelText.y = 50;


menuResources.addChild(moneyImg);
menuResources.addChild(moneyText);
menuResources.addChild(steelImg);
menuResources.addChild(steelText);

stage.addChild(menuResources);






/*
    use these to update money and steel
 */
function updateMoneyText(totalMoney){
    moneyText.text = totalMoney;
}
function updateSteelText(totalSteel){
    steelText.text = totalSteel;
}
