export default function episodeSelect(Stepper) {
  const select = document.querySelector('#episodes')
  Stepper.episodes.forEach(d => {
    let option = document.createElement("option");
    let value = `${d.episode_number}) "${d.episode_title}"`
    option.text = value;
    option.value = value;
    select.append(option)
  })
  const lastEpisode = Stepper.episodes[Stepper.episodes.length - 1]
  select.value = `${lastEpisode.episode_number}) "${lastEpisode.episode_title}"`

  select.addEventListener('change', function() {
    const dummySelect = document.createElement('select');
    dummySelect.classList.add('dummy');
    const dummyOption = document.createElement('option');
    dummyOption.innerHTML = this.value;
    dummySelect.appendChild(dummyOption);

    document.body.appendChild(dummySelect);
    select.style.width = `${dummySelect.offsetWidth + 15}px`;

    Stepper.episodeLimit = Number(this.value.split(')')[0])
    Stepper.episodeText = undefined
    document.querySelector('#random-episode').innerHTML = '<em>Rolling dice…</em>'
    document.body.removeChild(dummySelect);
  });
  select.dispatchEvent(new Event('change'));

}
