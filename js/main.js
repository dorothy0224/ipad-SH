import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

//장바구니!
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  //2.장바구니아이콘 클릭했을때 이벤트상항이 윈도우객체까지 전파되는것을 멈추기때문에 li영역을 클릭하는것은 화면을 클릭하는게 아니게되는것이니까 쇼라는 클래스가 없어지지 않는것이다. 근데> 메뉴영역을 클릭하면 사라져버림.
  //그래서 드롭다운이 있는 상태에서 그메뉴 클릭하는건 종료를 하는것과 같음. 그래서 바스켓이라는 클래스의 드롭다운 메뉴를 클릭했을때는 이벤트 전파가 상위로 올라가지 않게 정지해야함. 
 if (basketEl.classList.contains('show')) {
  hideBasket()
 } else {
  showBasket()
 }
});
//쇼라는 클래스가 붙어있을때에, basketSterterEl클릭하면 쇼라는 클래스를 없애준다(안보이게 해야하니까)
// 만약 쇼라는 클래스가 없는경우에는 버튼을 클릭했을 때 보여줘야되니까 다시 '쇼'클래스를 바스켓El에 붙여야 한다.

basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})
//3. 클릭이 되면 이벤트라는 매개변수에서 이벤트 정지를 호출함. 그래서 드롭다운 메뉴 클릭했을 때, 토글 버튼을 클릭하는게 아니게 되는 것이다.

//1.나머지영역을 클릭했을때 메뉴가 없어지게 하기 위한것.근데> 장바구니 눌러도 숨겨버림(윈도우전체니까)
window.addEventListener('click', function () {
  hideBasket()
})


//함수정리(복잡한 식을 간단하게 추상화한것이다)
function showBasket (){
  basketEl.classList.add('show') 
}

function hideBasket (){
 basketEl.classList.remove('show')  
}



//검색!
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
//search-starter엘리먼트를 클릭하면 showsearch라는 함수를 내부적으로 실행해주면 된다. 실생하는 내용은 addEventLinster내부에서 동작한다. 그것에 대한 기본적인 원리는 자바스크립트콜백함수파트에서 배울수있다. 
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)
//검색바를 클릭했을때 검색바가 보이는구조, 닫기버튼이나 배경그림자 선택했을 때 검색바가 닫혀질수있는 구조

function showSearch(){
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function(){
    searchInputEl.focus()
  }, 600)

}
function hideSearch () {
  headerEl.classList.remove('searching')  
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value=''
}



//요소의 가시성 관찰 (해당 요소가 화면에 보이는지)

const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})


//비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})


//당신에게 맞는 iPad는? 랜더링!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})


const navigationsEl = document.querySelector ('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList += /*html */`<li>
    <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */`
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `

  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()