const { project } = require('../');

test('valid projection', () => {
  expect(
    project(
      {
        forestEcoregion: '1',
        additional: 'unknown',
        heightLevel: 'OM',
        forestType: '1h',
        slope: 'unknown',
        tannenareal: 'unknown',
        relief: 'unknown',
      },
      'UM',
    ).forestType,
  ).toBe('1');
});

test('valid multi heightLevel projection', () => {
  expect(
    project(
      {
        forestEcoregion: '3',
        additional: 'unknown',
        heightLevel: 'OSA',
        forestType: '59L',
        slope: 'unknown',
        tannenareal: 'unknown',
        relief: 'unknown',
      },
      'OM',
    ).forestType,
  ).toBe('1h');
});

test('invalid location values', () => {
  expect(() =>
    project({ forestType: '60*', forestEcoregion: 'fooBar' }, 'UM'),
  ).toThrowError('fooBar for forestEcoregion is not valid.');

  expect(() =>
    project(
      { forestType: '60*', forestEcoregion: '1', heightLevel: 'fooBar' },
      'OM',
    ),
  ).toThrowError('fooBar for heightLevel is not valid.');

  expect(() =>
    project(
      {
        forestEcoregion: '1',
        heightLevel: 'HM',
        forestType: '55 collin',
      },
      'C',
    ),
  ).toThrowError('55 collin for forestType is not valid.');
});

test('invalid target heightLevel', () => {
  expect(() => project({}, 'fooBar')).toThrowError(
    'fooBar for targetHeightLevel is not valid.',
  );
});

test('missing projection for valid location and targetHeight', () => {
  expect(() =>
    project(
      {
        forestEcoregion: '1',
        additional: 'unknown',
        heightLevel: 'OSA',
        forestType: '58L',
        slope: 'unknown',
        tannenareal: 'unknown',
        relief: 'unknown',
      },
      'HM',
    ),
  ).toThrowError('Found no projection for selected targetHeightLevel.');
});
