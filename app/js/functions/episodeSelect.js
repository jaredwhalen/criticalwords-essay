import progressBar from "./progressBar"
import setActive from "./setActive"


export default function episodeSelect(Stepper) {

  const selectRandom = document.querySelector('#episodes-random')
  const selectChoice = document.querySelector('#episodes-choice')

  Stepper.episodes.forEach(d => {
    let option1 = document.createElement("option");
    let value1 = `${d.episode_number}) "${d.episode_title}"`
    option1.text = value1;
    option1.value = value1;
    selectRandom.append(option1)

    let option2 = document.createElement("option");
    let value2 = `${d.episode_number}) "${d.episode_title}"`
    option2.text = value2;
    option2.value = value2;
    selectChoice.append(option2)
  })


  const lastEpisode = Stepper.episodes[Stepper.episodes.length - 1]
  selectRandom.value = `${lastEpisode.episode_number}) "${lastEpisode.episode_title}"`
  selectChoice.value = `${lastEpisode.episode_number}) "${lastEpisode.episode_title}"`



  selectRandom.addEventListener('change', function() {
    const dummySelect = document.createElement('select');
    dummySelect.classList.add('dummy');
    const dummyOption = document.createElement('option');
    dummyOption.innerHTML = this.value;
    dummySelect.appendChild(dummyOption);
    document.body.appendChild(dummySelect);
    selectRandom.style.width = `${dummySelect.offsetWidth + 15}px`;
    Stepper.episodeLimit = Number(this.value.split(')')[0])
    Stepper.episodeText = undefined
    Stepper.episodeChoice = undefined
    document.querySelector('#random-episode').innerHTML = '<em>Rolling dice…</em>'
    document.body.removeChild(dummySelect);
    document.activeElement.blur()
  });

  selectRandom.dispatchEvent(new Event('change'));

  selectChoice.addEventListener('change', function() {
    const dummySelect = document.createElement('select');
    dummySelect.classList.add('dummy');
    const dummyOption = document.createElement('option');
    dummyOption.innerHTML = this.value;
    dummySelect.appendChild(dummyOption);
    document.body.appendChild(dummySelect);
    selectChoice.style.width = `${dummySelect.offsetWidth + 15}px`;
    Stepper.episodeChoice = Number(this.value.split(')')[0])
    Stepper.episodeText = undefined
    document.querySelector('#random-episode').innerHTML = '<em>Rolling dice…</em>'
    document.body.removeChild(dummySelect);
    Stepper.index = 10;
    setActive(Stepper)
    progressBar(Stepper.index, Stepper.count)
    document.activeElement.blur()
  });

  selectRandom.dispatchEvent(new Event('change'));


}
