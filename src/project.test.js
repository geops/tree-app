const { project } = require('../');

test('valid projection', () => {
  expect(
    project({
      forestEcoregion: '1',
      heightLevel: 'SA',
      forestType: '60*',
      slope: '<70',
    }).target,
  ).toBe('50*');
});

test('invalid location values', () => {
  expect(() =>
    project({ forestType: '60*', forestEcoregion: 'fooBar' }),
  ).toThrowError('fooBar for forestEcoregion is not valid.');

  expect(() =>
    project({ forestType: '60*', forestEcoregion: '1', heightLevel: 'fooBar' }),
  ).toThrowError('fooBar for heightLevel is not valid.');

  expect(() =>
    project({
      forestEcoregion: '5',
      heightLevel: 'SA',
      forestType: 'fooBar',
    }),
  ).toThrowError('fooBar for forestType is not valid.');
});
