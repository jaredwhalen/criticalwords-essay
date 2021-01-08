export default function setDimensions(Stepper) {

  let dimensions = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  }

  dimensions.height = dimensions.windowHeight * 0.5

  dimensions.margin = {
    left: 20,
    right: 20,
    top: dimensions.height * .1,
    bottom: dimensions.height * .1
  }


  let w = window.innerWidth > 800 ? 800 : window.innerWidth
  dimensions.width = w - dimensions.margin.left - dimensions.margin.right


  return dimensions
}
