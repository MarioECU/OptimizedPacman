class pacman{
    constructor (area,startRadius,fit ){
	this.radius= startRadius;
	this.doblearea=area*2;
	this.angle =this.getOptimalAngle(startRadius);
	this.scale=(4*fit)/(6*3*this.radius);
    };
    getOptimalRadius(angle){
	//some function for the radius in term of the angle
	this.angle=angle;
	this.radius=Math.pow(this.doblearea/angle,0.5);
	//console.log("this is the new radius :", this.radius);
	return this.radius;


    }
    getOptimalAngle(radius){
	//somre function for the angle in terms of the radius
	this.radius=radius;
	this.angle= this.doblearea/Math.pow(radius,2);
	return this.angle;


    }

    getScaledRadius(){return this.radius*this.scale;}
    getScaledDiameter(){return 2*this.radius*this.scale;}
    getScalesArea(){return this.area*Math.pow(this.scale,2)}

};
