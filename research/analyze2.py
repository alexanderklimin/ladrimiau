import json, re

es = json.load(open("/opt/pets-es/research/pets_kw_es.json"))
en = json.load(open("/opt/pets-es/research/pets_kw_en.json"))["US"]
vol = {}
for cc, rows in es.items():
    for x in rows:
        vol.setdefault(x["k"], {})[cc] = x["v"]

def show(title, pattern, n=14):
    rx = re.compile(pattern)
    hits = sorted(((k, v) for k, v in vol.items() if rx.search(k)), key=lambda h: -sum(h[1].values()))
    print(f"\n## {title}: {len(hits)} queries, sum {sum(sum(v.values()) for _, v in hits):,}")
    for k, v in hits[:n]:
        print(f"{sum(v.values()):>8,}  {k}  " + " ".join(f"{c}:{m}" for c, m in v.items()))

show("edad", r"\bedad\b|años (de )?(un |mi )?(perro|gato)|años humanos|años perrunos")
show("cuanto vive", r"cu[aá]nto(s a[nñ]os)? vive")
show("cuanto cuesta / precio", r"(cu[aá]nto cuesta|precio).*(perro|gato|cachorro|husky|pomerania|bulldog)")
show("puede comer: pueden comer X", r"pueden? comer", 25)
show("nombres por tipo", r"nombres? .*(hembra|macho|peque|grande|negr|blanc|original|bonit|raro)", 12)
show("gatos sintomas", r"mi gato", 10)

print("\n## EN (US) calculators")
rx = re.compile(r"calculator")
hits = sorted((x for x in en if rx.search(x["k"])), key=lambda x: -x["v"])
print("sum", sum(x["v"] for x in hits), "queries", len(hits))
for x in hits[:16]:
    print(f"{x['v']:>8,}  {x['k']}")

print("\n## ES calculators, 5 countries sum")
rx = re.compile(r"calculadora|calcular|calculo|cálculo")
hits = [(k, v) for k, v in vol.items() if rx.search(k) and not re.search("renal", k)]
print("sum", sum(sum(v.values()) for _, v in hits), "queries", len(hits))
