const { project } = require('../');

test('valid projection', () => {
  expect(
    project(
      {
        forestEcoregion: '1',
        additional: 'unknown',
        heightLevel: 'SA',
        forestType: '60*',
        slope: '<70',
        tannenareal: 'unknown',
        relief: 'unknown',
      },
      'de',
    ).target,
  ).toBe('Karbonat-Ta-Fi-Wald mit kahlem Alpendost');
});

test('invalid location values', () => {
  expect(() =>
    project({ forestType: '60*', forestEcoregion: 'fooBar' }, 'de'),
  ).toThrowError('fooBar for forestEcoregion is not valid.');

  expect(() =>
    project(
      { forestType: '60*', forestEcoregion: '1', heightLevel: 'fooBar' },
      'de',
    ),
  ).toThrowError('fooBar for heightLevel is not valid.');

  expect(() =>
    project(
      {
        forestEcoregion: '5',
        heightLevel: 'SA',
        forestType: 'fooBar',
      },
      'de',
    ),
  ).toThrowError('fooBar for forestType is not valid.');
});

test('unsupported language', () => {
  expect(() => project({}, 'fooBar')).toThrowError('fooBar is not supported.');
});
