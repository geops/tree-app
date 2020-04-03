const { locate } = require('../src');

test('indicator', () => {
  expect(
    locate({ indicators: [1000446, 1000574] }).forestTypes.main,
  ).toStrictEqual(['45', '56', '57S', '57STa']);
});
