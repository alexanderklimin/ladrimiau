// Keyword Planner demand research (read-only). Run from /opt/google-ads-mcp with its .env loaded:
//   node /opt/pets-es/research/pets_kw.mjs es|en
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";

const c = readConfigFromEnv();
const cid = "6962355647";
const LANG = process.argv[2] || "es";
const langId = { es: 1003, en: 1000 }[LANG];
const GEOS = LANG === "es" ? { ES: 2724, MX: 2484, US: 2840, AR: 2032, CO: 2170 } : { US: 2840 };
const SEEDS = LANG === "es"
  ? [
      ["calculadora comida perro", "cuanto debe comer un perro", "cuanto debe comer un gato", "calculadora edad perro", "edad de perro en años humanos", "edad de gato en años humanos", "peso ideal perro", "calculadora gestacion perra", "calculadora embarazo gata", "calculadora tamaño perro adulto"],
      ["alimentos prohibidos para perros", "que pueden comer los perros", "que pueden comer los gatos", "comida casera para perros", "dieta barf", "mejor pienso para perros", "mejor croquetas para perros", "comida para gatos", "pueden los perros comer", "pueden los gatos comer"],
      ["razas de perros", "razas de gatos", "nombres para perros", "nombres para gatos", "adiestramiento de perros", "como bañar a un perro", "vacunas perros", "desparasitar perro", "por que mi perro", "por que mi gato"],
    ]
  : [
      ["dog food calculator", "how much should i feed my dog", "how much to feed a cat", "dog age calculator", "cat age calculator", "dog weight calculator", "puppy weight calculator", "dog pregnancy calculator", "cat pregnancy calculator", "dog calorie calculator"],
      ["foods dogs can't eat", "can dogs eat", "can cats eat", "homemade dog food", "raw dog food", "best dog food", "best cat food", "dog breeds", "cat breeds", "dog names"],
    ];

const out = {};
for (const [cc, geo] of Object.entries(GEOS)) {
  const seen = new Map();
  for (const keywords of SEEDS) {
    let t;
    let n = 0;
    do {
      const r = await googleAdsRequest(c, { method: "POST", path: `/customers/${cid}:generateKeywordIdeas`, body: { language: `languageConstants/${langId}`, geoTargetConstants: [`geoTargetConstants/${geo}`], keywordPlanNetwork: "GOOGLE_SEARCH", keywordSeed: { keywords }, pageSize: 1000, ...(t ? { pageToken: t } : {}) } });
      for (const x of r.results || []) {
        n++;
        seen.set(x.text, { k: x.text, v: +(x.keywordIdeaMetrics?.avgMonthlySearches || 0), comp: x.keywordIdeaMetrics?.competition || null, idx: +(x.keywordIdeaMetrics?.competitionIndex || 0) });
      }
      t = r.nextPageToken;
    } while (t && n < 3000);
  }
  out[cc] = [...seen.values()].sort((a, b) => b.v - a.v);
  console.log(`${cc}: ${out[cc].length} ideas`);
}
fs.writeFileSync(`/opt/pets-es/research/pets_kw_${LANG}.json`, JSON.stringify(out));
