var svg = d3.select("body")	
    .append("svg")
    .attr("width", 600)
    .attr("height", 600);



var circle = svg.append("circle")
	.attr("class", "circ")
    .attr("cx", Math.random() * 600)
    .attr("cy", Math.random() * 600)
    .attr("r", 5 + "px")
    .attr("fill","blue")
    .transition().each("end", function () {
    		console.log(this);
    		myTransf();
		});


function myTransf() {

    d3.select("#circ").transition().duration(500)
        .attr("cx", Math.random() * 600) // change this to random 2px 
    	.attr("cy", Math.random() * 600) // change this to random 2px
        .each("end", function () {
        myTransf();
    });
}