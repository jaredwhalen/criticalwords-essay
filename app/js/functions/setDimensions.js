export default function setDimensions(Stepper) {




  let dimensions = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  }

  dimensions.height = dimensions.windowHeight * 0.5


  // dimensions.height = document.querySelector('.slide.active') ? dimensions.windowHeight - document.querySelector('.slide.active').offsetHeight : dimensions.windowHeight * 0.9

  dimensions.margin = {
    left: 15,
    right: 15,
    top: dimensions.height * .1,
    bottom: dimensions.height * .1
  }


  let w = window.innerWidth > 800 ? 800 : window.innerWidth
  dimensions.width = w - dimensions.margin.left - dimensions.margin.right

  var mq = window.matchMedia( "(max-width: 570px)" );
  if (mq.matches) {
      dimensions.device = 'mobile'
  }
  else {
      dimensions.device = 'desktop'
  }



  return dimensions
}
