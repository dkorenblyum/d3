var createEnemies = function(n){
     return _.range(0,n).map(function(i){
        return{
            "id" : 'a' + i,
            "cx" : Math.random() * 600,
            "cy" :Math.random() * 600
        }
    });

};

function myTransf(id) {
    // console.log('id: ', id);
    d3.selectAll("#"+id).transition().duration(1500).tween("text", function(d) {
       var x = D3_hero.attr('cx');
       var y = D3_hero.attr('cy');
       console.log(x,y);
        // return d.id
    })
        .attr("cx", Math.random() * 600) // change this to random 2px 
        .attr("cy", Math.random() * 600) // change this to random 2px
        .each("end", function () {
        myTransf(id);
    });
}



var D3_bodySelection = d3.select("body") 
    .append("svg")
    .attr("width", 600)
    .attr("height", 600)

var enemyArray = createEnemies(30);

var D3_enemies = D3_bodySelection.selectAll("svg")
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
             myTransf(d.id);
    });
// });

var drag = d3.behavior.drag()  
    .on('dragstart', function() { D3_hero.style('fill', 'red'); })
    .on('drag', function() { D3_hero.attr('cx', d3.event.x)
    .attr('cy', d3.event.y); })
    .on('dragend', function() { D3_hero.style('fill', 'black'); });


D3_hero = D3_bodySelection.selectAll("svg")
    .data([1])
    .enter()
    .append("circle")
    .attr("id", "hero")
    .attr("cx", 10) 
    .attr("cy", 10)
    .attr("r", 10 + "px")
    .attr("fill", "black")
    .call(drag)


//   .on("dragstart", function () {
//     console.log(arguments);
//   })



// // experiment



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