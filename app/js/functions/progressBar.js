export default function progressBar(index, count) {
  const progress = document.querySelector("#stepper__progress-inner")
  const percent = (index ) / (count - 1) * 100 + "%"
  progress.style.width = percent
}
