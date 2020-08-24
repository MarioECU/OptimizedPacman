// in this code 50ixel represent 1meter
let PACMAN;
let PacmanCanvas;

let angleSlider;
let radiusSlider;

//canvas 
let pacmanSketch= function (ps){
    let posx;
    let posy;
    ps.setup=function(){
	//canvas for the pacman animation
	const w=window.innerWidth*0.5;
	ps.createCanvas(w,w);
	PACMAN = new pacman (9,3,ps.width);
	ps.ellipseMode(ps.CENTER);
    };
    ps.draw= function(){
	
	
	ps.clear()
	ps.fill(255,255,0);
	ps.arc(ps.width/2,ps.height/2,PACMAN.getScaledDiameter(),PACMAN.getScaledDiameter(),ps.PI-PACMAN.angle/2,ps.PI+PACMAN.angle/2);
    };
};
let Sliders= function(sl){

    let oldRadius;
    let oldAngle;
    sl.setup = function (){
	angleSlider=sl.createSlider(0.05,2*sl.PI,sl.PI,0.05);
	radiusSlider=sl.createSlider(1.7,19,1,0.055555);

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
	//console.log("radius: ",PACMAN.radius,"angle: ",PACMAN.angle);
	oldRadius=newRadius;
	oldAngle=newAngle;
    }
};

new p5(pacmanSketch,"pacman");
new p5(Sliders,"sliders");
