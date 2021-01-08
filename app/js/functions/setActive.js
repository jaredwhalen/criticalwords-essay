import draw from "./draw"

export default function setActive(Stepper) {

  let {index, graphic} = Stepper
  const slides = document.querySelectorAll('.slide');
  var asset;
  slides.forEach(x => {
    x.classList.remove("active")
    if (index == x.dataset.id) {
      x.className += " active"
    }
  })
  draw(Stepper)

}
