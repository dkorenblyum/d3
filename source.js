var createEnemies = function(n){
     return _.range(0,n).map(function(i){
        return{
            "id" : 'a' + i,
            "cx" : Math.random() * 600,
            "cy" :Math.random() * 600
        }
    });

};

var gameStats = {
    score: 0,
    bestScore: 0
};

var updateScore = function() {
    return d3.select('#current-score').text(gameStats.score.toString());
};

var updateBestScore = function() {
    gameStats.bestScore = _.max([gameStats.bestScore, gameStats.score]);
    return d3.select('#best-score').text(gameStats.bestScore.toString());
};

var onCollision = function() {
    updateBestScore();
    gameStats.score = 0;
    return updateScore();
};

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
    .attr("r", 5)
    .attr("fill","blue")
    // .call(function(d) {
    //     myTransf(d.attr("id"));

    // })
    .transition().tween("end", function (d) {
        // console.log(d.id);
             myTransf(d.id);
    });

    // .transition().each("end", function (d) {
    //          myTransf(d.id);
    // });
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
    .attr("r", 10)
    .attr("fill", "black")
    .call(drag)

var increaseScore = function() {
      gameStats.score += 1;
      return updateScore();
    };
setInterval(increaseScore, 50);


function myTransf(id) {
    d3.selectAll("#"+id).transition().duration(1500).tween("text", function(d) {
            return function(t) {
                var goodGuy = D3_hero;
                var badGuy = d3.select(this);
                var radiusSum;
                var separation;
                var xDiff;
                var yDiff;
                radiusSum = parseFloat(badGuy.attr('r')) + parseFloat(goodGuy.attr("r"));
                xDiff = parseFloat(badGuy.attr('cx')) - parseFloat(goodGuy.attr("cx"));
                yDiff = parseFloat(badGuy.attr('cy')) - parseFloat(goodGuy.attr("cy"));
                separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

                if (separation < radiusSum) {
                    console.log('collision: ', badGuy.attr('id'));
                    onCollision();
                }
            }
    })
        .attr("cx", Math.random() * 600) // change this to random 2px 
        .attr("cy", Math.random() * 600) // change this to random 2px
        .each("end", function () {
        myTransf(id);
    });
}