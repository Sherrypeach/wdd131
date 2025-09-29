// filtered-temples.js

const temples = [
  { templeName: "Salt Lake Temple", location: "Salt Lake City, Utah, USA", dedicated: "1893-04-06", area: 382207, imageUrl: "temple-images-jpg/salt-lake-temple.jpg" },
  { templeName: "Nauvoo Illinois Temple (Original)", location: "Nauvoo, Illinois, USA", dedicated: "1846-04-30", area: 54000, imageUrl: "temple-images-jpg/nauvoo-illinois-temple.jpg" },
  { templeName: "San Diego California Temple", location: "San Diego, California, USA", dedicated: "1993-04-25", area: 72600, imageUrl: "temple-images-jpg/san-diego-california-temple.jpg" },
  { templeName: "Rome Italy Temple", location: "Rome, Italy", dedicated: "2019-03-10", area: 40713, imageUrl: "temple-images-jpg/rome-italy-temple.jpg" },
  { templeName: "Laie Hawaii Temple", location: "Laie, Hawaii, USA", dedicated: "1919-11-27", area: 42000, imageUrl: "temple-images-jpg/laie-hawaii-temple.jpg" },
  { templeName: "Provo City Center Temple", location: "Provo, Utah, USA", dedicated: "2016-03-20", area: 85000, imageUrl: "temple-images-jpg/provo-city-center-temple.jpg" },
  { templeName: "Paris France Temple", location: "Le Chesnay, France", dedicated: "2017-05-21", area: 44175, imageUrl: "temple-images-jpg/paris-france-temple.jpg" },
  { templeName: "Draper Utah Temple", location: "Draper, Utah, USA", dedicated: "2009-03-20", area: 166558, imageUrl: "temple-images-jpg/draper-utah-temple.jpg" },
  { templeName: "Port-au-Prince Haiti Temple", location: "Port-au-Prince, Haiti", dedicated: "2019-09-01", area: 10000, imageUrl: "temple-images-jpg/port-au-prince-haiti-temple.jpg" },
  { templeName: "Arequipa Peru Temple", location: "Arequipa, Peru", dedicated: "2019-12-15", area: 26969, imageUrl: "temple-images-jpg/arequipa-peru-temple.jpg" },
  { templeName: "Bern Switzerland Temple", location: "Zollikofen, Bern, Switzerland", dedicated: "1955-09-11", area: 35546, imageUrl: "temple-images-jpg/bern-switzerland-temple.jpg" },
  { templeName: "Vancouver Canada Temple", location: "Langley, British Columbia, Canada", dedicated: "2010-05-02", area: 28000, imageUrl: "temple-images-jpg/vancouver-canada-temple.jpg" }
];

const getYear = (dateStr) => Number.parseInt(dateStr.split("-")[0], 10);

const albumEl = document.querySelector("#album");
const titleEl = document.querySelector("#view-title");
const nav = document.querySelector("#primary-nav");
const menuBtn = document.querySelector("#menu-button");

function makeCard(t){
  const fig = document.createElement("figure");
  fig.className = "card";

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = t.imageUrl;
  img.alt = t.templeName;
  img.addEventListener("error", () => {
    img.src = "https://via.placeholder.com/800x500?text=Image+unavailable";
  });

  const meta = document.createElement("figcaption");
  meta.className = "meta";
  const h3 = document.createElement("h3");
  h3.textContent = t.templeName;
  const p1 = document.createElement("p");
  p1.textContent = t.location;
  const p2 = document.createElement("p");
  p2.textContent = `Dedicated: ${t.dedicated}`;
  const p3 = document.createElement("p");
  p3.textContent = `Area: ${t.area.toLocaleString()} sq ft`;

  meta.append(h3, p1, p2, p3);
  fig.append(img, meta);
  return fig;
}

function render(list){
  albumEl.innerHTML = "";
  list.forEach(t => albumEl.appendChild(makeCard(t)));
  albumEl.dataset.count = list.length;
}

const filters = {
  home: () => temples.slice(),
  old: () => temples.filter(t => getYear(t.dedicated) < 1900),
  new: () => temples.filter(t => getYear(t.dedicated) > 2000),
  large: () => temples.filter(t => t.area > 90000),
  small: () => temples.filter(t => t.area < 10000),
};

function applyFilter(kind){
  const fn = filters[kind] || filters.home;
  titleEl.textContent = kind.charAt(0).toUpperCase() + kind.slice(1);
  render(fn());
  document.querySelectorAll('.primary-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.filter === kind);
  });
}

nav.addEventListener("click", (evt) => {
  const link = evt.target.closest("a[data-filter]");
  if(!link) return;
  evt.preventDefault();
  const kind = link.dataset.filter;
  applyFilter(kind);
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
});

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

(function footerInfo(){
  const yearEl = document.getElementById("year");
  const lmEl = document.getElementById("last-modified");
  const now = new Date();
  if (yearEl) yearEl.textContent = now.getFullYear();
  if (lmEl) lmEl.textContent = document.lastModified;
})();

applyFilter("home");
