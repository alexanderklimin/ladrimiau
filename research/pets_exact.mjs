// Exact monthly volumes for specific queries (read-only). Run from /opt/google-ads-mcp with its .env loaded.
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";

const c = readConfigFromEnv();
const cid = "6962355647";
const GEOS = [2724, 2484, 2840, 2032, 2170].map((g) => `geoTargetConstants/${g}`);
const keywords = [
  "edad perro", "edad de perro", "edad perro humano", "edad de un perro en años humanos", "edad perro en años humanos", "calculadora edad perro", "calculadora de edad de perros", "calcular edad perro", "años de perro", "años perro a humano", "años perro", "un año de perro cuantos son humanos", "edad gato", "edad de gato en años humanos", "edad gato humano", "calculadora edad gato", "años de gato", "años gato humano",
  "cuanto vive un perro", "cuanto vive un gato", "cuantos años vive un perro", "cuantos años vive un gato",
  "cuanto debe comer un perro", "cuanto debe comer mi perro", "cuanto come un perro al dia", "cuanta comida darle a mi perro", "cuantos gramos de comida debe comer un perro", "cuanto debe comer un cachorro", "cuanto debe comer un gato", "cuantos gramos debe comer un gato",
  "cuanto pesara mi perro", "cuanto va a crecer mi perro", "cuanto crece un perro", "hasta cuando crece un perro", "hasta cuando crece un gato", "calculadora peso cachorro",
  "cuanto dura el embarazo de una perra", "cuanto dura el embarazo de una gata", "cuanto tiempo dura el embarazo de una perra", "cuanto dura la gestacion de una perra", "calculadora embarazo perra", "calculadora gestacion perra", "calculadora parto perra",
  "chocolate perros", "uvas perros", "los perros pueden comer platano", "los perros pueden comer sandia", "los perros pueden comer huevo", "los perros pueden comer arroz", "los gatos pueden comer atun", "los gatos pueden comer pollo",
];
const r = await googleAdsRequest(c, { method: "POST", path: `/customers/${cid}:generateKeywordHistoricalMetrics`, body: { keywords, language: "languageConstants/1003", geoTargetConstants: GEOS, keywordPlanNetwork: "GOOGLE_SEARCH" } });
const rows = (r.results || []).map((x) => ({ k: x.text, close: x.closeVariants || [], v: +(x.keywordMetrics?.avgMonthlySearches || 0) })).sort((a, b) => b.v - a.v);
fs.writeFileSync("/opt/pets-es/research/pets_exact_es.json", JSON.stringify(rows, null, 1));
console.log("returned", rows.length, "of", keywords.length);
for (const x of rows) console.log(String(x.v).padStart(8), x.k, x.close.length ? `(= ${x.close.slice(0, 3).join(", ")})` : "");
