import * as d3 from "d3";

export default function hideTextOnPress() {
  var onlongtouch;
  var timer;
  var touchduration = 400; //length of time we want the user to touch before we do something
  var text = d3.select("#stepper__text");

  function touchstart(e) {
    // e.preventDefault();
    if (!timer) {
      timer = setTimeout(onlongtouch, touchduration);
    }
  }

  function touchend() {
    //stops short touches from firing the event
    if (timer) {
      clearTimeout(timer);
      timer = null;
      text.style("opacity", 1)

    }
  }


  onlongtouch = function() {
    timer = null;
    text.style("opacity", 0)
  };

  document.addEventListener("DOMContentLoaded", function(event) {
    window.addEventListener("touchstart", touchstart, false);
    window.addEventListener("touchend", touchend, false);
  });
}
