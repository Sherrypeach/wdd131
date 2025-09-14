// temples.js — Cas Perche
const yearSpan = document.querySelector('#year');
const modSpan = document.querySelector('#last-modified');
yearSpan.textContent = new Date().getFullYear();
modSpan.textContent = document.lastModified;

const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.classList.toggle('x', isOpen);
});

// Optional small animation for the hamburger to X
const style = document.createElement('style');
style.textContent = `
.menu-button.x .bar:nth-child(1){ transform: translateY(6px) rotate(45deg); transform-origin:center; transition: transform .2s ease }
.menu-button.x .bar:nth-child(2){ opacity:0; transition: opacity .2s ease }
.menu-button.x .bar:nth-child(3){ transform: translateY(-6px) rotate(-45deg); transform-origin:center; transition: transform .2s ease }
`;
document.head.appendChild(style);
