
/* form.js — populate product list dynamically */
document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: "starlight-bulb", name: "Starlight Smart Bulb" },
    { id: "aurora-strip", name: "Aurora LED Strip" },
    { id: "nebula-router", name: "Nebula Wi‑Fi 6 Router" },
    { id: "whisper-fan", name: "Whisper Ceiling Fan" },
    { id: "tidybot-mini", name: "TidyBot Mini Vacuum" },
  ];

  const select = document.querySelector("#productName");
  if (select) {
    products.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;      // value: id per instructions
      opt.textContent = p.name; // display: name
      select.appendChild(opt);
    });
  }
});
