import * as d3 from "d3";
// functions
import wrap from '../functions/wrap.js'
let colors = require('../../data/colors.json')

export default function books(Stepper, target) {

  let {dimensions: {height, width, margin}} = Stepper

  var svg = d3.select(target)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  const CRWordCount = 3804415
  const bookJson = require('../../data/books.json')

  let slide15Text = document.querySelector('.slide[data-id="15"]').querySelectorAll('.p-inner')[1]
  slide15Text.innerHTML = slide15Text.innerHTML.replace('{{showLength}}', `${CRWordCount.toLocaleString()} words`)


  var x = d3.scaleLinear()
    .domain([0, CRWordCount])
    .range([0, width]);

  let vBase = height/2

  svg
    .append('g')
    .attr('class', 'rects')
    .selectAll("bookRect")
    .data(bookJson)
    .enter()
    .append("rect")
    .attr('x', (d, i) => x(bookJson.slice(0, i).map(d => d.words).reduce((a, b) => a + b, 0)))
    .attr('y', (d, i) => vBase)
    .attr('width', d => x(d.words))
    .attr('height',50)
    .attr('fill', (d, i) => Object.entries(colors)[i + 2][1])
    .attr('stroke', '#343334')
    .attr('stroke-width', 2)
    .attr('class', 'bookRect')

  svg
    .append('g')
    .attr('class', 'lines')
    .selectAll("bookLine")
    .data(bookJson)
    .enter()
    .append("line")
    .attr('x1', (d, i) => x(bookJson.slice(0, i).map(d => d.words).reduce((a, b) => a + b, 0) + (d.words / 2)))
    .attr('y1', vBase + 55)
    .attr('x2', (d, i) => x(bookJson.slice(0, i).map(d => d.words).reduce((a, b) => a + b, 0) + (d.words / 2)))
    .attr('y2', (d, i) => vBase + 65 + (0 * i))
    .attr('stroke', colors.text_main)
    .attr('class', 'bookLine')

  svg
    .append('g')
    .attr('class', 'text')
    .selectAll("bookText")
    .data(bookJson)
    .enter()
    .append("text")
    .attr('x', (d, i) => x(bookJson.slice(0, i).map(d => d.words).reduce((a, b) => a + b, 0) + (d.words / 2)))
    .attr('y', (d, i) => vBase + 80 + (0 * i))
    .attr('fill', colors.text_main)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('class', 'bookText')
    .text(d => d.series)
    .call(wrap, 100)



  svg
    .append('g')
    .attr('class', 'text')
    .selectAll("bookCountLabel")
    .data(bookJson)
    .enter()
    .append("text")
    .attr('x', (d, i) => x(bookJson.slice(0, i).map(d => d.words).reduce((a, b) => a + b, 0) + (d.words / 2)))
    .attr('y', vBase + 30)
    .attr('fill', colors.background)
    .attr('text-anchor', 'middle')
    .attr('font-size', '14px')
    .attr('font-weight', 700)
    .attr('class', 'bookCountLabel')
    .text(d => Stepper.dimensions.device === 'desktop' ? d.words.toLocaleString() : d3.format(".0s")(d.words))


  svg
    .append("rect")
    .attr('x', 0)
    .attr('y', vBase - 60)
    .attr('width', x(CRWordCount))
    .attr('height', 50)
    .attr('fill', colors.MATT)
    .attr('class', 'bookRect')
    .attr('stroke', '#343334')
    .attr('stroke-width', 2)


    svg
      .append('g')
      .attr('class', 'lines')
      .append("line")
      .attr('x1', x(CRWordCount/2))
      .attr('y1', vBase - 65)
      .attr('x2', x(CRWordCount/2))
      .attr('y2', vBase - 75)
      .attr('stroke', colors.text_main)
      .attr('class', 'bookLine')

    svg
      .append('g')
      .attr('class', 'text')
      .append("text")
      .attr('x', x(CRWordCount/2))
      .attr('y', vBase - 80)
      .attr('fill', colors.text_main)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('class', 'CRText')
      .text('Campaign 2')


      svg
        .append('g')
        .attr('class', 'text')
        .append("text")
        .attr('x', x(CRWordCount/2))
        .attr('y', vBase - 30)
        .attr('fill', colors.background)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', 700)
        .attr('class', 'CRText')
        .text(CRWordCount.toLocaleString() + ' words')

}
