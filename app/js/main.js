import makeCard from "./functions/makeCard"
import progressBar from "./functions/progressBar"
import episodeSelect from "./functions/episodeSelect"
import makeGraphics from "./functions/makeGraphics"
import setActive from "./functions/setActive"
import setDimensions from "./functions/setDimensions"


const Stepper = {
  data: require("../data/archie.json"),
  episodes: require('../data/episodes.json'),
  stepper_text: document.querySelector("#stepper__text"),
  stepper_graphic: document.querySelector("#stepper__graphic"),
  count: 0,
  index: 0
}

function init() {
      makeCard(Stepper)
      Stepper.dimensions = setDimensions(Stepper)
      makeGraphics(Stepper)
      Stepper.index = 0;
      setActive(Stepper)
      Stepper.count = document.querySelectorAll(".slide").length
      progressBar(Stepper.index, 0)
      episodeSelect(Stepper)

      tippy('mark.tippy', {
        theme: 'light',
        allowHTML: true
      });
}

const regions = document.getElementsByClassName("region");
function touchHandler() {
  // let {index, count} = Stepper;
  let control = this.getAttribute("data-control");
  Stepper.index ?
  control == 1 ? Stepper.index != Stepper.count - 1 && Stepper.index++ : Stepper.index != 0 && Stepper.index--
  : Stepper.index++
  setActive(Stepper)
  progressBar(Stepper.index, Stepper.count)
};

document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        Stepper.index && Stepper.index--
        setActive(Stepper)
        progressBar(Stepper.index, Stepper.count)
        break;
      case 39:
        Stepper.index < Stepper.count - 1 && Stepper.index++
        setActive(Stepper)
        progressBar(Stepper.index, Stepper.count)
        break;
    }
};

for (var i = 0; i < regions.length; i++) {
  regions[i].addEventListener('click', touchHandler, false);
}

init()
