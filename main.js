// in this code 50ixel represent 1meter
let PACMAN;
let PacmanCanvas;

let angleSlider;
let radiusSlider;

let mouseVel;
//canvas 
let pacmanSketch= function (ps){
    let posx;
    let posy;
    let offset=0;
    let lastPos=null;
    ps.setup=function(){
	//canvas for the pacman animation
	const w=document.getElementById("left").clientWidth;
	const h=document.getElementById("left").clientHeight*0.5;
	ps.createCanvas(w,h);
	PACMAN = new pacman (9,3,ps.width);
	ps.ellipseMode(ps.CENTER);
    };
    ps.draw= function(){
	
	
	ps.clear()
	ps.fill(255,255,0); 
	ps.arc(ps.width/2+offset,ps.height/2,PACMAN.getScaledDiameter(),PACMAN.getScaledDiameter(),ps.PI-PACMAN.angle/2,ps.PI+PACMAN.angle/2);
	var angulo=PACMAN.angle+"";
	angulo=angulo.slice(0,5);
	var radio=PACMAN.radius+"";
	radio=radio.slice(0,5);


	document.getElementById("angle").innerHTML="Angulo: "+angulo;
	document.getElementById("radius").innerHTML="Radio: "+radio;


    };
   

    ps.mouseDragged=function(){
	const pos= ps.mouseX;
	if (lastPos!==null && ps.mouseX <= ps.width && ps.mouseX >= 0 && ps.mouseY <= ps.height && ps.mouseY >= 0){
	    const movement=pos-lastPos;
	    //console.log(offset);
	    lastPos=pos;
	    if (Math.abs(movement)<15){
	    offset+=movement;
	    }
	}
	else{
	    lastPos=pos;
	}
    }

   
    
};
let Sliders= function(sl){

    let oldRadius;
    let oldAngle;
    sl.setup = function (){
	angleSlider=sl.createSlider(0.05,2*sl.PI,sl.PI,0.25);
	radiusSlider=sl.createSlider(1.7,19,1,0.1);

	radiusSlider.value(3);
	angleSlider.value(PACMAN.getOptimalAngle(3));
	oldRadius= radiusSlider.value();
	oldAngle= angleSlider.value();
    };
    sl.draw= function (){
	const newAngle= angleSlider.value();
	const newRadius= radiusSlider.value();
	if (newAngle!== oldAngle){
	    //get new radius and change it
	    tempReadius=PACMAN.getOptimalRadius(newAngle);
	    radiusSlider.value(tempReadius);
	}
	if (newRadius!==oldRadius){
	    //get new angle and change it
	    tempAngle=PACMAN.getOptimalAngle(newRadius);
	    angleSlider.value(tempAngle)

	}
	console.log("radius: ",PACMAN.radius,"angle: ",PACMAN.angle);
	oldRadius=newRadius;
	oldAngle=newAngle;
    }
};

new p5(pacmanSketch,"pacman");
new p5(Sliders,"sliders");
