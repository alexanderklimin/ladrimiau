// Curated pet name collections. Framework-free so the app can reuse it.
// A name appears on one page only. "Name:meaning" adds a short explanation.

const section = (id, title, intro, style, sex, names) => Object.freeze({ id, title, intro, style, sex, names: Object.freeze(names) });

export const NAME_PAGES = Object.freeze([
  {
    path: 'perros',
    species: 'dog',
    sex: 'todos',
    label: 'Nombres para perros',
    h1: 'Nombres para perros',
    lead: 'Ideas cortas, originales y bonitas para tu perro, sea macho o hembra.',
    tips: [
      'Elige un nombre de una o dos sílabas: es más fácil de decir en el parque y de reconocer.',
      'Evita que suene como una orden habitual, por ejemplo «Mo» y «no».',
      'Decide el nombre en familia y usad todos el mismo desde el primer día.',
    ],
    faq: [
      { q: '¿Cuál es el mejor nombre para un perro?', a: 'El mejor nombre es corto, fácil de pronunciar y te gusta decirlo en voz alta. Pruébalo unos días antes de decidirte.' },
      { q: '¿Se le puede cambiar el nombre a un perro adoptado?', a: 'Sí. Usa el nombre nuevo en momentos agradables, acompañado de caricias o premios, para que lo asocie con algo positivo.' },
    ],
    sections: [
      section('cortos', 'Nombres cortos para perros', 'Una o dos sílabas, perfectos para llamarlo a distancia.', 'clasicos', 'todos',
        ['Bo', 'Kai', 'Noa', 'Ari', 'Sam', 'Kim', 'Eli', 'Lou', 'Joy', 'Mika', 'Nic', 'Rin', 'Tao', 'Uma', 'Ivy', 'Zen', 'Pax', 'Dot', 'Fox', 'Jazz', 'Roo', 'Bu', 'Yogi', 'Sky']),
      section('originales', 'Nombres originales para perros', 'Para quienes buscan un nombre que nadie más tenga en el parque.', 'divertidos', 'todos',
        ['Pixel', 'Emoji', 'Selfie', 'Bingo', 'Yoyo', 'Radar', 'Turbo', 'Tango', 'Sudoku', 'Domingo', 'Confeti', 'Mambo', 'Dominó', 'Karaoke', 'Origami', 'Piñata', 'Kazoo', 'Ukelele', 'Bongo', 'Bolero']),
      section('heroes-griegos', 'Nombres griegos para perros', 'Héroes y personajes de la Antigua Grecia.', 'miticos', 'macho',
        ['Argos:el fiel perro de Ulises', 'Helios:dios del sol', 'Eolo:dios del viento', 'Cronos:titán, padre de Zeus', 'Ícaro:voló hacia el sol', 'Teseo:venció al Minotauro', 'Jasón:líder de los argonautas', 'Héctor:héroe de Troya', 'Leónidas:rey de Esparta', 'Homero:autor de la Odisea']),
      section('heroinas-griegas', 'Nombres griegos para perras', 'Mujeres célebres de los mitos griegos.', 'miticos', 'hembra',
        ['Talía:musa de la comedia', 'Ariadna:la del hilo del laberinto', 'Penélope:esposa de Ulises', 'Helena:la célebre Helena de Troya', 'Casandra:princesa y profetisa', 'Electra:hija de Agamenón', 'Clío:musa de la historia', 'Antígona:hija de Edipo', 'Ifigenia:hermana de Electra', 'Eurídice:amada de Orfeo']),
      section('bonitos', 'Nombres bonitos para perros', 'Palabras suaves que apetece repetir.', 'tiernos', 'todos',
        ['Abril', 'Alba', 'Ángel', 'Edén', 'Fénix', 'Índigo', 'Jade', 'Mar', 'Miel', 'Paz', 'Rubí', 'Zafiro', 'Ámbar', 'Nácar', 'Cristal', 'Dicha', 'Alma', 'Trigo', 'Sol', 'Nube']),
      section('viajeros', 'Nombres de ciudades', 'Para perros viajeros y familias con un lugar favorito.', 'naturaleza', 'todos',
        ['Lima', 'Quito', 'Cusco', 'Bali', 'Roma', 'París', 'Milán', 'Oslo', 'Praga', 'Viena', 'Tokio', 'Sidney', 'Bogotá', 'Cádiz', 'Sevilla', 'Toledo', 'Oaxaca', 'Cancún', 'Malibú', 'Dakar']),
    ],
  },
  {
    path: 'perros/macho',
    species: 'dog',
    sex: 'macho',
    label: 'Nombres para perros machos',
    h1: 'Nombres para perros machos',
    lead: 'Desde los más populares hasta los más fuertes y divertidos.',
    tips: [
      'Piensa en cómo será de adulto: un nombre muy tierno quizá no encaje con un perro grande.',
      'Dilo en voz alta varias veces, como si lo llamaras en la calle.',
      'Observa su carácter unos días: a veces el nombre aparece solo.',
    ],
    faq: [
      { q: '¿Qué nombres de perro macho son más populares?', a: 'Nombres breves como Max, Rocky, Toby, Bruno o Thor son muy habituales porque resultan fáciles de decir y de recordar.' },
      { q: '¿Puedo ponerle a mi perro un nombre de persona?', a: 'Sí. Nombres como Manolo o Benito resultan simpáticos, aunque conviene evitar el de alguien cercano para no crear confusiones en casa.' },
    ],
    sections: [
      section('populares', 'Nombres populares para perros machos', 'Clásicos que nunca fallan.', 'clasicos', 'macho',
        ['Max', 'Rocky', 'Toby', 'Bruno', 'Thor', 'Coco', 'Milo', 'Rex', 'Duke', 'Buddy', 'Charlie', 'Jack', 'Oscar', 'Teo', 'Leo', 'Lucas', 'Nico', 'Tyson', 'Bobby', 'Lobo', 'Chester', 'Ringo', 'Pancho', 'Beto']),
      section('fuertes', 'Nombres fuertes para perros grandes', 'Con presencia, para perros de gran carácter.', 'naturaleza', 'macho',
        ['Titán', 'Trueno', 'Rayo', 'Volcán', 'Goliat', 'Sansón', 'Hércules', 'Búfalo', 'Tanque', 'Bravo', 'Vikingo', 'Samurái', 'Gladiador', 'Centauro', 'Coloso', 'Yeti', 'Barón', 'Capitán', 'Sargento', 'Comandante']),
      section('divertidos', 'Nombres divertidos de comida', 'Para sacar una sonrisa cada vez que lo llames.', 'divertidos', 'macho',
        ['Churro', 'Taco', 'Nacho', 'Tamal', 'Frijol', 'Waffle', 'Mostaza', 'Pistacho', 'Tostón', 'Bizcocho', 'Garbanzo', 'Turrón', 'Chicharrón', 'Pretzel', 'Piñón', 'Ketchup', 'Panqué', 'Buñuelo', 'Polvorón', 'Cacahuate']),
      section('personas', 'Nombres de persona con mucha gracia', 'Nombres de toda la vida que en un perro resultan encantadores.', 'clasicos', 'macho',
        ['Manolo', 'Paco', 'Tomás', 'Félix', 'Simón', 'Oliver', 'Ramón', 'Fermín', 'Benito', 'Gaspar', 'Anselmo', 'Rufino', 'Nicanor', 'Eusebio', 'Evaristo', 'Hilario', 'Lisandro', 'Matías', 'Bautista', 'Ignacio']),
      section('naturaleza', 'Nombres inspirados en la naturaleza', 'Para compañeros de campo, montaña y aventura.', 'naturaleza', 'macho',
        ['Bosque', 'Roble', 'Cedro', 'Musgo', 'Pino', 'Otoño', 'Océano', 'Cometa', 'Relámpago', 'Viento', 'Río', 'Granizo', 'Monte', 'Valle', 'Sauce', 'Eucalipto', 'Junco', 'Tornado', 'Huracán', 'Glaciar']),
    ],
  },
  {
    path: 'perros/hembra',
    species: 'dog',
    sex: 'hembra',
    label: 'Nombres para perras',
    h1: 'Nombres para perros hembras',
    lead: 'Nombres populares, elegantes, tiernos y divertidos para tu perrita.',
    tips: [
      'Un nombre que termina en vocal suele sonar claro y alegre al llamarla.',
      'Evita los diminutivos largos: acabarás acortándolos igualmente.',
      'Comprueba que no se parezca al nombre de otra mascota de la casa.',
    ],
    faq: [
      { q: '¿Qué nombre le pongo a mi perrita?', a: 'Empieza por su carácter: Coqueta o Burbuja encajan con una perrita juguetona, y Duquesa o Perla con una más tranquila.' },
      { q: '¿Cuántas sílabas debe tener el nombre de una perra?', a: 'Lo más práctico son dos o tres sílabas, porque el nombre se dice rápido y se distingue bien.' },
    ],
    sections: [
      section('populares', 'Nombres populares para perras', 'Los favoritos de muchas familias.', 'clasicos', 'hembra',
        ['Lola', 'Kira', 'Nala', 'Maya', 'Mía', 'Frida', 'Julieta', 'Greta', 'Chloe', 'Bella', 'Emma', 'Sofía', 'Daisy', 'Lila', 'Olivia', 'Carlota', 'Luna', 'Canela', 'Nina', 'Lucy', 'Molly', 'Sasha', 'Bimba', 'Tina']),
      section('elegantes', 'Nombres elegantes para perras', 'Títulos, joyas y nombres con distinción.', 'clasicos', 'hembra',
        ['Duquesa', 'Condesa', 'Marquesa', 'Baronesa', 'Emperatriz', 'Reina', 'Princesa', 'Dama', 'Perla', 'Diamante', 'Esmeralda', 'Turquesa', 'Coral', 'Seda', 'Gala', 'Vera', 'Alessia', 'Valentina', 'Antonella', 'Isabella']),
      section('tiernos', 'Nombres tiernos para perritas', 'Dulces y cariñosos, para llamarla con una sonrisa.', 'tiernos', 'hembra',
        ['Pelusa', 'Mimosa', 'Muñeca', 'Chispita', 'Coqueta', 'Lunita', 'Estrellita', 'Nena', 'Preciosa', 'Bonita', 'Cuqui', 'Dulcinea', 'Pompita', 'Burbuja', 'Golosina', 'Gominola', 'Caramela', 'Ricura', 'Cosita', 'Alegría']),
      section('divertidos', 'Nombres divertidos de comida', 'Para perritas con mucho sentido del humor.', 'divertidos', 'hembra',
        ['Galleta', 'Croqueta', 'Albóndiga', 'Pizza', 'Empanada', 'Quesadilla', 'Patata', 'Salsa', 'Mermelada', 'Aceituna', 'Paella', 'Natilla', 'Rosquilla', 'Pimienta', 'Ciruela', 'Avellana', 'Vainilla', 'Almendra', 'Magdalena', 'Chía']),
      section('flores', 'Nombres de flores', 'Delicados y fáciles de recordar.', 'naturaleza', 'hembra',
        ['Margarita', 'Violeta', 'Rosa', 'Jazmín', 'Lavanda', 'Amapola', 'Gardenia', 'Azucena', 'Dalia', 'Camelia', 'Hortensia', 'Orquídea', 'Magnolia', 'Begonia', 'Petunia', 'Verbena', 'Malva', 'Azalea', 'Alelí', 'Tulipa']),
    ],
  },
  {
    path: 'gatos',
    species: 'cat',
    sex: 'todos',
    label: 'Nombres para gatos',
    h1: 'Nombres para gatos',
    lead: 'Nombres bonitos, japoneses, egipcios y divertidos para tu gato o gata.',
    tips: [
      'Elige un nombre que te guste pronunciar con cariño: lo vas a repetir muchas veces al día.',
      'Asocia su nombre con la comida o los mimos para que acuda al oírlo.',
      'Date unos días para conocerlo: su personalidad puede inspirarte.',
    ],
    faq: [
      { q: '¿Los gatos reconocen su nombre?', a: 'Sí. Un estudio publicado en Scientific Reports en 2019 observó que los gatos distinguen su nombre de otras palabras parecidas, aunque no siempre acudan al oírlo.' },
      { q: '¿Qué nombre le puedo poner a mi gato?', a: 'Busca algo breve que encaje con su carácter. Si dudas, prueba el generador de nombres y filtra por estilo.' },
    ],
    sections: [
      section('bonitos', 'Nombres bonitos para gatos', 'Suaves y felinos, como un ronroneo.', 'tiernos', 'todos',
        ['Michi', 'Mishi', 'Micifuz', 'Misu', 'Minino', 'Bigotes', 'Zarpitas', 'Cascabel', 'Ovillo', 'Lana', 'Terciopelo', 'Cojín', 'Siesta', 'Susurro', 'Mimo', 'Caricia', 'Ronrón', 'Pantufla', 'Peluchín', 'Algodón']),
      section('japoneses', 'Nombres japoneses para gatos', 'Palabras japonesas breves, con su significado.', 'naturaleza', 'todos',
        ['Hana:flor', 'Yuki:nieve', 'Sora:cielo', 'Kumo:nube', 'Mochi:pastel de arroz', 'Sakura:flor de cerezo', 'Kaze:viento', 'Hoshi:estrella', 'Tora:tigre', 'Neko:gato', 'Momo:melocotón', 'Aki:otoño', 'Haru:primavera', 'Natsu:verano', 'Fuyu:invierno', 'Umi:mar', 'Tsuki:luna', 'Kin:oro', 'Ame:lluvia', 'Tofu:queso de soja']),
      section('dioses-egipcios', 'Nombres egipcios para gatos', 'Dioses y faraones del Antiguo Egipto, donde los gatos eran muy apreciados.', 'miticos', 'macho',
        ['Anubis:guardián de las tumbas', 'Horus:dios del cielo', 'Osiris:dios del más allá', 'Ra:dios del sol', 'Thot:dios de la sabiduría', 'Seth:dios del caos', 'Ptah:dios creador', 'Amón:dios de Tebas', 'Ramsés:gran faraón', 'Keops:faraón de la Gran Pirámide']),
      section('diosas-egipcias', 'Nombres egipcios para gatas', 'Diosas y reinas, empezando por la diosa gata.', 'miticos', 'hembra',
        ['Bastet:diosa con forma de gata', 'Sejmet:diosa leona', 'Hathor:diosa del amor', 'Nut:diosa del cielo', 'Maat:diosa de la justicia', 'Nefertiti:reina de Egipto', 'Cleopatra:última reina de Egipto', 'Hatshepsut:mujer faraón', 'Neftis:diosa protectora', 'Tefnut:diosa de la humedad']),
      section('divertidos', 'Nombres divertidos para gatos', 'Para los reyes del desorden en casa.', 'divertidos', 'todos',
        ['Miauricio', 'Miaunolo', 'Gatolomeo', 'Gatón', 'Señor Bigotes', 'Zarpazo', 'Arañazo', 'Trasto', 'Travieso', 'Bandido', 'Pillo', 'Caos', 'Drama', 'Lío', 'Jaleo', 'Zafarrancho', 'Tornillo', 'Sushi', 'Wasabi', 'Ramen']),
      section('cortos', 'Nombres cortos para gatos', 'Breves y fáciles de decir.', 'clasicos', 'todos',
        ['Gia', 'Ozu', 'Mo', 'Pi', 'Ki', 'Lu', 'Ty', 'Ziggy', 'Izzy', 'Nox', 'Kit', 'Bea', 'Ada', 'Ivo', 'Ona', 'Nil', 'Lia', 'Oli', 'Tai', 'Pip']),
    ],
  },
  {
    path: 'gatos/macho',
    species: 'cat',
    sex: 'macho',
    label: 'Nombres para gatos machos',
    h1: 'Nombres para gatos machos',
    lead: 'Nombres populares, originales y con mucha clase para tu gato.',
    tips: [
      'Un gato independiente agradece un nombre con personalidad: Sultán o Duque le quedan muy bien.',
      'Usa siempre el mismo nombre y evita cambiarlo por muchos apodos al principio.',
      'Prueba a llamarlo con voz suave para ver cómo reacciona.',
    ],
    faq: [
      { q: '¿Qué nombre original le pongo a mi gato macho?', a: 'Los científicos, artistas y astros son una buena fuente: Newton, Dalí o Júpiter son originales y fáciles de recordar.' },
      { q: '¿Es mejor un nombre corto para un gato?', a: 'Suele ser más práctico. Un nombre de dos sílabas se pronuncia rápido y resulta cómodo en el día a día.' },
    ],
    sections: [
      section('populares', 'Nombres populares para gatos machos', 'Nombres muy queridos para compañeros felinos.', 'clasicos', 'macho',
        ['Tom', 'Salem', 'Romeo', 'Mateo', 'Mauro', 'Bruce', 'Merlín', 'Pelayo', 'Silvestre', 'Tigre', 'Hugo', 'Elvis', 'Dante', 'Gael', 'Iker', 'Nilo', 'Enzo', 'Thiago', 'Bastian', 'Lennon', 'Mozart', 'Sebastián', 'Oto', 'Marcelo']),
      section('originales', 'Nombres originales de genios', 'Científicos, artistas y escritores para gatos muy listos.', 'divertidos', 'macho',
        ['Byte', 'Kernel', 'Binario', 'Átomo', 'Neutrón', 'Newton', 'Einstein', 'Darwin', 'Galileo', 'Kepler', 'Sherlock', 'Watson', 'Dalí', 'Picasso', 'Gaudí', 'Goya', 'Botero', 'Neruda', 'Borges', 'Cortázar']),
      section('nobles', 'Nombres de la realeza', 'Porque en casa manda él.', 'clasicos', 'macho',
        ['Duque', 'Conde', 'Marqués', 'Vizconde', 'Príncipe', 'Rey', 'Emperador', 'Sultán', 'Faraón', 'Zar', 'Káiser', 'Maharajá', 'Lord', 'Sir', 'Señorito', 'Caballero', 'Mayordomo', 'Archiduque', 'Virrey', 'Monarca']),
      section('comida', 'Nombres de comida', 'Para gatos que acuden corriendo al oír abrir una lata.', 'divertidos', 'macho',
        ['Atún', 'Salmón', 'Sardino', 'Boquerón', 'Camarón', 'Lenguado', 'Bacalao', 'Langostino', 'Pulpo', 'Calamar', 'Pescadito', 'Gambito', 'Queso', 'Paté', 'Yogur', 'Flan', 'Hojaldre', 'Tiramisú', 'Brownie', 'Mazapán']),
      section('astros', 'Nombres de planetas y estrellas', 'Para exploradores nocturnos.', 'naturaleza', 'macho',
        ['Júpiter', 'Saturno', 'Marte', 'Neptuno', 'Urano', 'Plutón', 'Mercurio', 'Sirio', 'Cosmos', 'Eclipse', 'Meteoro', 'Asteroide', 'Cenit', 'Polar', 'Altair', 'Rigel', 'Antares', 'Aldebarán', 'Cástor', 'Pólux']),
    ],
  },
  {
    path: 'gatos/hembra',
    species: 'cat',
    sex: 'hembra',
    label: 'Nombres para gatas',
    h1: 'Nombres para gatos hembra',
    lead: 'Nombres populares, con clase, dulces y mitológicos para tu gata.',
    tips: [
      'Fíjate en su mirada y sus gestos: una gata serena pide un nombre distinto al de una traviesa.',
      'Si tiene un nombre largo, elige también un apodo corto para el día a día.',
      'Llámala por su nombre antes de darle comida para que lo reconozca.',
    ],
    faq: [
      { q: '¿Qué nombre le pongo a mi gata?', a: 'Puedes inspirarte en su carácter o en lo que te gusta: la mitología, la naturaleza o los dulces ofrecen muchas ideas.' },
      { q: '¿Qué nombres de diosas quedan bien a una gata?', a: 'Atenea, Freya, Selene o Artemisa son nombres con mucha fuerza que encajan con el porte de una gata.' },
    ],
    sections: [
      section('populares', 'Nombres populares para gatas', 'Sencillos, bonitos y muy queridos.', 'clasicos', 'hembra',
        ['Mimi', 'Lulú', 'Zoe', 'Minerva', 'Cleo', 'Tita', 'Nora', 'Alicia', 'Matilda', 'Amelia', 'Chiara', 'Mila', 'Kiara', 'Bianca', 'Dora', 'Fiona', 'Gina', 'Irene', 'Ofelia', 'Rita', 'Sara', 'Telma', 'Wanda', 'Renata']),
      section('clase', 'Nombres con mucha clase', 'Nombres largos y sonoros para gatas distinguidas.', 'clasicos', 'hembra',
        ['Anastasia', 'Josefina', 'Catalina', 'Victoria', 'Eugenia', 'Leonor', 'Beatriz', 'Cayetana', 'Georgina', 'Ágata', 'Bárbara', 'Cordelia', 'Eloísa', 'Genoveva', 'Griselda', 'Mercedes', 'Octavia', 'Clementina', 'Serafina', 'Aurelia']),
      section('dulces', 'Nombres dulces', 'Frutas y postres para una gata muy dulce.', 'divertidos', 'hembra',
        ['Tarta', 'Crepa', 'Frambuesa', 'Fresa', 'Cereza', 'Mora', 'Grosella', 'Mandarina', 'Manzanita', 'Piña', 'Sandía', 'Cocada', 'Horchata', 'Canelita', 'Melaza', 'Tapioca', 'Pavlova', 'Dona', 'Praliné', 'Gelatina']),
      section('naturaleza', 'Nombres inspirados en la naturaleza', 'Ligeros como la brisa.', 'naturaleza', 'hembra',
        ['Lluvia', 'Brisa', 'Selva', 'Aurora', 'Nieve', 'Hoja', 'Marina', 'Gaviota', 'Mariposa', 'Libélula', 'Golondrina', 'Ola', 'Espuma', 'Rocío', 'Neblina', 'Primavera', 'Arcoíris', 'Alondra', 'Luciérnaga', 'Sirena']),
      section('mitologia', 'Nombres de diosas', 'Diosas y heroínas de distintas mitologías.', 'miticos', 'hembra',
        ['Atenea', 'Afrodita', 'Artemisa', 'Hera', 'Freya', 'Iris', 'Circe', 'Pandora', 'Calipso', 'Gaia', 'Selene', 'Ixchel', 'Dafne', 'Temis', 'Medea', 'Andrómeda', 'Perséfone', 'Deméter', 'Hécate', 'Nyx']),
    ],
  },
].map((page) => Object.freeze(page)));

export function parseName(entry) {
  const [name, meaning = ''] = entry.split(':');
  return { name, meaning };
}

export const countNames = (page) => page.sections.reduce((total, item) => total + item.names.length, 0);
