// Due-date estimate for dogs and cats. Dates are ISO strings (YYYY-MM-DD) handled in
// UTC so the result never shifts with the visitor's time zone.
// Ranges: Merck Veterinary Manual, "Whelping and Queening in Bitches and Queens".

export const GESTATION = Object.freeze({
  dog: Object.freeze({
    mating: Object.freeze({ min: 58, likely: 63, max: 72 }),
    ovulation: Object.freeze({ min: 64, likely: 65, max: 66 }),
  }),
  cat: Object.freeze({
    mating: Object.freeze({ min: 63, likely: 65, max: 67 }),
  }),
});

const DAY_MS = 86_400_000;

function parseIsoDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  if (!match) throw new RangeError('Date must use the YYYY-MM-DD format');
  const [year, month, day] = match.slice(1).map(Number);
  const time = Date.UTC(year, month - 1, day);
  const date = new Date(time);
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new RangeError('Date does not exist');
  }
  return time;
}

const toIso = (time) => new Date(time).toISOString().slice(0, 10);

export function estimateDueDate({ species, basis = 'mating', date }) {
  const range = GESTATION[species]?.[basis];
  if (!range) throw new RangeError(`Unknown basis "${basis}" for species "${species}"`);
  const start = parseIsoDate(date);
  return {
    earliest: toIso(start + range.min * DAY_MS),
    likely: toIso(start + range.likely * DAY_MS),
    latest: toIso(start + range.max * DAY_MS),
  };
}

// Whole days elapsed since `date`; negative when `date` is in the future.
export function daysSince(date, today) {
  return Math.round((parseIsoDate(today) - parseIsoDate(date)) / DAY_MS);
}
