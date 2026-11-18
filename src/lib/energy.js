// Daily energy estimate for dogs and cats. Framework-free so the app can reuse it.
// RER = 70 × kg^0.75; life-stage ranges follow the AAHA 2021 Nutrition and Weight
// Management Guidelines.

export const FACTORS = Object.freeze({
  dog: Object.freeze({
    neutered: [1.4, 1.6],
    intact: [1.6, 1.8],
    inactive: [1.0, 1.2],
    puppyUnder4m: [3.0, 3.0],
    puppyOver4m: [2.0, 2.0],
  }),
  cat: Object.freeze({
    neutered: [1.2, 1.4],
    intact: [1.4, 1.6],
    inactive: [1.0, 1.0],
    kitten: [2.5, 2.5],
  }),
});

const MAX_WEIGHT_KG = { dog: 120, cat: 15 };

export function restingEnergy(weightKg) {
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    throw new RangeError('weightKg must be a positive number');
  }
  return 70 * weightKg ** 0.75;
}

export function dailyEnergy({ species, weightKg, stage }) {
  const range = FACTORS[species]?.[stage];
  if (!range) throw new RangeError(`Unknown stage "${stage}" for species "${species}"`);
  if (weightKg > MAX_WEIGHT_KG[species]) {
    throw new RangeError(`weightKg exceeds the ${MAX_WEIGHT_KG[species]} kg limit for ${species}`);
  }
  const rer = restingEnergy(weightKg);
  return {
    rer: Math.round(rer),
    minKcal: Math.round(rer * range[0]),
    maxKcal: Math.round(rer * range[1]),
  };
}

export function portionGrams(kcal, kcalPer100g) {
  if (!Number.isFinite(kcal) || kcal <= 0) throw new RangeError('kcal must be a positive number');
  if (!Number.isFinite(kcalPer100g) || kcalPer100g <= 0) {
    throw new RangeError('kcalPer100g must be a positive number');
  }
  return Math.round((kcal / kcalPer100g) * 100);
}
