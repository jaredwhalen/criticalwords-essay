import * as d3 from "d3";
// data
let colors = require('../../data/colors.json')

export default function heatmap(Stepper, target) {

  // set the dimensions and margins of the graph

  let {
    dimensions: {
      height,
      width,
      graphicHeight,
      margin
    }
  } = Stepper


  const lines = JSON.parse(require('../../data/lines_bool.json'))

  const shuffled = lines.sort(() => 0.5 - Math.random())
  let selected = shuffled.slice(0, 4).sort((a, b) => Number(a.episode_number) - Number(b.episode_number))

  var base = d3.select(target);
  var chart = base.append("canvas")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  var context = chart.node().getContext("2d");

  let rowSpacer = 70
  let vBase = height / 4

  selected.forEach((d, r) => {

    var scale = d3.scaleLinear()
      .range([10, width])
      .domain([1, d.data.length]);

    d.data.forEach((b, i) => {
      context.beginPath();
      context.rect((margin.left - 5) + scale(i), vBase + (rowSpacer * r), (width / d.data.length), 40);
      context.fillStyle = b ? colors.TRAVIS : colors.MATT;
      context.fill();
      context.closePath();
    })
  })


  // draw labels
  var svg = base
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("position", "absolute")
    .style("top", 0)
    .style("left", 0)
    .append("g")


  svg
    .append('g')
    .attr('class', 'text')
    .selectAll("heatmapText")
    .data(selected)
    .enter()
    .append("text")
    .attr('x', margin.left + 10)
    .attr('y', (d, i) => vBase + (i * rowSpacer) - 5)
    .attr('fill', colors.text_main)
    .attr('font-size', '12px')
    .attr('class', 'heatmapText')
    .attr('font-style', 'italic')
    .text(d => `${d.episode_number}) "${d.episode_title}"`)







}
