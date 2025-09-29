
/* review.js — read query params, show confirmation, track counter */
function getAll(param, searchParams) {
  // helper to read zero, one, or many values
  const values = searchParams.getAll(param);
  return values.length ? values : (searchParams.has(param) ? [searchParams.get(param)] : []);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const hasQuery = Array.from(params.keys()).length > 0;

  // Increment localStorage counter only on successful submission (if query exists)
  if (hasQuery) {
    const key = "reviewsCount";
    const current = Number(localStorage.getItem(key) || 0);
    const next = current + 1;
    localStorage.setItem(key, String(next));

    // Display the count
    const counterEl = document.querySelector("#reviewCounter");
    if (counterEl) {
      counterEl.textContent = next;
      counterEl.setAttribute("aria-live", "polite");
    }
  }

  // Populate the confirmation summary
  const summaryEl = document.querySelector("#submissionSummary");
  if (summaryEl) {
    const product = params.get("productName") || "(none)";
    const rating = params.get("rating") || "(none)";
    const date   = params.get("installDate") || "(none)";
    const features = getAll("features", params);
    const written = params.get("reviewText") || "(none)";
    const username = params.get("userName") || "(Anonymous)";

    // map product ids back to friendly names if possible (mirror of form list)
    const productMap = {
      "starlight-bulb": "Starlight Smart Bulb",
      "aurora-strip": "Aurora LED Strip",
      "nebula-router": "Nebula Wi‑Fi 6 Router",
      "whisper-fan": "Whisper Ceiling Fan",
      "tidybot-mini": "TidyBot Mini Vacuum"
    };
    const productLabel = productMap[product] || product;

    summaryEl.innerHTML = `
      <ul class="mt-0">
        <li><strong>Product:</strong> ${productLabel}</li>
        <li><strong>Overall Rating:</strong> ${rating} / 5</li>
        <li><strong>Date of Installation:</strong> ${date}</li>
        <li><strong>Useful Features:</strong> ${features.length ? features.join(", ") : "(none selected)"}</li>
        <li><strong>Written Review:</strong> ${written !== "(none)" && written.trim() !== "" ? written : "(none)"} </li>
        <li><strong>User Name:</strong> ${username !== "" ? username : "(Anonymous)"} </li>
      </ul>
    `;
  }
});
