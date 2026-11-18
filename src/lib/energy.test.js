import test from 'node:test';
import assert from 'node:assert/strict';
import { FACTORS, restingEnergy, dailyEnergy, portionGrams } from './energy.js';

test('restingEnergy matches the AAHA worked example (4.5 kg → 216 kcal)', () => {
  assert.equal(Math.round(restingEnergy(4.5)), 216);
});

test('restingEnergy of 1 kg is exactly 70 kcal', () => {
  assert.equal(restingEnergy(1), 70);
});

test('restingEnergy rejects invalid weights', () => {
  for (const bad of [0, -3, NaN, Infinity, undefined, '10']) {
    assert.throws(() => restingEnergy(bad), RangeError);
  }
});

test('dailyEnergy returns the neutered adult dog range', () => {
  assert.deepEqual(dailyEnergy({ species: 'dog', weightKg: 10, stage: 'neutered' }), {
    rer: 394,
    minKcal: 551,
    maxKcal: 630,
  });
});

test('dailyEnergy gives a single value for growth stages', () => {
  const puppy = dailyEnergy({ species: 'dog', weightKg: 5, stage: 'puppyUnder4m' });
  assert.equal(puppy.minKcal, puppy.maxKcal);
  const kitten = dailyEnergy({ species: 'cat', weightKg: 2, stage: 'kitten' });
  assert.equal(kitten.minKcal, Math.round(70 * 2 ** 0.75 * 2.5));
});

test('every factor range is ordered', () => {
  for (const stages of Object.values(FACTORS)) {
    for (const [min, max] of Object.values(stages)) assert.ok(min <= max);
  }
});

test('dailyEnergy rejects stages from the other species and implausible weights', () => {
  assert.throws(() => dailyEnergy({ species: 'cat', weightKg: 4, stage: 'puppyUnder4m' }), RangeError);
  assert.throws(() => dailyEnergy({ species: 'bird', weightKg: 1, stage: 'neutered' }), RangeError);
  assert.throws(() => dailyEnergy({ species: 'cat', weightKg: 40, stage: 'neutered' }), RangeError);
});

test('portionGrams converts kcal using the food energy density', () => {
  assert.equal(portionGrams(350, 350), 100);
  assert.equal(portionGrams(551, 380), 145);
  assert.throws(() => portionGrams(500, 0), RangeError);
  assert.throws(() => portionGrams(0, 350), RangeError);
});
