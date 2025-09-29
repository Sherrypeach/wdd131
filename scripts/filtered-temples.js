/* filtered-temples.js — WDD131 Picture Album Enhancement (Cas Perche) */

/* ---------- Data: Array of Temple Objects ----------
 * NOTE: Image URLs are absolute to satisfy the assignment.
 * You may replace with optimized local images if desired.
*/
const temples = [
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "1893-04-06",
    area: 382207,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Salt_Lake_Temple%2C_2013.jpg/800px-Salt_Lake_Temple%2C_2013.jpg"
  },
  {
    templeName: "Nauvoo Illinois Temple (Original)",
    location: "Nauvoo, Illinois, USA",
    dedicated: "1846-04-30",
    area: 54000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Nauvoo_Temple_Sunset.jpg/800px-Nauvoo_Temple_Sunset.jpg"
  },
  {
    templeName: "San Diego California Temple",
    location: "San Diego, California, USA",
    dedicated: "1993-04-25",
    area: 72600,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/San_Diego_California_Temple.jpg/800px-San_Diego_California_Temple.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 40713,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Rome_Italy_Temple_2019.jpg/800px-Rome_Italy_Temple_2019.jpg"
  },
  {
    templeName: "Laie Hawaii Temple",
    location: "Laie, Hawaii, USA",
    dedicated: "1919-11-27",
    area: 42000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Laie_Hawaii_Temple.jpg/800px-Laie_Hawaii_Temple.jpg"
  },
  {
    templeName: "Provo City Center Temple",
    location: "Provo, Utah, USA",
    dedicated: "2016-03-20",
    area: 85000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Provo_City_Center_Temple_in_2016.jpg/800px-Provo_City_Center_Temple_in_2016.jpg"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017-05-21",
    area: 44175,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Paris_France_Temple.jpg/800px-Paris_France_Temple.jpg"
  },
  {
    templeName: "Draper Utah Temple",
    location: "Draper, Utah, USA",
    dedicated: "2009-03-20",
    area: 166558,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Draper_Utah_Temple_3.jpg/800px-Draper_Utah_Temple_3.jpg"
  },
  {
    templeName: "Port-au-Prince Haiti Temple",
    location: "Port-au-Prince, Haiti",
    dedicated: "2019-09-01",
    area: 10000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Port-au-Prince_Haiti_Temple.jpg/800px-Port-au-Prince_Haiti_Temple.jpg"
  },
  // --- Additional 3+ entries added by Cas Perche ---
  {
    templeName: "Arequipa Peru Temple",
    location: "Arequipa, Peru",
    dedicated: "2019-12-15",
    area: 26969,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Arequipa_Peru_Temple.jpg/800px-Arequipa_Peru_Temple.jpg"
  },
  {
    templeName: "Bern Switzerland Temple",
    location: "Zollikofen, Bern, Switzerland",
    dedicated: "1955-09-11",
    area: 35546,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bern_Switzerland_Temple.jpg/800px-Bern_Switzerland_Temple.jpg"
  },
  {
    templeName: "Alabang Philippines Temple",
    location: "Muntinlupa, Metro Manila, Philippines",
    dedicated: "2023-06-04",
    area: 28831,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Manila_Philippines_Temple.jpg/800px-Manila_Philippines_Temple.jpg"
  }
];

/* ---------- Helpers ---------- */
const getYear = (dateStr) => Number.parseInt(dateStr.split("-")[0], 10);

/* ---------- DOM Elements ---------- */
const albumEl = document.querySelector("#album");
const titleEl = document.querySelector("#view-title");
const nav = document.querySelector("#primary-nav");
const menuBtn = document.querySelector("#menu-button");

/* ---------- Rendering ---------- */
function makeCard(t){
  const fig = document.createElement("figure");
  fig.className = "card";

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = t.imageUrl;
  img.alt = `${t.templeName}`;

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

/* ---------- Filters ---------- */
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
  // set active link
  document.querySelectorAll('.primary-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.filter === kind);
  });
}

/* ---------- Nav & Menu ---------- */
nav.addEventListener("click", (evt) => {
  const link = evt.target.closest("a[data-filter]");
  if(!link) return;
  evt.preventDefault();
  const kind = link.dataset.filter;
  applyFilter(kind);
  // close menu on mobile
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
});

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

/* ---------- Footer Info ---------- */
(function footerInfo(){
  const yearEl = document.getElementById("year");
  const lmEl = document.getElementById("last-modified");
  const now = new Date();
  if (yearEl) yearEl.textContent = now.getFullYear();
  if (lmEl) lmEl.textContent = document.lastModified;
})();

/* ---------- Init ---------- */
applyFilter("home");
