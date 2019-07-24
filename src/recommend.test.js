const { recommend } = require('../');

test('valid single forestType recommendations', () => {
  expect(recommend('60')).toStrictEqual({
    one: [302800],
    three: [800, 25400, 60400, 60500, 227200, 363700],
    two: [402300],
  });
});

test('valid multiple forestType recommendations', () => {
  expect(recommend('60', '50')).toStrictEqual({
    one: [302800, 100],
    two: [402300, 800],
    three: [
      800,
      25400,
      60400,
      60500,
      227200,
      363700,
      25300,
      174200,
      317500,
      402200,
    ],
  });
});

test('at least one forest Type required', () => {
  expect(() => recommend()).toThrowError(
    `at least one forest type is required to get the recommendation of tree species`,
  );
});
