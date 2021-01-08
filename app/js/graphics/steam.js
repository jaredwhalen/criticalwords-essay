import * as d3 from "d3";

export default function steam(Stepper, target) {

  var keys = ["ASHLEY", "TALIESIN", "MARISHA", "TRAVIS", "SAM", "LIAM", "LAURA", "MATT"]

  let {dimensions: {height, width, margin}} = Stepper

  let colors = require('../../data/colors.json')

    var legened = d3.select(target)
    .append('div')
    .attr('class', 'flex-legend')
    .selectAll('.flex-legend-item')
    .data(keys.reverse())
    .enter()
    .append('div')
    .attr('class', d => `flex-legend-item ${d}`)
    .html(d => `<div class='flex-legend-item-square'></div> ${d}`)

  // append the svg object to the body of the page
  var svg = d3.select(target)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      let data = require('../../data/words_per_player.json')

    // Add X axis
      var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) {
          return Number(d.episode_number);
        }))
        .range([0, width]);

      svg.append("g")
        .attr("class", "axisLabels")
        .attr("transform", "translate(0," + height * 0.2 + ")")
        .call(d3.axisTop(x)
          .tickFormat(d => d == 1 ? 'Episode #1' : '#' + d)
          .tickSize(-height * 0.6)
          .tickValues([1, 25, 50, 75, 100]))
        .select(".domain")
        .remove()



      // Add Y axis
      var y = d3.scaleLinear()
        .domain([-35000, 35000])
        .range([height, 0]);

      // stack the data?
      var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(keys.reverse())
        (data)

      // Area generator
      var area = d3.area()
        .x(function(d) {
          return x(d.data.episode_number);
        })
        .y0(function(d) {
          return y(d[0]);
        })
        .y1(function(d) {
          return y(d[1]);
        })

      // Show the areas
      svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", d => `steam ${d.key}`)
        .attr("opacity", 0.75)
        .style("fill", function(d) { return colors[d.key]; })
        .attr("d", area)
      // .on("mouseover", mouseover)
      // .on("mousemove", mousemove)
      // .on("mouseleave", mouseleave)


}
