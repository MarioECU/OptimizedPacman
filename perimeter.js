// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    	width = window.innerHeight*0.75*0.9 - margin.left - margin.right,
    	height = window.innerHeight*0.5*0.9 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
	.append("svg")
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  	.append("g")
    	.attr("transform","translate(" + margin.left + "," + margin.top + ")");

var data=[]
for (var i =0.05;i<=20;i+=0.05){
    const y=2*i+18/i;
    data.push({"x":i,"y":y});
}

//Read the daita

  	// Add X axis --> it is a date format
	var x = d3.scaleLinear()
    		.domain([0,20])
    		.range([ 0, width ]);
  	svg.append("g")
    		.attr("transform", "translate(0," + height + ")")
    		.call(d3.axisBottom(x));

	// Add Y axis
  	var y = d3.scaleLinear()
    		.domain([0,40])
    		.range([ height, 0 ]);
  	svg.append("g")
    		.call(d3.axisLeft(y));

  	// This allows to find the closest X index of the mouse:
  	var bisect = d3.bisector(d=>d.x).left;

  	// Create the circle that travels along the curve of chart
  	var focus = svg
    		.append('g')
    		.append('circle')
      		.style("fill", "none")
      		.attr("stroke", "black")
      		.attr('r', 8.5)
      		.style("opacity", 0)

  	// Create the text that travels along the curve of chart
 	var focusText = svg
    		.append('g')
    		.append('text')
      		.style("opacity", 0)
      		.attr("text-anchor", "left")
      		.attr("alignment-baseline", "middle")

  	// Add the line
  	svg
    		.append("path")
    		.datum(data)
    		.attr("fill", "none")
    		.attr("stroke", "steelblue")
    		.attr("stroke-width", 1.5)
    		.attr("d", d3.line()
      			.x(function(d) { return x(d.x); })
      			.y(function(d) { return y(d.y); })
      		)

  	// Create a rect on top of the svg area: this rectangle recovers mouse position
  	svg
    		.append('rect')
    		.style("fill", "none")
    		.style("pointer-events", "all")
    		.attr('width', width)
    		.attr('height', height)
    		.on('mouseover', mouseover)
    		.on('mousemove', mousemove)
    		.on('mouseout', mouseout);


 	 // What happens when the mouse move -> show the annotations at the right positions.
  	function mouseover() {
    		focus.style("opacity", 1)
    		focusText.style("opacity",1)
  	}

  	function mousemove() {
    		// recover coordinate we need
    		var x0 = x.invert(d3.mouse(this)[0]);
    		var i = bisect(data, x0, 1);
		
    		selectedData = data[i]
    		focus
      			.attr("cx", x(selectedData.x))
      			.attr("cy", y(selectedData.y));
    		focusText
      			.html("Radio:" + selectedData.x + "  -  " + "Perimetro:" + selectedData.y)
      			.attr("x", x(selectedData.x)+15)
      			.attr("y", y(selectedData.y));
		//chage sliders
		radiusSlider.value(selectedData.x);


    	}
	setInterval(function update(){
		// recover coordinate we need
    		var x0 = radiusSlider.value();
    		var i = bisect(data, x0, 1);
    		selectedData = data[i]
    		focus
      			.attr("cx", x(selectedData.x))
      			.attr("cy", y(selectedData.y));
    		focusText
      			.html("Radio:" +Math.round(selectedData.x*10000)/10000 + "  -  " + "Perimetro:" +Math.round(selectedData.y*10000)/10000)
      			.attr("x", x(selectedData.x)+15)
      			.attr("y", y(selectedData.y));
		//chage sliders
		radiusSlider.value(selectedData.x);

	
	});
  
  	function mouseout() {
    		focus.style("opacity", 1);
    		focusText.style("opacity", 1);
  	}


