const { translate } = require('../');

test('valid translation', () => {
  expect(translate('treeType', 100, 'de')).toStrictEqual('Tanne');
});

test('unsupported language', () => {
  expect(() => translate('treeType', 100, 'fooBar')).toThrowError(
    'fooBar is not supported.',
  );
});

test('invalid type', () => {
  expect(() => translate('fooBar', 100, 'de')).toThrowError(
    'fooBar is not a valid type.',
  );
});

test('invalid key', () => {
  expect(() => translate('treeType', 'fooBar', 'de')).toThrowError(
    'Translation for treeType.fooBar not found.',
  );
});
