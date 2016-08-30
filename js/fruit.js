var fruitObj=function(){
	 this.alive=[];
	 this.x=[];
	 this.y=[];
	 this.l=[];
	 this.spd=[];
	 this.fruitTyp=[];
	 this.orange=new Image();
	 this.blue=new Image();
	 this.aneNo=[];
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++)
	{

		this.alive[i]=false ;
		this.x[i]=0;
		this.y[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;
		this.fruitTyp[i]="";
		this.aneNo[i]=0;
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";

}
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++)
	{
		
		if(this.alive[i])
		{ 
			if(this.fruitTyp[i]=="blue")
			{
				var pic=this.blue;
			}
			else
			{
				var pic =this.orange;
			}

		     if(this.l[i]<=14)
		    {
		    	var No=this.aneNo[i];
		    	this.x[i]=ane.headx[No];
				this.y[i]=ane.heady[No];
		    	this.l[i]+=this.spd[i]*deltaTime;
		    }
		     else
		     	{
		     		this.y[i]-=this.spd[i]*7*deltaTime;
		     	}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
	        if(this.y[i]<10)
	        {
	        	this.alive[i]=false;
	        }
	     }
	}

}
fruitObj.prototype.born=function(i){

	this.aneNo[i]=Math.floor(Math.random()*ane.num);//随机找一株海葵生长
	
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.2)
	{this.fruitTyp[i]="blue";}
	else{
		this.fruitTyp[i]="orange";
	}

}
fruitObj.prototype.update=function(){


	var num=0;
	for(var i=0;i<this.num;i++)
	{
		if(this.alive[i])
			num++;
	}
}
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;

}
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++)
	{

		if(fruit.alive[i])
			num++;
		
	}
	if(num<15)
	{

		sendFruit();
		return;
	}


}
function sendFruit(){

	for(var i=0;i<fruit.num;i++)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;
		}
	}
}