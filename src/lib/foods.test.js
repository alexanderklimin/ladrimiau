import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FOODS, SOURCES, VERDICTS, findFood, searchFoods } from './foods.js';

const planned = readFileSync(new URL('../../research/content_plan.csv', import.meta.url), 'utf8');
const folders = { dog: 'perros', cat: 'gatos' };

for (const [species, foods] of Object.entries(FOODS)) {
  test(`${species}: every entry is complete and sourced`, () => {
    for (const item of foods) {
      assert.ok(VERDICTS[item.verdict], `${item.slug}: verdict`);
      assert.ok(item.answer.length > 30, `${item.slug}: answer`);
      assert.ok(item.how.length > 0, `${item.slug}: how`);
      assert.ok(item.risks.length > 0, `${item.slug}: risks`);
      assert.ok(item.sources.length > 0, `${item.slug}: sources`);
      for (const key of item.sources) assert.ok(SOURCES[key], `${item.slug}: unknown source ${key}`);
    }
  });

  test(`${species}: slugs are unique and belong to the content plan`, () => {
    const slugs = foods.map((item) => item.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const slug of slugs) {
      assert.ok(planned.includes(`/${folders[species]}/pueden-comer/${slug}/`), `${slug} is not in the plan`);
    }
  });

  test(`${species}: answers are unique`, () => {
    const answers = foods.map((item) => item.answer);
    assert.equal(new Set(answers).size, answers.length);
  });
}

test('known toxic foods are never marked as allowed', () => {
  for (const slug of ['uva', 'chocolate', 'cebolla', 'ajo']) {
    assert.equal(findFood('dog', slug).verdict, 'no', `dog ${slug}`);
    assert.equal(findFood('cat', slug).verdict, 'no', `cat ${slug}`);
  }
  assert.equal(findFood('dog', 'pasa').verdict, 'no');
});

test('foods with conflicting sources keep a cautious verdict', () => {
  for (const slug of ['aguacate', 'cereza', 'tomate', 'queso']) {
    assert.notEqual(findFood('dog', slug).verdict, 'si', slug);
  }
});

test('searchFoods ignores accents and matches regional names', () => {
  assert.deepEqual(searchFoods('dog', 'sandia').map((item) => item.slug), ['sandia']);
  assert.deepEqual(searchFoods('dog', 'PALTA').map((item) => item.slug), ['aguacate']);
  assert.ok(searchFoods('dog', '', 'no').every((item) => item.verdict === 'no'));
  assert.deepEqual(searchFoods('bird', 'sandia'), []);
});
