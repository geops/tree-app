const { info } = require('../src');

test('valid german translation', () => {
  expect(info('treeType', 100).de).toStrictEqual('Tanne');
});
test('valid endangered attribute', () => {
  expect(info('treeType', 433000).endangered).toStrictEqual(true);
});

test('invalid type', () => {
  expect(() => info('fooBar', 100)).toThrowError('fooBar is not a valid type.');
});

test('invalid code', () => {
  expect(() => info('treeType', 'fooBar')).toThrowError(
    'treeType.fooBar is not a valid code.',
  );
});
