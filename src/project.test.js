const { project } = require('../');

test('valid projection', () => {
  expect(
    project({
      forestEcoregion: '1',
      heightLevel: 'SA',
      forestType: '60*',
      slope: 68,
    }),
  ).toBe('50*');
});

test('missing projection', () => {
  expect(() =>
    project({
      forestEcoregion: 'J',
      heightLevel: 'OSA',
      forestType: '24',
    }),
  ).toThrowError('Found no matching projection.');
});

test('missing location fields', () => {
  expect(() => project({})).toThrowError(
    'Location is missing required forestEcoregion.',
  );

  expect(() => project({ forestEcoregion: '5' })).toThrowError(
    'Location is missing required heightLevel.',
  );

  expect(() =>
    project({ forestEcoregion: '5', heightLevel: 'OSA' }),
  ).toThrowError('Location is missing required forestType.');
});

test('invalid location values', () => {
  expect(() => project({ forestEcoregion: 'fooBar' })).toThrowError(
    'fooBar for forestEcoregion is not valid.',
  );

  expect(() =>
    project({ forestEcoregion: '5', heightLevel: 'fooBar' }),
  ).toThrowError('fooBar for heightLevel is not valid.');

  expect(() =>
    project({
      forestEcoregion: '5',
      heightLevel: 'SA',
      forestType: 'fooBar',
    }),
  ).toThrowError('fooBar for forestType is not valid.');
});
