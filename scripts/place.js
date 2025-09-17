/* =====================================================================
   W03 Country Page — scripts/place.js
   Author: cas perche (Argentina)
   Responsibilities:
   1) Footer year + last modified date
   2) Wind chill computation with proper eligibility checks
   ===================================================================== */

/* ---------------------------- */
/* 1) FOOTER DATES              */
/* ---------------------------- */
// Current year
document.querySelector('#year').textContent = new Date().getFullYear();
// Last modified — uses the browser-provided document.lastModified string
document.querySelector('#lastModified').textContent = document.lastModified;

/* ---------------------------- */
/* 2) WIND CHILL CALCULATION    */
/* ---------------------------- */
/**
 * calculateWindChill — returns the wind chill in °C given:
 *   t = air temperature in °C
 *   v = wind speed in km/h
 * Formula source (Environment Canada standard): 
 *   WCI = 13.12 + 0.6215 T - 11.37 V^0.16 + 0.3965 T V^0.16
 * We keep this as one return statement as required.
 */
const calculateWindChill = (t, v) => 13.12 + 0.6215*t - 11.37*Math.pow(v, 0.16) + 0.3965*t*Math.pow(v, 0.16);

// Get the (static) UI values for temperature and wind speed
const tempC = Number(document.querySelector('#temp').textContent);
const windKmh = Number(document.querySelector('#wind').textContent);

// Eligibility constraints for *metric* units (as per assignment table)
const canCompute = tempC <= 10 && windKmh > 4.8;

const chillEl = document.querySelector('#chill');
if (canCompute) {
  const wc = calculateWindChill(tempC, windKmh);
  // Round to one decimal place for nice display
  chillEl.textContent = `${wc.toFixed(1)} °C`;
} else {
  chillEl.textContent = 'N/A'; // Not applicable
}
