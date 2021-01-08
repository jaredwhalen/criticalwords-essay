import * as d3 from "d3";

// functions
const makeMatrix = (data, names) => {
  const index = new Map(names.map((name, i) => [name, i]));
  const matrix = Array.from(index, () => new Array(names.length).fill(0));
  for (const {
      source,
      target,
      value
    } of data) matrix[index.get(source)][index.get(target)] += value;
  return matrix;
}

export default function chords(Stepper, target) {


  // set the dimensions and margins of the graph
  let {
    dimensions: {
      height,
      width,
      graphicHeight,
      margin
    }
  } = Stepper

  // clone the episode text and remove any incidents of OTHER
  let lines = JSON.parse(JSON.stringify(Stepper.episodeText.data))
    .filter(l => l.speaker != 'OTHER')

  // get the names array
  var names = [];
  for (let i = 0; i < lines.length; i++) {
    if (names.indexOf(lines[i].speaker) === -1) {
      names.push(lines[i].speaker);
    }
  }

  // prepare lines for conversion
  lines.forEach((l, i) => {
    // lines[i].value = l.text.split(' ').length
    lines[i].value = 1
    lines.length > (i + 1) ? lines[i].target = lines[i + 1].speaker : undefined
    lines[i]['source'] = lines[i]['speaker'];
    delete lines[i].text
    delete lines[i].speaker
  })

  // filter any incidents where the source and target are the same
  lines = lines
    .filter(l => l.source != l.target)

  let matrix = makeMatrix(lines, names)

  d3.select(target).html('')
  // append the svg object to the body of the page
  var svg = d3.select(target)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

var wrapper = svg
.append("g")
.attr("transform",
  "translate(" + (width + margin.left + margin.right) / 2 + "," + (height + margin.top + margin.bottom) / 2 + ")");

  var innerRadius = Math.min(width, height) * .39
  var outerRadius = innerRadius * 1.1;

    var opacity = [1, 1, 0.3, 1, 1, 1]

    var chordGenerator = d3.chord()
      .padAngle(0.1)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending)
      // .sortGroups(d3.descending)


      var chord = chordGenerator(matrix);


        var arcs = d3.arc()
          .innerRadius(innerRadius * 1.01)
          .outerRadius(outerRadius);

      var ribbon = d3.ribbon()
        .radius(innerRadius);

      var opacities = d3.scaleOrdinal()
        .domain(d3.range(6))
        .range(opacity)

        let colors = require('../../data/colors.json')

        let colorsArr = names.map(n => colors[n])

        let color = d3.scaleOrdinal()
          .domain(d3.range(names.length))
          .range(colorsArr);

      // creating the fill gradient
      function getGradID(d){ return "linkGrad-" + d.source.index + "-" + d.target.index; }


      var grads = svg.append("defs")
        .selectAll("linearGradient")
        .data(chord)
        .enter()
        .append("linearGradient")
        .attr("id", getGradID)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", function(d, i){ return innerRadius * Math.cos((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
        .attr("y1", function(d, i){ return innerRadius * Math.sin((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2); })
        .attr("x2", function(d,i){ return innerRadius * Math.cos((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })
        .attr("y2", function(d,i){ return innerRadius * Math.sin((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2); })

        // set the starting color (at 0%)
        // grads.append("stop")
        //   .attr("offset", "0%")
        //   .attr("stop-color", function(d){ return color(d.target.index)})
        //   //set the ending color (at 100%)
        // grads.append("stop")
        //   .attr("offset", "100%")
        //   .attr("stop-color", function(d){ return color(d.source.index)})

        grads.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", function(d){ return color(d.source.index)})
          //set the ending color (at 100%)
        grads.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", function(d){ return color(d.target.index)})


      // making the ribbons
      wrapper
        .selectAll("path")
        .data(chord)
        .enter()
        .append("path")
        .attr("class", function(d) {
          return "chord chord-" + d.source.index + " chord-" + d.target.index // The first chord allows us to select all of them. The second chord allows us to select each individual one.
        })
        .style("fill", function(d){ return "url(#" + getGradID(d) + ")"; })
        .attr("d", ribbon)
        // .style("stroke", function(d){ return d3.rgb(color(d.target.index)).darker(); })
        // .style("opacity", function(d){
        //   if(d.source.index == 5 || d.target.index == 5){ // here we need to select the source and the target. Here we are selecting pheobe
        //     return 1
        //   } else {
        //     return 0.1
        //   }
        // })
        .style("opacity", 0.5)

        // making the arcs
      var g = wrapper.selectAll("g")
        .data(chord.groups)
        .enter()
        .append("g")
        .attr("class", "group")


      g.append("path")
        .style("fill", function(d){ return color(d.index)})
        // .style("stroke", function(d){ return d3.rgb(color(d.index)).darker(); })
        .attr("d", arcs)
        .style("opacity", 1)


      /// adding labels
      g.append("text")
        .each(function(d){ d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", ".35em")
        .attr("class", "titles")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + (outerRadius + 10) + ")"
          + (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .text(function(d,i){ return names[i]; })
        .style("font-size", "15px")
        .attr("fill", (d, i) => colors[names[i]])

        wrapper
          .append("text")
          .attr('x', 0)
          .attr('y', (height / -2) - 15)
          .attr('fill', colors.text_main)
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('class', 'chordText')
          .attr('font-style', 'italic')
          .text(`${Stepper.episodeText.episode_number.slice(1)}) "${Stepper.episodeText.episode_title}"`)


}
