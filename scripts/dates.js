
/* dates.js — common footer dates */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.querySelector("#year");
  const modEl = document.querySelector("#lastModified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = document.lastModified;
});
