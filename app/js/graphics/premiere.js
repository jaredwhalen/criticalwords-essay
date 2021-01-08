import * as d3 from "d3";

export default function premiere(Stepper, target) {
  let data = require('../../data/premiere.json')
  d3.select(target)
  .selectAll('.transcript')
  .data(data.data)
  .enter()
  .append('span')
  .attr('class', d => `transcript ${d.speaker}`)
  .html(d => d.text)
}
