const { project } = require('../');

describe('invalid function parameters', () => {
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
          forestType: 'fooBar',
        },
        '20',
      ),
    ).toThrowError('fooBar for forestType is not valid.');
  });

  test('invalid target altitudinalZone', () => {
    expect(() => project({}, 'fooBar')).toThrowError(
      'fooBar for targetAltitudinalZone is not valid.',
    );
  });
});

describe('valid options', () => {
  test('valid length of forestType list for empty input', () => {
    expect(project().options.forestType.length).toBe(202);
  });

  test('valid list for forestEcoregion with input not found', () => {
    expect(
      project({
        forestType: '33V',
        forestEcoregion: 'M',
        altitudinalZone: '40',
        silverFirArea: '1',
      }).options.forestEcoregion,
    ).toMatchObject(['3', '4', '2b']);
  });

  test('valid list for altitudinalZone', () => {
    expect(
      project({
        forestEcoregion: '1',
        forestType: '59V',
      }).options.altitudinalZone,
    ).toMatchObject(['100']);
  });

  test('valid list for targetAltitudinalZone', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '60',
        forestType: '47H',
      }).options.targetAltitudinalZone,
    ).toMatchObject(['50', '40', '30', '20', '10', '0']);
  });

  test('check for unknown as only available option', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '60',
        forestType: '1h',
      }).options.additional,
    ).toMatchObject(['unknown']);
  });

  test('option field with values for incomplete location values', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '90',
        forestType: '60*',
      }).options.slope,
    ).toMatchObject(['<70', '>70']);
  });

  test('empty option field for incomplete location values', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '90',
        forestType: '60*',
      }).options.relief,
    ).toBe(undefined);
  });
});

describe('valid projections', () => {
  test('simple projection', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '60',
          forestType: '1h',
        },
        '50',
      ).projections[0].forestType,
    ).toBe('1');
  });

  test('valid projection with same altitudinalZone and targetAltitudinalZone', () => {
    expect(
      project(
        {
          forestEcoregion: 'M',
          altitudinalZone: '50',
          forestType: '8*',
        },
        '50',
      ).projections,
    ).toMatchObject([]);
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
      ).projections.slice(-1)[0].forestType,
    ).toBe('55');
  });

  test('empty projections if targetAltitudinalZone is not found', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '100',
          forestType: '59V',
        },
        '81',
      ).projections,
    ).toMatchObject([]);
  });
});
