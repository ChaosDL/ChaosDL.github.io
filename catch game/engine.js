var LEFT = 1; 
var RIGHT = 2;
var SPEED_1 = 8;
var SPEED_2 = 16;
var score = 0;
var combo = 1;
var playState = true;
function bowler(w, h, x, y, img)
{
	var width = w;//150
	var height = h;//150
	//defining hitbox
	this.xmin = x;//0
	this.xmax = this.xmin + width;
	this.ymin = y;//window.innerHeight - height
	this.ymax = this.ymin + 120;
	var bowlerImg = document.createElement("img");
	bowlerImg.src = img;
	bowlerImg.style.position = "fixed";
	bowlerImg.style.top = this.ymin + "px";
	bowlerImg.style.left = this.xmin + "px";
	document.body.appendChild(bowlerImg);
	this.shifted = false;
	this.updateImg = function() 
	{
		bowlerImg.style.left = this.xmin + "px";
	}
	this.updateBowler = function(amount, direction)
	{
		if(direction == LEFT && this.xmin > 0)
		{
			this.xmin -= amount;
		}
		else
		{
			if(this.xmax < window.innerWidth)
			{
				this.xmin += amount;
			}
		}
		this.xmax = this.xmin + width;
		this.updateImg();
	}
	this.movingRight = false;
	this.movingLeft = false;
	var me = this;//for setInterval;
	this.moveBowler = function(speed, direction)
	{
		if(direction == LEFT)
		{
			clearInterval(this.rightMove);
			if(!this.movingLeft)
			{
				this.leftMove = setInterval(function(){if(me.shifted){me.updateBowler(SPEED_2, 	LEFT);} else{me.updateBowler(SPEED_1, LEFT);}}, 5);
			}
			this.movingRight = false;
			this.movingLeft = true;
		}
		if(direction == RIGHT)
		{
			clearInterval(this.leftMove);
			if(!this.movingRight)
			{
				this.rightMove = setInterval(function(){if(me.shifted){me.updateBowler(SPEED_2, RIGHT)} else{me.updateBowler(SPEED_1, RIGHT);}}, 5);
			}
			this.movingLeft = false;
			this.movingRight = true;
		}
	}

}

function move(e, bowler)
{
	if(e.shiftKey)
	{
		bowler.shifted = true;
	}
	//left
	if(e.which == 65)
	{
		bowler.moveBowler(SPEED_1, LEFT);
	}
	//right
	if(e.which == 68)
	{
		bowler.moveBowler(SPEED_1, RIGHT);
		
	}
}
var audio;
var mageImg = document.createElement("img");
function Mages(bowler, x, y)
{
	this.bowler = bowler;
	var ImgNew = document.createElement("img");
	var width = 90;
	var height = 90;
	//defining hitbox
	if(x < 0){this.xmin = 0;}
	else{this.xmin = x;}
	this.xmax = this.xmin + width;
	this.ymin = y;
	this.ymax = this.ymin + 90;
	var ranImg = parseInt(Math.random() * 4) + 1; 
	ImgNew.src = ranImg + ".png";
	ImgNew.style.position = "fixed";
	ImgNew.style.top = this.ymin + "px";
	ImgNew.style.left = this.xmin + "px";
	ImgNew.style.width = width + "px";
	ImgNew.style.height = height + "px";
	ImgNew.className = "imgpulse" + ranImg;
	document.body.appendChild(ImgNew);
	var me = this;
	this.updateImg = function() 
	{
		ImgNew.style.top = me.ymin + "px";
	}
	this.updateMage = function(amount, bowler)
	{
		me.ymin += amount;
		me.ymax = me.ymin + height;
		if(((me.ymax >= bowler.ymin -3) && (me.ymax <= bowler.ymin +3)) && ((me.xmin > bowler.xmin && me.xmin < bowler.xmax) ||( me.xmax < bowler.xmax && me.xmax > bowler.xmin)) )
		{
			fallRate -= 50;
			startIt(fallRate);
			healthAmount += 5;
			if(healthAmount > 100)
			{healthAmount = 100;}
			healthDiv.style.width = healthAmount + "%";
			score += combo * 300;
			scoreDiv.innerHTML = score;
			combo++;
			comboSp.innerHTML = combo + "x";
			document.body.removeChild(ImgNew);
			var flashImg = document.createElement("img");
			flashImg.src = "flash" + ranImg + ".png";
			flashImg.style.position = "fixed";
			flashImg.style.top = bowler.ymin - 150 + "px";
			flashImg.style.left = bowler.xmin + "px";
			flashImg.style.opacity = 1;
			var flashTravel = setInterval(function(){flashImg.style.left = bowler.xmin + "px"; flashImg.style.opacity -= (1/160)}, 5);
			document.body.appendChild(flashImg);
			var audio = new Audio(ranImg + ".wav");
			audio.play();
			setTimeout(function(){clearInterval(flashTravel); document.body.removeChild(flashImg)}, 800);
			clearInterval(me.goDown);
			
		}
		else
		{
			if(me.ymin >= window.innerHeight)
			{
				fallRate = 1000;
				startIt(fallRate);
				var audio = new Audio("combobreak.wav");
				audio.play();
				healthAmount -=7;
				healthDiv.style.width = healthAmount + "%";
				combo = 1;
				comboSp.innerHTML = combo + "x";
				document.body.removeChild(ImgNew);
				clearInterval(me.goDown);
			}
		}
		this.updateImg();
	}
	this.moveMage = function()
	{
		this.goDown = setInterval(function(){me.updateMage(4, me.bowler)}, 10);
	}
}


function moveMK2(e, bowler)
{
	if(e.which == 16)
	{
		bowler.shifted = false;
	}
	if(e.which == 65)
	{
		clearInterval(bowler.leftMove);
		bowler.movingLeft = false;
	}
	//right
	if(e.which == 68)
	{
		clearInterval(bowler.rightMove);
		bowler.movingRight = false;
	}
}
var healthAmount = 100;
function healthDecay(rate)
{
	//rate is health% per sec
	value = rate/100;
	decay = setInterval(function(){
		healthAmount -= value;
		healthDiv.style.width = healthAmount + "%";
		if(healthAmount <= 0)
		{
			playState = !playState;
			gOver = document.createElement("div");
			gOver.innerHTML = "You lost! Ahahahaa!";
			gOver.style.textAlign = "center";
			document.getElementById("bgAud").src = "";
			var audio = new Audio("failsound.wav");
			audio.play();
			document.body.appendChild(gOver);
			healthAmount = 0;
			clearInterval(createDemMages);
			clearInterval(decay);
		}
		}, 10);
		
}