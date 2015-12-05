// var svg = d3.select("body")	
//     
//     .attr("width", 600)
//     .attr("height", 600);



// var circle = svg.append("circle")
//      .attr("id", "circ")
//    .attr("cx", Math.random() * 600)
//    .attr("cy", Math.random() * 600)
//     .attr("r", 5 + "px")
//     .attr("fill","blue")
//     .transition().each("end", function () {
//     		myTransf();
// 		});

var createEnemies = function(n){
     return _.range(0,n).map(function(i){
        return{
            "id" : 'a' + i,
            "cx" : Math.random() * 600,
            "cy" :Math.random() * 600
        }
    });

};

var enemyArray = createEnemies(30);
console.log('enemyArray: ', enemyArray);

// var renderEnemies(enemyArray) {
//     d3.select("body") 
//     .append("svg")
//     .attr("width", 600)
//     .attr("height", 600)
//     .data(enemyArray)
//     .enter()
//     .append("circle")
// }

d3.select("body") 
.append("svg")
.attr("width", 600)
.attr("height", 600)
.selectAll("svg")
.data(enemyArray)
.enter()
.append("circle")
.attr("id", function(d) {
    return d.id;
})
.attr("cx", function(d) {
    return d.cx;
})
.attr("cy", function(d) {
    return d.cy;
})
.attr("r", 5 + "px")
.attr("fill","blue")
.transition().each("end", function (d) {
    // console.log("this: ", this);
    // console.log("d: ", d);
         myTransf(d.id);
});

function myTransf(id) {
    // d3.select("#circ").transition().duration(500)
    console.log('id: ', id);
    d3.selectAll("#"+id).transition().duration(1500)
        .attr("cx", Math.random() * 600) // change this to random 2px 
        .attr("cy", Math.random() * 600) // change this to random 2px
        .each("end", function () {
        myTransf(id);
    });
}


// var renderEnemeies(enemyArray) {
//     var svg = d3.select("body") 
//     .append("svg")
//     .attr("width", 600)
//     .attr("height", 600);
//     .data(enemyArray, function(d) {
//         d.id
//     })
//     .enter().
//     .attr("r", 5 + "px")
//     .attr("fill","blue")
//     .transition().each("end", function () {
//             myTransf();
//         });
//     .append()
// }