"""Builds research/content_plan.csv: every page candidate per topic, from Keyword Planner data."""
import csv
import json
import re
import unicodedata
from collections import defaultdict

ROOT = "/opt/pets-es/research/"
es = json.load(open(ROOT + "pets_kw_es.json"))
vol = defaultdict(int)
for rows in es.values():
    for x in rows:
        vol[x["k"]] += x["v"]
for x in json.load(open(ROOT + "pets_exact_es.json")):
    vol[x["k"]] = max(vol[x["k"]], x["v"])


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn").strip()


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", norm(s)).strip("-")


def species(word):
    return "gatos" if word.startswith("gat") else "perros"


pages = {}


def add(topic, key, url, query, v, wave, gate=""):
    k = (topic, key)
    p = pages.setdefault(k, {"topic": topic, "url": url, "query": query, "best": 0, "volume": 0, "variants": 0, "wave": wave, "gate": gate})
    p["volume"] += v
    p["variants"] += 1
    if v > p["best"]:
        p["best"], p["query"] = v, query


# 1. Can my pet eat X
A = r"(perros?|perritos?|cachorros?|gatos?|gatitos?)"
PATTERNS = [
    rf"^(?:los |las |el |un |mi )?{A} (?:pueden?|puede) (?:comer|tomar) (?P<f>.+)$",
    rf"^(?:se )?pueden? (?:comer|tomar )?(?:los |un |mi )?{A} (?:comer |tomar )?(?P<f>.+)$",
    rf"^pueden? (?:comer|tomar) (?P<f>.+?) (?:los |un |mi )?{A}$",
    rf"^(?:le )?puedo dar(?:le)? (?P<f>.+?) a mi {A}$",
    rf"^(?P<f>[a-zñáéíóú ]+?) (?:es malo|es bueno|hace mal|son malas?|son buenas?) (?:para|a) (?:los |mi |un )?{A}$",
]
BAD = re.compile(r"\b(que|cuando|cuanto|cuantos|cuantas|como|por|porque|si|no|comer|solo|todo|nada|cosas|alimentos|comida casera|al dia|meses?|mes|anos|dias?)\b")
PLURAL = {"fresas": "fresa", "manzanas": "manzana", "peras": "pera", "uvas": "uva", "huevos": "huevo", "platanos": "platano", "bananas": "banana", "zanahorias": "zanahoria", "naranjas": "naranja", "mandarinas": "mandarina", "cerezas": "cereza", "aceitunas": "aceituna", "nueces": "nuez", "almendras": "almendra", "cacahuates": "cacahuate", "cacahuetes": "cacahuete", "tomates": "tomate", "papas": "papa", "patatas": "patata", "lentejas": "lenteja", "frijoles": "frijol", "garbanzos": "garbanzo", "pepinos": "pepino", "aguacates": "aguacate", "mangos": "mango", "duraznos": "durazno", "melocotones": "melocoton", "kiwis": "kiwi", "arandanos": "arandano", "frambuesas": "frambuesa", "pinas": "pina", "camarones": "camaron", "gambas": "gamba", "galletas": "galleta", "ciruelas": "ciruela", "espinacas": "espinaca", "calabazas": "calabaza", "cebollas": "cebolla", "pasas": "pasa"}
for q, v in vol.items():
    n = norm(q)
    for rx in PATTERNS:
        m = re.match(rx, n)
        if not m:
            continue
        food = re.sub(r"^(de |el |la |los |las |un |una |comer |tomar )+", "", m.group("f")).strip()
        animal = next(g for g in m.groups() if g and re.match(r"(perr|gat|cachorr)", g))
        if food and len(food.split()) <= 3 and not BAD.search(food) and not re.match(r"(perr|gat)", food):
            food = PLURAL.get(food, food)
            sp = species(animal)
            add("puede-comer", f"{sp}/{food}", f"/{sp}/pueden-comer/{slug(food)}/", q, v, 1, "fuente veterinaria")
        break

pages = {k: p for k, p in pages.items() if not re.search(r"chow|purina|whiskas|pedigree", k[1])}
MERGE = {"banana": "platano", "palta": "aguacate", "elote": "maiz", "choclo": "maiz", "chicharos": "guisantes", "ejotes": "judias verdes", "betabel": "remolacha", "batata": "camote", "boniato": "camote", "patata": "papa", "zapallo": "calabaza", "mani": "cacahuates", "mantequilla de mani": "crema de cacahuate", "mantequilla de cacahuete": "crema de cacahuate", "gambas": "camarones", "melocoton": "durazno", "repollo": "col", "setas": "champiñones"}
for x in json.load(open(ROOT + "pets_foods_es.json")):
    food = norm(MERGE.get(x["food"], x["food"]))
    food = PLURAL.get(food, food)
    add("puede-comer", f"{x['species']}/{food}", f"/{x['species']}/pueden-comer/{slug(food)}/", x["query"], x["v"], 1, "fuente veterinaria")

# 2. Breeds: curated list, volume = best variant only (Google merges variants).
# US is excluded here: English breed searches leak into its Spanish-language numbers.
vol_all = vol
vol = defaultdict(int)
for cc, rows_cc in es.items():
    if cc != "US":
        for x in rows_cc:
            vol[x["k"]] += x["v"]
DOGS = "pomerania|golden retriever|labrador|bulldog frances|bulldog ingles|pastor aleman|pastor belga malinois|pastor australiano|border collie|husky siberiano|chihuahua|yorkshire terrier|caniche|poodle|schnauzer|shih tzu|beagle|boxer|rottweiler|doberman|dogo argentino|gran danes|san bernardo|akita inu|shiba inu|samoyedo|chow chow|teckel|salchicha|pug|carlino|pitbull|american bully|bull terrier|staffordshire|cocker spaniel|bichon maltes|bichon frise|mini pincher|jack russell|corgi|galgo|podenco|mastin|mastin napolitano|mastin tibetano|cane corso|presa canario|xoloitzcuintle|dalmata|basset hound|setter irlandes|weimaraner|vizsla|pastor de shetland|pastor suizo|bernes de la montana|terranova|alaskan malamute|lhasa apso|pekines|boston terrier|fox terrier|west highland terrier|cavalier king charles|bloodhound|shar pei|maltipoo|cockapoo|goldendoodle|labradoodle".split("|")
CATS = "gato persa|gato siames|gato bengali|maine coon|british shorthair|ragdoll|sphynx|gato esfinge|scottish fold|azul ruso|gato angora|angora turco|gato siberiano|bosque de noruega|gato exotico|himalayo|abisinio|burmes|birmano|savannah|munchkin|gato comun europeo|gato carey|gato calico|gato naranja|american shorthair|devon rex|cornish rex|tonkines|balines|oriental|ocicat|manx|bombay|chartreux|sagrado de birmania".split("|")
for kind, names in (("perros", DOGS), ("gatos", CATS)):
    for b in names:
        rx = re.compile(rf"(^| ){re.escape(b)}( |$)")
        hits = [(q, v) for q, v in vol.items() if rx.search(norm(q))]
        exact = max((v for q, v in hits if norm(q) in (b, f"raza {b}", f"{b} raza")), default=0)
        best = exact or max((v for _, v in hits), default=0)
        add("razas", f"{kind}/{b}", f"/razas/{kind}/{slug(b.replace('gato ', ''))}/", b, best, 2)

vol = vol_all

# 3. Names
for q, v in vol.items():
    n = norm(q)
    m = re.match(r"^(?:\d+ )?nombres? (?:para|de) (perr[oa]s?|gat[oa]s?|cachorr[oa]s?|perrit[oa]s?|gatit[oa]s?)(?: (.+))?$", n)
    if m:
        sp = "gatos" if m.group(1).startswith("gat") else "perros"
        mod = (m.group(2) or "").strip()
        mod = re.sub(r"^(de |y |en |con |para )+", "", mod)
        mod = {"machos": "macho", "hembras": "hembra", "pequenos": "pequeno", "pequenas": "pequena", "grandes": "grande", "negros": "negro", "negras": "negra", "blancos": "blanco", "blancas": "blanca", "bonitos": "bonito", "bonitas": "bonita", "originales": "original"}.get(mod, mod)
        if len(mod.split()) <= 3:
            url = f"/nombres/{sp}/" + (slug(mod) + "/" if mod else "")
            add("nombres", f"{sp}/{mod}", url, q, v, 3)

# 4. Symptoms and behaviour: informational, vet-sourced, never dosing
DRUG = re.compile(r"pastilla|medicamento|medicina|dosis|ivermectina|antibiotico|inyeccion|jarabe|remedio|paracetamol|ibuprofeno|desparasitante")
for q, v in vol.items():
    n = norm(q)
    m = re.match(r"^(?:por ?que |porque )?(?:mi|el|un) (perro|gato|perrito|gatito|cachorro) (.+)$", n)
    if m and not DRUG.search(n) and len(m.group(2).split()) <= 5:
        sp = species(m.group(1))
        add("sintomas-conducta", f"{sp}/{m.group(2)}", f"/{sp}/{slug('mi-' + sp[:-1] + '-' + m.group(2))}/", q, v, 5, "revision veterinaria")

# 5. Feeding, homemade, BARF, best food, care guides
GUIDES = [
    ("alimentacion", r"cuant[oa]s? veces.*comer|cuanto debe comer|cuanto come|horario.*comida|comida casera|receta|croquetas caseras"),
    ("barf", r"\bbarf\b"),
    ("mejores-alimentos", r"mejor(es)? .*(pienso|croqueta|comida|alimento)"),
    ("cuidados", r"como (banar|cepillar|cortar|limpiar|cuidar|educar|ensenar|entrenar|adiestrar)|cada cuanto|vacunas? |calendario de vacunacion|cuanto vive|cuanto dura el embarazo|gestacion"),
]
for topic, pat in GUIDES:
    rx = re.compile(pat)
    for q, v in vol.items():
        n = norm(q)
        if rx.search(n) and not DRUG.search(n) and "cerca de mi" not in n and len(n.split()) <= 8:
            words = [w for w in n.split() if w not in {"de", "la", "el", "los", "las", "un", "una", "para", "a", "mi", "al", "del", "que", "se", "le", "en", "y"}]
            key = " ".join(sorted(set(words)))
            add(topic, key, f"/guias/{topic}/{slug(q)}/", q, v, 4, "fuente veterinaria" if topic == "cuidados" else "")

# 6. Tools
TOOLS = [
    ("comida-perro", "cuanto debe comer un perro"), ("comida-gato", "cuanto debe comer un gato"), ("barf", "calculadora dieta barf"),
    ("embarazo-perra", "cuanto dura el embarazo de una perra"), ("embarazo-gata", "cuanto dura el embarazo de una gata"),
    ("edad-perro", "edad perro"), ("edad-gato", "edad gato"), ("peso-cachorro", "calculadora peso perro cachorro"), ("peso-ideal-perro", "peso ideal perro"),
]
for t, q in TOOLS:
    add("calculadoras", t, f"/calculadoras/{t}/", q, vol.get(q, 0), 1)
add("calculadoras", "generador-nombres", "/nombres/generador/", "nombres para perros", vol.get("nombres para perros", 0), 1)

# Merge guide queries with the same intent into one page (greedy, by shared meaningful words).
STOP = {"de", "la", "el", "los", "las", "un", "una", "para", "a", "mi", "al", "del", "que", "se", "le", "en", "y", "tu", "con", "por", "dia", "debe", "tiene", "hay"}
def tokens(q):
    return {w[:-1] if len(w) > 4 and w.endswith("s") else w for w in norm(q).split() if w not in STOP}
merged = {}
for topic in ("alimentacion", "barf", "cuidados", "mejores-alimentos"):
    heads = []
    for k, p in sorted(((k, p) for k, p in pages.items() if k[0] == topic), key=lambda kv: -kv[1]["best"]):
        t = tokens(p["query"])
        for head in heads:
            if len(t & head["t"]) / max(1, len(t | head["t"])) >= 0.6:
                head["p"]["volume"] += p["volume"]
                head["p"]["variants"] += p["variants"]
                break
        else:
            heads.append({"t": t, "p": p})
            merged[k] = p
    pages = {k: p for k, p in pages.items() if k[0] != topic}
pages.update(merged)

# A page of its own needs real demand; the rest stay as rows in a reference table or FAQ of the parent page.
MIN_PAGE = {"puede-comer": 10, "razas": 100, "nombres": 50, "sintomas-conducta": 100, "alimentacion": 100, "barf": 100, "cuidados": 100, "mejores-alimentos": 100, "calculadoras": 0}
for p in pages.values():
    p["format"] = "page" if p["best"] >= MIN_PAGE[p["topic"]] else "faq-or-table"

rows = sorted(pages.values(), key=lambda p: (p["wave"], p["topic"], p["format"] != "page", -p["best"]))
with open(ROOT + "content_plan.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["wave", "topic", "format", "url", "query", "best", "volume", "variants", "gate"], extrasaction="ignore")
    w.writeheader()
    w.writerows(rows)

summary = defaultdict(lambda: [0, 0, 0, 0])
for p in rows:
    s = summary[(p["wave"], p["topic"])]
    s[0] += p["format"] == "page"
    s[1] += p["format"] != "page"
    s[2] += p["best"] >= 1000
    s[3] += p["best"] if p["format"] == "page" else 0
print("wave topic | own pages | faq/table rows | >=1000/mo | sum of best query on own pages")
for (wave, topic), s in sorted(summary.items()):
    print(wave, topic.ljust(20), str(s[0]).rjust(5), str(s[1]).rjust(6), str(s[2]).rjust(6), f"{s[3]:>10,}")
print("TOTAL own pages", sum(p["format"] == "page" for p in rows), "| faq/table rows", sum(p["format"] != "page" for p in rows))
for topic in ["puede-comer", "razas", "cuidados", "alimentacion"]:
    print(f"\n-- {topic}")
    for p in [x for x in rows if x["topic"] == topic][:12]:
        print(str(p["best"]).rjust(7), p["url"][:58].ljust(58), p["query"][:44])
