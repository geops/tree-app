const { project } = require('../');

describe('Test for input values', () => {
  test('valid projection', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '6',
          forestType: '1h',
        },
        '5',
      ).forestType,
    ).toBe('1');
  });

  test('invalid location values', () => {
    expect(() =>
      project({ forestType: '60*', forestEcoregion: 'fooBar' }, '5'),
    ).toThrowError('fooBar for forestEcoregion is not valid.');

    expect(() =>
      project(
        { forestType: '60*', forestEcoregion: '1', altitudinalZone: 'fooBar' },
        '6',
      ),
    ).toThrowError('fooBar for altitudinalZone is not valid.');

    expect(() =>
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '8',
          forestType: '55 collin',
        },
        '2',
      ),
    ).toThrowError('55 collin for forestType is not valid.');
  });

  test('invalid target altitudinalZone', () => {
    expect(() => project({}, 'fooBar')).toThrowError(
      'fooBar for target altitudinal zone is not valid.',
    );
  });
});

describe('Test for output values', () => {
  test('check for unknown as only available option', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '6',
          forestType: '1h',
        },
        '5',
      ).additional,
    ).toBe('unknown');
  });

  test('empty target for incomplete location values', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          forestType: '60*',
        },
        '8',
      ).target,
    ).toBe(undefined);
  });

  test('option field with values for incomplete location values', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '9',
          forestType: '60*',
        },
        '8',
      ).options.slope,
    ).toMatchObject(['<70', '>70']);
  });

  test('empty option field for incomplete location values', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '9',
          forestType: '60*',
        },
        '8',
      ).options.relief,
    ).toBe(undefined);
  });

  test('valid multi altitudinal zone projection', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '10',
          forestType: '59V',
        },
        '8',
      ).forestType,
    ).toBe('55');
  });

  test('valid list of target altitudinal zone', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '6',
          forestType: '47H',
        },
        '4',
      ).options.targetAltitudinalZone,
    ).toMatchObject(['5', '4', '2']);
  });
});

test('empty location value and target altitudinal Zone ', () => {
  expect(project().options.forestType.length).toBe(199);
});
