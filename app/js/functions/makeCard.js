export default function makeCard(Stepper) {

  let {data, stepper_text} = Stepper

  let hero = document.createElement('div');
  hero.setAttribute("data-id", 0)
  hero.className += "hero slide"
  // hero.innerHTML = (`
  //   <div class="hero"><img class="heroImage" src="${data.page.Image}">
  //     <h1>${data.page.Title}</h1>
  //     <div class="pub">
  //       <div class="byline">by<a class="g-link" target="_blank" href="https://www.delawareonline.com/staff/jwhalen/jared-whalen"> ${data.page.Byline}, Delaware News Journal</div>
  //       <div class="pubdate">Published ${data.page.Pub_date}</div>
  //     </div>
  //     <div class="socialIcons padding-bottom-1"><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcontent-static.delawareonline.com%2Fprojects%2Fenvironmental_hazards%2Fbuild%2Findex.html"><i class="fab fa-facebook-f"
  //           style="color: rgb(73, 97, 167);" aria-hidden="true"></i></a><a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fcontent-static.delawareonline.com%2Fprojects%2Fenvironmental_hazards%2Fbuild%2Findex.html" target="_blank" data-popup=""
  //         rel="nofollow"><i class="fab fa-twitter" style="color: rgb(46, 178, 232);" aria-hidden="true"></i></a><a
  //         href="mailto:?subject=Find%20out%20what%20chemicals%20are%20near%20your%20home.&amp;body=https%3A%2F%2Fcontent-static.delawareonline.com%2Fprojects%2Fenvironmental_hazards%2Fbuild%2Findex.html"><i class="fas fa-envelope"
  //           style="color: rgb(138, 137, 137);" aria-hidden="true"></i></a></div>
  //   </div>
  //   `)
  // text.append(hero)


  data.slides.map((item,i) => {
    let slide = document.createElement('div');
    slide.setAttribute("data-id", i)
    slide.className += `slide${item.type ? ' ' + item.type : ''}`
    slide.style.alignSelf = item.alignSelf ? item.alignSelf : 'center'
    if (Stepper.dimensions.device === "mobile" && item.alignSelf) slide.innerHTML = '<div class="hideTextToggle"><i class="fas fa-chevron-down"></i></div>'
    slide.innerHTML += item.text.split('\n').map(d => `<p class="text"><span class='p-inner text'>${d}</span></p>`).join('')
    stepper_text.append(slide)

  }).join(' ')


  document.querySelectorAll('.hideTextToggle').forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault()
      event.target.parentElement.querySelector("i").classList.toggle("flip")
      event.target.parentElement.querySelector("p.text").classList.toggle("hidden")
    })
  })



}

// "Image": "url",
// "title": "Wilmington Under Fire",
// "subtitle": "The cities shootings in five graphics",
// "byline": "Jared Whalen",
// "pub_date": "12/25/2019"
