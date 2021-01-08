import * as d3 from "d3";

export default function cleanup(target) {
  const graphic = d3.select(target).remove()
}
