var Obstacles=[];
var music;
var score=0;
function startGame(){
	music=new sound('sounds/hit.wav');
	Piece = new createComponent(30,30,'images/ball.png',10,120,"image");
	GameArea.start();
}

var GameArea={
	canvas:document.createElement("canvas"),
	start:function(){
		this.frames = 0;
		this.canvas.width=500;
		this.canvas.height=300;
		this.context=this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		//document.getElementById("body").appendChild(this.canvas);
		this.interval = setInterval(updateGameArea, 20);
		 window.addEventListener('keydown', function (e) {
      GameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      GameArea.key = false;
    })
	},
	clear:function(x,y,rad){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
	},
	stop : function() {
    clearInterval(this.interval);
  }
}

function everyintervalcheck(n) {
  if ((GameArea.frames / n) % 1 == 0) {return true;}
  return false;
}

function updateGameArea() {
	score+=1;
	var x, y, gap, minHeight, maxHeight, minGap, maxGap;
    	for (i = 0; i < Obstacles.length; i += 1) {
			if (Piece.collide(Obstacles[i])) {
				
				GameArea.stop();
				music.play();
				document.getElementById("h1").innerHTML="Score : "+score+"<br>Game Over!!!<br>Better Luck Next Time.";
				document.getElementById("tryagain").setAttribute("style","visibility:visible");

			} 
		}
		GameArea.clear();
		GameArea.frames+=1;
  		Piece.speedX = 0;
  		Piece.speedY = 0; 
  		if (GameArea.key && GameArea.key == 37) {Piece.speedX = -1; }
		if (GameArea.key && GameArea.key == 39) {Piece.speedX = 1; }
		if (GameArea.key && GameArea.key == 38) {Piece.speedY = -1; }
  		if (GameArea.key && GameArea.key == 40) {Piece.speedY = 1; }
	
		if (GameArea.frames == 1 || everyintervalcheck(100)) {
			minHeight=20;
			maxHeight=200;
			y = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			minGap = 50;
    		maxGap = 200;
        	x = GameArea.canvas.width;
        	gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        	Obstacles.push(new createComponent(10, y, "green", x, 0));
			Obstacles.push(new createComponent(10, x - y - gap, "green", x,y + gap));
		}
	
    	for (i = 0; i < Obstacles.length; i += 1) {
			Obstacles[i].x += -1;
			Obstacles[i].update();
		}
  		Piece.newPos(); 
  		Piece.update();
	
}

function createComponent(width, height, color, x, y,type){
	if(type=="image"){
		this.image=new Image();
		this.image.src=color;
	}
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.speedX = 0;
    this.speedY = 0;
	this.color=color;
	this.update=function(){
	ctx = GameArea.context;
		if (type == "image") {
			ctx.drawImage(this.image,this.x,this.y,this.width, this.height);
    }
		else{
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    } 
	this.collide=function(obj){
	var left = this.x;
    var right = this.x + (this.width);
    var top = this.y;
    var bottom = this.y + (this.height);
    var otherleft = obj.x;
    var otherright = obj.x + (obj.width);
    var othertop = obj.y;
    var otherbottom = obj.y + (obj.height);
    var crash = true;
    if ((bottom < othertop) || (top > otherbottom) || (right < otherleft) || (left > otherright)) {
      crash = false;
    }
    return crash;
  }
	
	}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

document.getElementById("tryagain").addEventListener('click',function(){
	Obstacles=[];
	startGame();
	score=0;
	document.getElementById("h1").innerHTML='';
	document.getElementById("tryagain").setAttribute("style","visibility:hidden");
});