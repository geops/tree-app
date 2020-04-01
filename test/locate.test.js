const { locate } = require('../src');

test('indicator', () => {
  expect(locate({ indicators: [1000446, 1000574] }).forestTypes).toStrictEqual([
    '22',
    '22Fe',
    '45',
    '56',
    '57S',
    '57STa',
  ]);
});
