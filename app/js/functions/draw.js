import * as d3 from "d3";
// util
import scrollTo from './scrollTo.js'

// graphics
import words from '../graphics/words.js'
import chords from '../graphics/chords.js'

export default function draw(Stepper) {
  d3.selectAll('.graphic').classed('is-visible', false)

  const resetInterval = () => {
    Stepper.interval && clearInterval(Stepper.interval)
    Stepper.interval = undefined
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  let el;
  switch (Stepper.index) {
    case 0:
      // d3.select('#graphic-hero').attr('class', 'graphic is-visible')
      d3.select('#stepper__controls').attr('class', '')
      resetInterval()
      break;
    case 1:
      // d3.select('#graphic-hero').attr('class', 'graphic is-visible')
      d3.select('#stepper__controls').attr('class', 'demonstration')
      d3.select('#graphic-premiere').attr('class', 'graphic is-visible')
      if (!Stepper.interval) Stepper.interval = scrollTo(Stepper.stepper_graphic.offsetHeight)
      break;
    case 2:
      d3.select('#stepper__controls').attr('class', '')
      d3.select('#graphic-premiere').attr('class', 'graphic is-visible')
      if (!Stepper.interval) Stepper.interval = scrollTo(Stepper.stepper_graphic.offsetHeight)
      break;
    case 3:
      resetInterval()
      d3.select('#graphic-timeline').attr('class', 'graphic is-visible')
      break;
    case 4:
      d3.select('#graphic-books').attr('class', 'graphic is-visible')
      break;
    case 6:
      d3.select('#graphic-steam').attr('class', 'graphic is-visible')
      break;
    case 8:
      d3.select('#graphic-heatmap').attr('class', 'graphic is-visible')
      break;
    case 9:
      resetInterval()
      break;
    case 10:
      words(Stepper, '#graphic-words')
      if (!Stepper.interval) Stepper.interval = scrollTo(Stepper.stepper_graphic.offsetHeight)
      el = d3.select('#graphic-words')
      el.attr('class', 'graphic is-visible')
      break;
    case 11:
      el = d3.select('#graphic-words')
      el.attr('class', 'graphic is-visible colored')
      el
        .transition()
        .duration(1000)
        .style('transform', 'scale(1)')
      if (!Stepper.interval) Stepper.interval = scrollTo(Stepper.stepper_graphic.offsetHeight)
      break;
    case 12:
      resetInterval()
      el = d3.select('#graphic-words')
      el.attr('class', 'graphic is-visible colored')
      let scale = Stepper.dimensions.windowHeight / Number(el.style("height").slice(0, -2))
      el
        .transition()
        .duration(1000)
        .style('transform', `scale(${scale})`)
      break;
    case 13:
      d3.select('#graphic-chords').attr('class', 'graphic is-visible')
      break;
    default:
      // code block
  }

}
