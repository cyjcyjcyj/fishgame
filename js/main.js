var can1;
var can2;
var ctx1;
var ctx2;

var canWidth;
var canHeight;
var lastTime;//上帧时间
var deltaTime;//两帧时间差

var mom;
var momTail=[];
var momEye=[];
var momBodyOra=[];
var momBodyBlue=[];



var mx;
var my;

var baby;
var babyTail=[];
var babyEye=[];
var babyBody=[];

var data;

var wave;
var halo;

var dust;
var dustPic=[];

var bgPic = new Image();
var ane;
var fruit;
document.body.onload=game;
function game () {
	 init();
	 lastTime=Date.now();
	 deltaTime=0;
	 gameloop();
}
function init(){
	//获得canvas,新写法要加‘2d’
	can1=document.getElementById("canvas1");
	ctx1=can1.getContext('2d');
	can2=document.getElementById("canvas2");
	ctx2=can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src="./src/background.jpg";

	canWidth=can1.width;
	canHeight=can1.height;

	ane=new aneObj();
	ane.init();

	fruit=new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;

	baby=new babyObj();
	baby.init();

	for(var i=0;i<8;i++)
	{
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}

	for(var i=0;i<2;i++)
	{
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++)
	{
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}
	for(var i=0;i<8;i++)
	{
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++)
	{
		momEye[i]=new Image();
		momEye[i].src="./src/bigEye"+i+".png";
	}
	data=new dataObj();
	for(var i=0;i<8;i++)
	{
		momBodyOra[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOra[i].src="./src/bigSwim"+i+".png";
		momBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
	}

	wave=new waveObj();
	wave.init();
	halo=new haloObj();
	halo.init();


	for(var i=0;i<7;i++)
	{
		dustPic[i]=new Image();
		dustPic[i].src="./src/dust"+i+".png";
	}
	dust=new dustObj();
	dust.init();





}
function gameloop(){
	requestAnimFrame(gameloop);
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40)
		 deltaTime=40;
	
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

    ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();

	momFruitsCollision();
	momBabyCollision();

	baby.draw();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMove(e){
	if(!data.gameOver)
	{
	if(e.offSetX||e.layerX)
	{
		mx=e.offSetX==undefined? e.layerX:e.offSetX;
		my=e.offSetY==undefined? e.layerY:e.offSetY;
		

	}
	}
}