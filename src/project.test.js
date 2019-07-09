const { project } = require('../');

test('valid projection', () => {
  expect(
    project({
      forestEcoregion: '1',
      additional: 'unknown',
      heightLevel: 'SA',
      forestType: '60*',
      slope: '<70',
      tannenareal: 'unknown',
      relief: 'unknown',
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
      forestEcoregion: '1',
      heightLevel: 'HM',
      forestType: '55 collin',
    }),
  ).toThrowError('55 collin for forestType is not valid.');
});
