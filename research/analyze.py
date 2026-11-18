import json, re

es = json.load(open("/opt/pets-es/research/pets_kw_es.json"))
countries = list(es)
vol = {}
for cc, rows in es.items():
    for x in rows:
        vol.setdefault(x["k"], {})[cc] = x["v"]

CATS = {
    "calc_racion": r"(cuant[oa]s?|cantidad|gramos|racion|ración|calculadora).*(comer|comida|pienso|croquetas|alimento|racion|ración)|calculadora (de )?(comida|pienso|croquetas|racion|ración)",
    "calc_edad": r"(edad|años).*(perro|gato|humanos)|(perro|gato).*(años humanos|edad)",
    "calc_peso_tamano": r"(peso|tamaño|cuanto va a crecer|cuanto crecera|cuánto crecerá).*(perro|gato|cachorro)|calculadora.*(peso|tamaño)",
    "calc_gestacion": r"(gestaci[oó]n|embaraz|pre[nñ]ad|parto).*(perra|gata|perro|gato)|(perra|gata).*(gestaci[oó]n|embaraz|pre[nñ]ad|parto)",
    "puede_comer": r"(puede|pueden).*(comer|tomar)|(perro|gato)s? .*(comer|comen)|alimentos? (prohibid|t[oó]xic)|t[oó]xic.*(perro|gato)",
    "comida_casera_barf": r"comida casera|receta.*(perro|gato)|dieta barf|\bbarf\b",
    "marcas_mejor_pienso": r"mejor(es)? .*(pienso|croqueta|comida|alimento)|(pienso|croquetas?) .*(mejor|recomend|opinion)",
    "razas": r"\braza",
    "nombres": r"\bnombres?\b",
    "salud_sintomas": r"(mi perro|mi gato|por qu[eé]).*(vomita|diarrea|tiembla|tose|sangre|no come|llora|maulla|ladra|rasca)|vacuna|desparasit|pulgas|garrapatas",
    "adiestramiento": r"adiestr|ense[nñ]ar a|educar|entrenar",
}

print("TOPIC | total/mo in 5 countries | by country | top queries")
for name, pattern in CATS.items():
    rx = re.compile(pattern)
    hits = [(k, v) for k, v in vol.items() if rx.search(k)]
    total = sum(sum(v.values()) for _, v in hits)
    by_cc = {cc: sum(v.get(cc, 0) for _, v in hits) for cc in countries}
    top = sorted(hits, key=lambda h: -sum(h[1].values()))[:8]
    print(f"\n## {name}: {total:,} | " + " ".join(f"{cc} {n:,}" for cc, n in by_cc.items()))
    print("   " + "; ".join(f"{k} {sum(v.values()):,}" for k, v in top))

print("\n## TOP 40 overall")
for k, v in sorted(vol.items(), key=lambda h: -sum(h[1].values()))[:40]:
    print(f"{sum(v.values()):>9,}  {k}  " + " ".join(f"{cc}:{n}" for cc, n in v.items()))

print("\n## Calculator-intent queries")
rx = re.compile(r"calculadora|calcular|calculo|cálculo")
for k, v in sorted(((k, v) for k, v in vol.items() if rx.search(k)), key=lambda h: -sum(h[1].values()))[:30]:
    print(f"{sum(v.values()):>8,}  {k}")
