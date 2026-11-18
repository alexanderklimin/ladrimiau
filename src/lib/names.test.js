import test from 'node:test';
import assert from 'node:assert/strict';
import { STYLES, listNames, generateNames } from './names.js';

test('every style has male and female names', () => {
  for (const style of Object.keys(STYLES)) {
    assert.ok(listNames({ style, sex: 'macho' }).length >= 10, style);
    assert.ok(listNames({ style, sex: 'hembra' }).length >= 10, style);
  }
});

test('listNames has no duplicates', () => {
  const names = listNames();
  assert.equal(new Set(names).size, names.length);
});

test('sex filter keeps the groups apart', () => {
  const male = new Set(listNames({ sex: 'macho' }));
  assert.ok(male.has('Churro'));
  assert.ok(!male.has('Galleta'));
});

test('initial filter ignores accents and case', () => {
  const names = listNames({ initial: 'A' });
  assert.ok(names.includes('Atenea'));
  assert.ok(names.includes('Ares'));
  assert.ok(listNames({ initial: 'o' }).includes('Odín'));
  assert.ok(listNames({ initial: 'á' }).includes('Atlas'));
});

test('generateNames respects the count and never repeats', () => {
  const names = generateNames({}, 8);
  assert.equal(names.length, 8);
  assert.equal(new Set(names).size, 8);
});

test('generateNames is deterministic with an injected random source', () => {
  const fixed = () => 0.42;
  assert.deepEqual(generateNames({ style: 'clasicos' }, 5, fixed), generateNames({ style: 'clasicos' }, 5, fixed));
});

test('generateNames returns an empty list when nothing matches', () => {
  assert.deepEqual(generateNames({ initial: 'x', style: 'clasicos' }), []);
});
