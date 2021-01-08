// graphics
import hero from '../graphics/hero.js'
import premiere from '../graphics/premiere.js'
import timeline from '../graphics/timeline.js'
import books from '../graphics/books.js'
import heatmap from '../graphics/heatmap.js'
import steam from '../graphics/steam.js'




export default function makeGraphics(Stepper) {

  let {data, stepper_graphic} = Stepper

  const initGraphic = id => {
    let graphic = document.createElement('div');
    graphic.setAttribute("id", id)
    graphic.className += `graphic`
    stepper__graphic.append(graphic)
  }

  const graphicNames = ['hero', 'premiere', 'timeline', 'books', 'steam', 'heatmap', 'words', 'chords']

  graphicNames.forEach(id => initGraphic(`graphic-${id}`))

  hero(Stepper, '#graphic-hero')
  premiere(Stepper, '#graphic-premiere')
  timeline(Stepper, '#graphic-timeline')
  books(Stepper, '#graphic-books')
  steam(Stepper, '#graphic-steam')
  heatmap(Stepper, '#graphic-heatmap')



}
