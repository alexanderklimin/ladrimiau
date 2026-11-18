import test from 'node:test';
import assert from 'node:assert/strict';
import { FOOD_DETAILS, getFoodDetails } from './foodDetails.js';
import { VERDICTS, findFood } from './foods.js';

const entries = Object.entries(FOOD_DETAILS);

test('the 15 most searched dog foods have extended guidance', () => {
  assert.equal(entries.length, 15);
  for (const [slug] of entries) assert.ok(findFood('dog', slug), slug);
});

test('every entry is complete and sourced', () => {
  for (const [slug, item] of entries) {
    assert.ok(item.benefit.length > 40, `${slug}: benefit`);
    assert.ok(item.forms.length >= 3, `${slug}: forms`);
    assert.ok(item.caution.length >= 2, `${slug}: caution`);
    assert.ok(item.ifTitle && item.ifEaten.length > 40, `${slug}: ifEaten`);
    assert.equal(item.faq.length, 3, `${slug}: faq`);
    assert.ok(item.links.length >= 2, `${slug}: links`);
    for (const link of item.links) assert.match(link.url, /^https:\/\/www\.(petmd|akc)\.(com|org)\//, slug);
    for (const [verdict] of item.forms) assert.ok(VERDICTS[verdict], `${slug}: ${verdict}`);
  }
});

test('portion tables always cover five dog sizes', () => {
  for (const [slug, item] of entries) {
    if (item.portions) assert.equal(item.portions.rows.length, 5, slug);
  }
});

test('foods the dog must not eat never get a serving table', () => {
  for (const slug of ['uva', 'nuez', 'aguacate']) {
    assert.equal(FOOD_DETAILS[slug].portions, undefined, slug);
    assert.equal(FOOD_DETAILS[slug].portionText, undefined, slug);
  }
});

test('toxic foods offer no allowed form', () => {
  for (const slug of ['uva', 'nuez']) {
    assert.ok(FOOD_DETAILS[slug].forms.every(([verdict]) => verdict === 'no'), slug);
  }
});

test('questions are unique across pages', () => {
  const questions = entries.flatMap(([, item]) => item.faq.map(([question]) => question));
  assert.equal(new Set(questions).size, questions.length);
});

test('details apply to dogs only', () => {
  assert.ok(getFoodDetails('dog', 'fresa'));
  assert.equal(getFoodDetails('cat', 'fresa'), undefined);
});
