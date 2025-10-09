// Cas Perche Creative — W06 Project
// Meets rubric: functions, DOM, conditionals, arrays/objects, template literals, localStorage

/* Data: looks as objects */
const LOOKS = [
  {
    id: "dreamy-pink",
    title: "Dreamy Pink",
    category: "editorial",
    products: ["Long-wear base", "Soft blush", "Gloss"],
    note: "Soft glam with blush draping",
    img: "images/look1.svg"
  },
  {
    id: "mulberry-edge",
    title: "Mulberry Edge",
    category: "graphic",
    products: ["Liquid liner", "Precision brush"],
    note: "Graphic liner with mulberry accents",
    img: "images/look2.svg"
  },
  {
    id: "pastel-prism",
    title: "Pastel Prism",
    category: "color",
    products: ["Pastel pigments", "Fixing spray"],
    note: "Color pop with negative space",
    img: "images/look3.svg"
  }
];

/* State from localStorage */
const STORAGE_KEYS = {
  theme: "cpc-theme",
  favorites: "cpc-favorites",
  inquiries: "cpc-inquiries"
};

function getStored(key, fallback) {
  const raw = localStorage.getItem(key);
  try { return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function setStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* Theme */
function applyStoredTheme() {
  const theme = getStored(STORAGE_KEYS.theme, "light");
  document.documentElement.setAttribute("data-theme", theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  setStored(STORAGE_KEYS.theme, next);
}

/* Responsive nav */
function initMenu() {
  const btn = document.getElementById("menuBtn");
  const list = document.getElementById("menuList");
  if (!btn || !list) return;
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    list.style.display = expanded ? "none" : "flex";
  });
}

/* Rendering gallery (DOM + templates + arrays) */
function galleryCard(look, favorites) {
  const isFav = favorites.includes(look.id);
  return `
    <li class="gallery-card" data-id="${look.id}">
      <img src="${look.img}" alt="${look.title}" width="600" height="400" loading="lazy" decoding="async">
      <h3>${look.title}</h3>
      <p class="meta">
        <span class="tag">${look.category}</span>
        • Products: ${look.products.join(", ")}
      </p>
      <p>${look.note}</p>
      <div class="actions">
        <button class="btn" data-fav="${look.id}">${isFav ? "★ Favorited" : "☆ Favorite"}</button>
      </div>
    </li>
  `;
}

function renderGallery(list = LOOKS) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  const favorites = getStored(STORAGE_KEYS.favorites, []);
  grid.innerHTML = list.map(look => galleryCard(look, favorites)).join("");
  grid.querySelectorAll("button[data-fav]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-fav");
      toggleFavorite(id);
      renderGallery(list); // re-render to reflect state
    });
  });
}

function toggleFavorite(id) {
  const current = getStored(STORAGE_KEYS.favorites, []);
  const idx = current.indexOf(id);
  if (idx >= 0) {
    current.splice(idx, 1);
  } else {
    current.push(id);
  }
  setStored(STORAGE_KEYS.favorites, current);
}

/* Filtering (arrays + conditionals) */
function initFilters() {
  const form = document.getElementById("filterForm");
  const cat = document.getElementById("category");
  const search = document.getElementById("search");
  const clear = document.getElementById("clearFilters");

  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const category = cat.value;
    const term = search.value.trim().toLowerCase();

    let list = LOOKS;
    if (category !== "all") {
      list = list.filter(l => l.category === category);
    }
    if (term) {
      list = list.filter(l =>
        l.title.toLowerCase().includes(term) ||
        l.note.toLowerCase().includes(term) ||
        l.products.join(" ").toLowerCase().includes(term)
      );
    }

    // Conditional branching for empty state
    if (list.length === 0) {
      const grid = document.getElementById("galleryGrid");
      grid.innerHTML = `<li class="gallery-card"><p>No looks found. Try another filter.</p></li>`;
      return;
    }

    renderGallery(list);
  });

  if (clear) {
    clear.addEventListener("click", () => {
      cat.value = "all";
      search.value = "";
      renderGallery(LOOKS);
    });
  }
}

/* Contact form (validation + storage + DOM feedback) */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    // Simple validation with conditionals
    if (!data.name || !data.email || !data.topic || !data.message || data.message.length < 10) {
      msg.textContent = "Please complete all fields. Message must be at least 10 characters.";
      return;
    }

    const all = getStored(STORAGE_KEYS.inquiries, []);
    all.push({ ...data, date: new Date().toISOString() });
    setStored(STORAGE_KEYS.inquiries, all);

    msg.textContent = "Thanks! Your inquiry was saved locally. We'll be in touch.";
    form.reset();
  });
}

/* Initialize */
document.addEventListener("DOMContentLoaded", () => {
  applyStoredTheme();
  initMenu();
  initFilters();
  initContactForm();
  renderGallery(LOOKS);

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
});
