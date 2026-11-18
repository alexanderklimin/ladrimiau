// Exact monthly volumes for "can dogs/cats eat X" (read-only). Run from /opt/google-ads-mcp with its .env loaded.
import { googleAdsRequest } from "/opt/google-ads-mcp/src/googleAdsClient.js";
import { readConfigFromEnv } from "/opt/google-ads-mcp/src/googleAuth.js";
import fs from "node:fs";

const FOODS = "fresas,platano,banana,sandia,melon,manzana,pera,uvas,pasas,naranja,mandarina,limon,pina,mango,papaya,kiwi,durazno,melocoton,cerezas,ciruelas,arandanos,frambuesas,moras,coco,granada,higos,guayaba,maracuya,aguacate,palta,tomate,zanahoria,pepino,calabaza,calabacin,zapallo,brocoli,coliflor,espinacas,lechuga,col,repollo,apio,pimiento,cebolla,ajo,puerro,champiñones,setas,maiz,elote,choclo,guisantes,chicharos,ejotes,judias verdes,remolacha,betabel,camote,batata,boniato,papa,patata,yuca,arroz,pasta,fideos,pan,avena,quinoa,tortilla,lentejas,frijoles,garbanzos,soja,huevo,pollo,pavo,carne de res,carne de cerdo,cerdo,cordero,conejo,higado,jamon,tocino,salchichas,chorizo,atun,salmon,sardinas,pescado,camarones,gambas,mariscos,huesos,leche,queso,yogur,mantequilla,helado,crema de cacahuate,mantequilla de mani,mantequilla de cacahuete,cacahuates,mani,almendras,nueces,pistachos,avellanas,semillas de chia,miel,azucar,chocolate,cafe,te,aceite de oliva,aceite de coco,sal,canela,curcuma,jengibre,perejil,menta,galletas,palomitas,gelatina,pizza,comida de gato,comida de perro".split(",");
const c = readConfigFromEnv();
const out = [];
for (const [sp, phrase] of [["perros", "los perros pueden comer"], ["gatos", "los gatos pueden comer"]]) {
  for (let i = 0; i < FOODS.length; i += 500) {
    const batch = FOODS.slice(i, i + 500);
    const keywords = batch.map((f) => `${phrase} ${f}`);
    const r = await googleAdsRequest(c, { method: "POST", path: "/customers/6962355647:generateKeywordHistoricalMetrics", body: { keywords, language: "languageConstants/1003", geoTargetConstants: [2724, 2484, 2840, 2032, 2170].map((g) => `geoTargetConstants/${g}`), keywordPlanNetwork: "GOOGLE_SEARCH" } });
    const seen = {};
    for (const x of r.results || []) {
      const v = +(x.keywordMetrics?.avgMonthlySearches || 0);
      seen[x.text] = v;
      for (const y of x.closeVariants || []) seen[y] = v;
    }
    for (const f of batch) out.push({ species: sp, food: f, query: `${phrase} ${f}`, v: seen[`${phrase} ${f}`] ?? 0 });
  }
}
fs.writeFileSync("/opt/pets-es/research/pets_foods_es.json", JSON.stringify(out, null, 1));
for (const sp of ["perros", "gatos"]) {
  const l = out.filter((x) => x.species === sp).sort((a, b) => b.v - a.v);
  console.log(sp, "foods", l.length, "| >=1000:", l.filter((x) => x.v >= 1000).length, "| >=100:", l.filter((x) => x.v >= 100).length, "| >=10:", l.filter((x) => x.v >= 10).length, "| sum", l.reduce((s, x) => s + x.v, 0));
  console.log("  " + l.slice(0, 30).map((x) => `${x.food} ${x.v}`).join("; "));
}
