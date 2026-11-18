// App Store competitors (public iTunes Search API) + Keyword Planner demand for app queries (read-only).
// Run from /opt/google-ads-mcp with its .env loaded.
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";

const TERMS = {
  mx: ["mascotas", "cuidado de mascotas", "salud perro", "app para perros", "app para gatos", "veterinario", "diario mascota", "recordatorio vacunas mascota", "adiestramiento perros", "traductor perro"],
  es: ["mascotas", "cuidado de mascotas", "salud perro", "app para perros", "app para gatos", "veterinario", "diario mascota", "adiestramiento perros"],
  us: ["pet care", "pet health tracker", "dog health", "cat health", "pet vaccine reminder", "dog training", "ai vet", "cat pain scan"],
};
const apps = {};
for (const [cc, terms] of Object.entries(TERMS)) {
  for (const term of terms) {
    const url = `https://itunes.apple.com/search?${new URLSearchParams({ term, country: cc, entity: "software", limit: "25" })}`;
    const res = await fetch(url);
    if (!res.ok) { console.log("skip", cc, term, res.status); continue; }
    const { results = [] } = await res.json();
    results.forEach((a, i) => {
      const x = (apps[a.trackId] ||= { id: a.trackId, name: a.trackName, seller: a.sellerName, genre: a.primaryGenreName, released: a.releaseDate?.slice(0, 10), updated: a.currentVersionReleaseDate?.slice(0, 10), rating: a.averageRatingForCurrentVersion ?? a.averageUserRating, es: (a.languageCodesISO2A || []).includes("ES"), iap: null, price: a.price, ratings: {}, hits: {} });
      x.ratings[cc] = a.userRatingCount || 0;
      x.hits[cc] = x.hits[cc] || [];
      x.hits[cc].push(`${term}#${i + 1}`);
    });
    await new Promise((r) => setTimeout(r, 3500));
  }
}
const list = Object.values(apps);
fs.writeFileSync("/opt/pets-es/research/pets_apps.json", JSON.stringify(list, null, 1));

const PET = /pet|mascot|dog|perr|cat\b|cats|gato|vet|puppy|cachorr|paw|woof|bark|pup|kitt|animal/i;
const pets = list.filter((a) => PET.test(a.name) || PET.test(a.seller || ""));
console.log("apps seen", list.length, "| pet-related", pets.length);
for (const cc of ["mx", "es", "us"]) {
  const top = pets.filter((a) => a.ratings[cc] != null).sort((a, b) => b.ratings[cc] - a.ratings[cc]).slice(0, 18);
  console.log(`\n== ${cc.toUpperCase()} top by ratings in this store`);
  for (const a of top) console.log(String(a.ratings[cc]).padStart(8), (a.rating ? a.rating.toFixed(1) : "-").padEnd(4), a.es ? "ES" : "--", a.released, a.updated, a.name.slice(0, 52), "|", a.hits[cc].slice(0, 2).join(", "));
  const n = pets.filter((a) => a.ratings[cc] != null);
  console.log(`   count: ${n.length}; >=1000 ratings: ${n.filter((a) => a.ratings[cc] >= 1000).length}; >=100: ${n.filter((a) => a.ratings[cc] >= 100).length}; Spanish UI: ${n.filter((a) => a.es).length}`);
}

const c = readConfigFromEnv();
const keywords = ["app para perros", "app para gatos", "app para mascotas", "aplicacion para mascotas", "aplicacion para perros", "aplicacion para gatos", "app veterinaria", "veterinario online", "veterinario en linea", "veterinario online gratis", "app cuidado mascotas", "carnet de vacunacion perro", "cartilla de vacunacion perro", "calendario de vacunacion perros", "calendario de vacunacion gatos", "traductor de perros", "traductor de gatos", "localizador gps perros", "gps para perros", "gps para gatos", "collar gps perro", "app adiestramiento perros", "como saber si mi gato tiene dolor", "como saber si mi perro tiene dolor", "como saber si mi perro esta enfermo", "como saber si mi gato esta enfermo"];
const r = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordHistoricalMetrics", body: { keywords, language: "languageConstants/1003", geoTargetConstants: [2724, 2484, 2840, 2032, 2170].map((g) => `geoTargetConstants/${g}`), keywordPlanNetwork: "GOOGLE_SEARCH" } });
console.log("\n== Search demand, 5 countries, per month");
for (const x of (r.results || []).map((y) => ({ k: y.text, v: +(y.keywordMetrics?.avgMonthlySearches || 0) })).sort((a, b) => b.v - a.v)) console.log(String(x.v).padStart(8), x.k);
