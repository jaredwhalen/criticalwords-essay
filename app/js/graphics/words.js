import * as d3 from "d3";
import titleCase from "../functions/titleCase"

// callback
import chords from '../graphics/chords.js'

export default function words(Stepper, target) {


  if (!Stepper.episodeText) {

    d3.select(target)
    .selectAll('.transcript')
    .remove()

    // // REMOVE
    // Stepper.episodeLimit = 120
    // // REMOVE

    let random = Math.floor(Math.random() * Stepper.episodeLimit) + 1

    let ep = Stepper.episodeChoice ? Stepper.episodeChoice : random


    fetch(`https://criticalwordsmongoose.herokuapp.com/api/episodes/e${ep}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        Stepper.episodeText = data

        d3.select(target)
        .selectAll('.transcript')
        .data(Stepper.episodeText.data)
        .enter()
        .append('span')
        .attr('class', d => `transcript ${d.speaker}`)
        .html(d => d.text)

        let randomEpisode = Stepper.episodes.filter(d => d.episode_number == ep)[0]

        document.querySelector('#random-episode').innerHTML = `Let's go with <em>${randomEpisode.episode_number}) "${randomEpisode.episode_title}"</em>`

        chords(Stepper, '#graphic-chords')
      })






      var keys = ["ASHLEY", "TALIESIN", "MARISHA", "TRAVIS", "SAM", "LIAM", "LAURA", "MATT"]

        var legened = d3.select(target)
        .append('div')
        .attr('class', 'flex-legend')
        .selectAll('.flex-legend-item')
        .data(keys.reverse())
        .enter()
        .append('div')
        .attr('class', d => `flex-legend-item ${d}`)
        .html(d => `<div class='flex-legend-item-square'></div> ${titleCase(d)}`)




  }

}
