// Pet name generator. Framework-free so the app can reuse it.

export const STYLES = Object.freeze({
  tiernos: 'Tiernos',
  divertidos: 'Divertidos',
  naturaleza: 'Naturaleza',
  clasicos: 'Clásicos',
  miticos: 'Mitológicos',
});

const NAMES = {
  tiernos: {
    macho: ['Bombón', 'Peluche', 'Copito', 'Algodón', 'Mimoso', 'Osito', 'Dulce', 'Pompón', 'Tesoro', 'Rizos', 'Nube', 'Solecito', 'Chiqui', 'Lucero', 'Gordi', 'Bebé'],
    hembra: ['Pelusa', 'Dulcinea', 'Mimosa', 'Princesa', 'Perla', 'Muñeca', 'Canela', 'Chispita', 'Coqueta', 'Lunita', 'Estrellita', 'Nena', 'Preciosa', 'Bonita', 'Reina', 'Cuqui'],
  },
  divertidos: {
    macho: ['Churro', 'Taco', 'Nacho', 'Tamal', 'Pepino', 'Chorizo', 'Frijol', 'Waffle', 'Mostaza', 'Pistacho', 'Elote', 'Tostón', 'Bizcocho', 'Garbanzo', 'Turrón', 'Chicharrón'],
    hembra: ['Galleta', 'Croqueta', 'Tortilla', 'Pizza', 'Empanada', 'Quesadilla', 'Papaya', 'Patata', 'Salsa', 'Mermelada', 'Aceituna', 'Paella', 'Arepa', 'Natilla', 'Rosquilla', 'Pimienta'],
  },
  naturaleza: {
    macho: ['Río', 'Trueno', 'Bosque', 'Roble', 'Cedro', 'Rayo', 'Sol', 'Viento', 'Musgo', 'Volcán', 'Cielo', 'Pino', 'Otoño', 'Océano', 'Cometa', 'Relámpago'],
    hembra: ['Luna', 'Brisa', 'Lluvia', 'Aurora', 'Nieve', 'Selva', 'Estrella', 'Hoja', 'Margarita', 'Violeta', 'Rosa', 'Jazmín', 'Lavanda', 'Marina', 'Gaviota', 'Amapola'],
  },
  clasicos: {
    macho: ['Max', 'Rocky', 'Toby', 'Simón', 'Bruno', 'Thor', 'Coco', 'Lucas', 'Leo', 'Teo', 'Milo', 'Oliver', 'Félix', 'Tomás', 'Paco', 'Manolo'],
    hembra: ['Lola', 'Kira', 'Nala', 'Maya', 'Mía', 'Frida', 'Julieta', 'Greta', 'Chloe', 'Bella', 'Emma', 'Sofía', 'Daisy', 'Lila', 'Olivia', 'Carlota'],
  },
  miticos: {
    macho: ['Zeus', 'Apolo', 'Ares', 'Hermes', 'Odín', 'Loki', 'Hércules', 'Aquiles', 'Perseo', 'Poseidón', 'Orión', 'Quetzal', 'Atlas', 'Eros', 'Hades', 'Ulises'],
    hembra: ['Atenea', 'Afrodita', 'Artemisa', 'Hera', 'Freya', 'Isis', 'Circe', 'Pandora', 'Calipso', 'Gaia', 'Selene', 'Ixchel', 'Dafne', 'Nike', 'Medea', 'Andrómeda'],
  },
};

const normalize = (text) => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

export function listNames({ sex = 'todos', style = 'todos', initial = '' } = {}) {
  const styles = style === 'todos' ? Object.keys(NAMES) : [style];
  const sexes = sex === 'todos' ? ['macho', 'hembra'] : [sex];
  const letter = normalize(initial).trim().slice(0, 1);
  const names = styles.flatMap((key) => sexes.flatMap((value) => NAMES[key]?.[value] ?? []));
  return [...new Set(names)].filter((name) => !letter || normalize(name).startsWith(letter));
}

// `random` is injectable so tests can make the shuffle deterministic.
export function generateNames(options = {}, count = 8, random = Math.random) {
  const pool = listNames(options);
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [pool[index], pool[swap]] = [pool[swap], pool[index]];
  }
  return pool.slice(0, count);
}
