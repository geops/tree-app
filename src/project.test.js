const { project } = require('../');

describe('Test for input values', () => {
  test('valid projection', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '60',
          forestType: '1h',
        },
        '50',
      ).forestType,
    ).toBe('1');
  });

  test('invalid location values', () => {
    expect(() =>
      project({ forestType: '60*', forestEcoregion: 'fooBar' }, '50'),
    ).toThrowError('fooBar for forestEcoregion is not valid.');

    expect(() =>
      project(
        { forestType: '60*', forestEcoregion: '1', altitudinalZone: 'fooBar' },
        '60',
      ),
    ).toThrowError('fooBar for altitudinalZone is not valid.');

    expect(() =>
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '81',
          forestType: '55 collin',
        },
        '20',
      ),
    ).toThrowError('55 collin for forestType is not valid.');
  });

  test('invalid target altitudinalZone', () => {
    expect(() => project({}, 'fooBar')).toThrowError(
      'fooBar for target altitudinal zone is not valid.',
    );
  });

  test('valid projection with same altitudinalZone and targetAltitudinalZone', () => {
    expect(
      project(
        {
          forestEcoregion: 'M',
          altitudinalZone: '40',
          forestType: '8*',
        },
        '40',
      ).forestType,
    ).toBe('8*');
  });
});

describe('Test for output values', () => {
  test('check for unknown as only available option', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '60',
          forestType: '1h',
        },
        '50',
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
        '81',
      ).target,
    ).toBe(undefined);
  });

  test('option field with values for incomplete location values', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '90',
          forestType: '60*',
        },
        '81',
      ).options.slope,
    ).toMatchObject(['<70', '>70']);
  });

  test('empty option field for incomplete location values', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '90',
          forestType: '60*',
        },
        '81',
      ).options.relief,
    ).toBe(undefined);
  });

  test('valid multi altitudinal zone projection', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '100',
          forestType: '59V',
        },
        '83',
      ).forestType,
    ).toBe('55');
  });

  test('valid list of target altitudinal zone', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '60',
          forestType: '47H',
        },
        '40',
      ).options.targetAltitudinalZone,
    ).toMatchObject(['50', '40', '20']);
  });

  test('empty location value and target altitudinal Zone ', () => {
    expect(project().options.forestType.length).toBe(199);
  });

  test('valid list of preceding keys for multi-step options', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '100',
          forestType: '59V',
        },
        '81',
      ).options.altitudinalZone,
    ).toMatchObject(['81', '90', '100']);
  });

  test('valid list of preceding keys for multi-step options if prior field is undefined', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: undefined,
          forestType: '59V',
        },
        '81',
      ).options.altitudinalZone,
    ).toMatchObject(['100']);
  });
});
