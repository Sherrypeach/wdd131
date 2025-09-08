// WDD 131 – W01 JavaScript
// Why defer? It lets the HTML parse first so we can safely query elements below.
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastMod = document.getElementById('lastModified');
if (lastMod) {
  lastMod.textContent = `Last Modified: ${document.lastModified}`;
}
