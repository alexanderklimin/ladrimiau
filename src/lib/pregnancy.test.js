import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateDueDate, daysSince } from './pregnancy.js';

test('dog from mating: 58, 63 and 72 days', () => {
  assert.deepEqual(estimateDueDate({ species: 'dog', date: '2026-01-01' }), {
    earliest: '2026-02-28',
    likely: '2026-03-05',
    latest: '2026-03-14',
  });
});

test('dog from ovulation: 64, 65 and 66 days', () => {
  assert.deepEqual(estimateDueDate({ species: 'dog', basis: 'ovulation', date: '2026-01-01' }), {
    earliest: '2026-03-06',
    likely: '2026-03-07',
    latest: '2026-03-08',
  });
});

test('cat from mating: 64, 65 and 66 days', () => {
  assert.deepEqual(estimateDueDate({ species: 'cat', date: '2026-01-01' }), {
    earliest: '2026-03-06',
    likely: '2026-03-07',
    latest: '2026-03-08',
  });
});

test('handles leap years and year boundaries', () => {
  assert.equal(estimateDueDate({ species: 'dog', date: '2028-01-01' }).likely, '2028-03-04');
  assert.equal(estimateDueDate({ species: 'cat', date: '2026-12-01' }).likely, '2027-02-04');
});

test('rejects invalid input', () => {
  for (const date of ['2026-02-30', '01/02/2026', '', undefined]) {
    assert.throws(() => estimateDueDate({ species: 'dog', date }), RangeError);
  }
  assert.throws(() => estimateDueDate({ species: 'cat', basis: 'ovulation', date: '2026-01-01' }), RangeError);
  assert.throws(() => estimateDueDate({ species: 'bird', date: '2026-01-01' }), RangeError);
});

test('daysSince counts elapsed days and goes negative for future dates', () => {
  assert.equal(daysSince('2026-01-01', '2026-01-31'), 30);
  assert.equal(daysSince('2026-02-01', '2026-01-31'), -1);
});
