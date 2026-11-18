import test from 'node:test';
import assert from 'node:assert/strict';
import { STYLES, listNames, generateNames } from './names.js';
import { NAME_PAGES, countNames, parseName } from './nameLists.js';

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

const plain = (text) => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

test('every name page offers at least 100 names', () => {
  assert.equal(NAME_PAGES.length, 6);
  for (const page of NAME_PAGES) assert.ok(countNames(page) >= 100, `${page.path}: ${countNames(page)}`);
});

test('a name never repeats across name pages', () => {
  const seen = new Map();
  for (const page of NAME_PAGES) {
    for (const { names } of page.sections) {
      for (const entry of names) {
        const key = plain(parseName(entry).name);
        assert.ok(!seen.has(key), `${key}: ${seen.get(key)} and ${page.path}`);
        seen.set(key, page.path);
      }
    }
  }
});

test('names that are vulgar or sensitive in Spanish-speaking countries stay out', () => {
  const blocked = ['concha', 'cuca', 'chucha', 'papaya', 'arepa', 'pico', 'polla', 'pija', 'verga', 'bicho', 'chocho', 'bollo', 'cajeta', 'panocha', 'pepa', 'pinga', 'chimba', 'nabo', 'pito', 'chichi', 'tula', 'mejillon', 'almeja', 'zorra', 'isis', 'nike'];
  const names = new Set(listNames().map(plain));
  for (const word of blocked) assert.ok(!names.has(word), word);
});

test('page sections use known styles and sexes', () => {
  for (const page of NAME_PAGES) {
    for (const item of page.sections) {
      assert.ok(STYLES[item.style], item.id);
      assert.ok(['macho', 'hembra', 'todos'].includes(item.sex), item.id);
    }
  }
});

test('the generator includes names from the collections', () => {
  assert.ok(listNames({ sex: 'hembra' }).includes('Bastet'));
  assert.ok(listNames({ sex: 'macho' }).includes('Anubis'));
  assert.ok(!listNames({ sex: 'macho' }).includes('Bastet'));
});
