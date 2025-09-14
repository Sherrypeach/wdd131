// temples.js — year + last modified + hamburger toggle
const yearSpan=document.querySelector('#year');
const modSpan=document.querySelector('#last-modified');
if(yearSpan) yearSpan.textContent=new Date().getFullYear();
if(modSpan) modSpan.textContent=document.lastModified;

const btn=document.querySelector('#menu-button');
const nav=document.querySelector('#primary-nav');
btn?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
});
