const { recommend } = require('../');

test('valid recommendations', () => {
  expect(recommend('60E')).toStrictEqual([302800]);
});
