var LEFT = 1; 
var RIGHT = 2;
var SPEED_1 = 3;
var SPEED_2 = 6;
var score = 0;
function bowler()
{
	var width = 150;
	var height = 150;
	//defining hitbox
	this.xmin = 0;
	this.xmax = this.xmin + width;
	this.ymin = window.innerHeight - height;
	this.ymax = this.ymin + 120;
	var bowlerImg = document.createElement("img");
	bowlerImg.src = "catchperson.png";
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
	this.moveBowler = function(speed, direction)
	{
		if(direction == LEFT)
		{
			clearInterval(this.rightMove);
			if(!this.movingLeft)
			{
				this.leftMove = setInterval(function(){left(speed, LEFT);}, 5);
			}
			this.movingRight = false;
			this.movingLeft = true;
		}
		if(direction == RIGHT)
		{
			clearInterval(this.leftMove);
			if(!this.movingRight)
			{
				this.rightMove = setInterval(function(){right(speed, RIGHT);}, 5);
			}
			this.movingLeft = false;
			this.movingRight = true;
		}
	}

}
//calling this.updateBowler not working so used left and right function
function right(speed, direction)
{
	if(Palpa.shifted)
	{
		Palpa.updateBowler(SPEED_2, RIGHT);
	}
	else{
	Palpa.updateBowler(speed, direction);}
}
function left(speed, direction)
{
	if(Palpa.shifted)
	{
			Palpa.updateBowler(SPEED_2, LEFT);
	}
	else{
	Palpa.updateBowler(speed, direction);}
}
function move(e)
{
	if(e.shiftKey)
	{
		Palpa.shifted = true;
	}
	//left
	if(e.which == 65)
	{
		
		Palpa.moveBowler(SPEED_1, LEFT);
		
	}
	//right
	if(e.which == 68)
	{
		Palpa.moveBowler(SPEED_1, RIGHT);
		
	}
}
function Mages()
{
	var width = 90;
	var height = 90;
	//defining hitbox
	this.xmin = (parseInt(Math.random() * window.innerWidth)) - width;;
	this.xmax = this.xmin + width;
	this.ymin = 0;
	this.ymax = this.ymin + 90;
	var mageImg = document.createElement("img");
	var ranImg = parseInt(Math.random() * 4) + 1; 
	mageImg.src = ranImg + ".png";
	mageImg.style.position = "fixed";
	mageImg.style.top = this.ymin + "px";
	mageImg.style.left = this.xmin + "px";
	mageImg.style.width = width + "px";
	mageImg.style.height = height + "px";
	mageImg.className = "imgpulse" + ranImg;
	document.body.appendChild(mageImg);
	var me = this;
	this.updateImg = function() 
	{
		mageImg.style.top = this.ymin + "px";
	}
	this.updateMage = function(amount)
	{
		this.ymin += amount;
		this.ymax = this.ymin + height;
		if(((this.ymax >= Palpa.ymin -1) && (this.ymax <= Palpa.ymin +1)) && ((this.xmin > Palpa.xmin && this.xmin < Palpa.xmax) ||( this.xmax < Palpa.xmax && this.xmax > Palpa.xmin)) )
		{
			score++;
			scoreDiv.innerHTML = score;
			document.body.removeChild(mageImg);
			clearInterval(goDown);
			
		}
		else
		{
			if(this.ymin == window.innerHeight)
			{
				document.body.removeChild(mageImg);
				clearInterval(goDown);
			}
		}
		this.updateImg();
	}
	this.moveMage = function()
	{
		this.goDown = setInterval(function(){me.updateMage(4)}, 10);
	}
	this.moveMage();
}


function moveMK2(e)
{
	if(e.which == 16)
	{
		Palpa.shifted = false;
	}
	if(e.which == 65)
	{
		clearInterval(Palpa.leftMove);
		Palpa.movingLeft = false;
	}
	//right
	if(e.which == 68)
	{
		clearInterval(Palpa.rightMove);
		Palpa.movingRight = false;
	}
}