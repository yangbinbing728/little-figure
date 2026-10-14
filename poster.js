// Scroll progress drives one shared index: number, image, text, and link.
const exhibition = document.querySelector('.exhibition');
const stage = document.querySelector('.stage');
const images = [...document.querySelectorAll('.artwork img')];
const articles = [...document.querySelectorAll('.copy-stack article')];
const buttons = [...document.querySelectorAll('.steps button')];
const names = ['ON THE STREET','AT THE STOP','UNDER THE CITY'];
let current = -1;
function update() {
  const length = exhibition.offsetHeight - stage.offsetHeight;
  const progress = Math.max(0, Math.min(1, -exhibition.getBoundingClientRect().top / length));
  const index = Math.min(2, Math.floor(progress * 3));
  stage.style.setProperty('--progress', progress);
  if (index === current) return;
  current = index;
  document.querySelector('.number-strip').style.transform = `translateY(-${index * 100 / 3}%)`;
  images.forEach((el,i) => {el.classList.toggle('active',i===index);el.setAttribute('aria-hidden',String(i!==index));});
  articles.forEach((el,i) => {el.classList.toggle('active',i===index);el.setAttribute('aria-hidden',String(i!==index));});
  buttons.forEach((el,i) => el.setAttribute('aria-pressed',String(i===index)));
  document.querySelector('.counter').textContent = `0${index+1} / 03 — ${names[index]}`;
}
let pending = false;
addEventListener('scroll', () => {if(!pending){pending=true;requestAnimationFrame(()=>{update();pending=false;});}}, {passive:true});
addEventListener('resize',update);
buttons.forEach((button,index)=>button.addEventListener('click',()=>{
  const top = exhibition.getBoundingClientRect().top + scrollY;
  scrollTo({top:top+(exhibition.offsetHeight-stage.offsetHeight)*((index+.15)/3),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
update();
// Difference blends the orange cursor with the actual colour beneath it.
const orb=document.querySelector('.cursor-orb');
if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
  addEventListener('pointermove',event=>{orb.style.opacity='1';orb.style.transform=`translate(${event.clientX}px,${event.clientY}px) translate(-50%,-50%)`;orb.classList.toggle('over-link',!!event.target.closest('a,button'));},{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>orb.style.opacity='0');
}
