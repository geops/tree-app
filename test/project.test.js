const { project } = require('../src');
const fixtures = require('./project.fixtures.json');

describe('invalid function parameters', () => {
  const validLocation = { forestEcoregion: '1', altitudinalZone: '81' };
  test('invalid location values', () => {
    expect(() =>
      project({ ...validLocation, forestEcoregion: 'fooBar' }),
    ).toThrowError('fooBar for forestEcoregion is not valid.');

    expect(() =>
      project({ ...validLocation, altitudinalZone: 'fooBar' }),
    ).toThrowError('fooBar for altitudinalZone is not valid.');

    expect(() =>
      project({ ...validLocation, forestType: 'fooBar' }),
    ).toThrowError('fooBar for forestType is not valid.');
  });

  test('invalid target altitudinalZone', () => {
    expect(() => project(validLocation, 'fooBar')).toThrowError(
      'fooBar for targetAltitudinalZone is not valid.',
    );
  });
});

describe('valid options', () => {
  test('valid length of forestEcoregion list for empty input', () => {
    expect(project().options.forestEcoregion.length).toBe(9);
  });

  test('location forestType is included in options for multi-step projection', () => {
    expect(
      project(
        {
          forestEcoregion: 'M',
          altitudinalZone: '60',
          forestType: '18',
        },
        '40',
      ).options.forestType,
    ).toContain('18');
  });

  test('valid list for forestEcoregion with input not found', () => {
    expect(
      project({
        forestType: '33V',
        forestEcoregion: 'M',
        altitudinalZone: '40',
        silverFirArea: '1',
      }).options.forestEcoregion,
    ).toStrictEqual(['1', '3', '4', 'J', 'M', '2a', '2b', '5a', '5b']);
  });

  test('valid list for altitudinalZone', () => {
    expect(
      project({
        forestEcoregion: '1',
        forestType: '59V',
      }).options.altitudinalZone,
    ).toStrictEqual(['20', '40', '50', '60', '81', '90', '100']);
  });

  test('valid list for targetAltitudinalZone', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '60',
        forestType: '47H',
      }).options.targetAltitudinalZone,
    ).toStrictEqual(['50', '40', '30', '20', '10', '0']);
  });

  test('check for unknown as only available option', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '60',
        forestType: '1h',
      }).options.additional,
    ).toStrictEqual(['unknown']);
  });

  test('option field with values for incomplete location values', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '90',
        forestType: '60*',
      }).options.slope,
    ).toStrictEqual(['<70', '>70']);
  });

  test('option includes options from transition', () => {
    expect(
      project({
        forestEcoregion: '1',
        forestType: '19f',
        transitionForestType: '46',
        altitudinalZone: '60',
        transitionAltitudinalZone: '81',
      }).options.slope,
    ).toStrictEqual(['unknown', '<20', '>20']);
  });

  test('empty option field for incomplete location values', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '90',
        forestType: '60*',
      }).options.relief,
    ).toBe(undefined);
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '90',
      }).options.targetAltitudinalZone,
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
      ).projections,
    ).toStrictEqual([{ altitudinalZone: '50', forestType: '1' }]);
  });

  test('projection with valid transitionForestType', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          forestType: '19f',
          transitionForestType: '46',
          altitudinalZone: '60',
          transitionAltitudinalZone: '81',
          slope: '<20',
        },
        '50',
      ).projections[0],
    ).toStrictEqual({
      altitudinalZone: '50',
      forestType: '8b',
      transitionForestType: '8*',
    });
  });

  test('projection with transitionForestType not found', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          forestType: '19f',
          transitionForestType: '46',
          altitudinalZone: '60',
          transitionAltitudinalZone: '81',
        },
        '50',
      ).projections[0],
    ).toStrictEqual({
      altitudinalZone: '50',
      forestType: '8b',
      transitionForestType: undefined,
    });
  });

  test('projection with transitionForestType and multi altitudinal zones', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          forestType: '19f',
          transitionForestType: '46',
          altitudinalZone: '60',
          transitionAltitudinalZone: '81',
          slope: '<20',
        },
        '40',
      ).projections.slice(-1)[0],
    ).toStrictEqual({
      altitudinalZone: '40',
      forestType: '7b',
      transitionForestType: '7*',
    });
  });

  test('projection with same altitudinalZone and targetAltitudinalZone', () => {
    expect(
      project(
        {
          forestEcoregion: 'M',
          altitudinalZone: '50',
          forestType: '8*',
        },
        '50',
      ).projections,
    ).toStrictEqual([]);
  });

  test('multi altitudinal zone projection', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '100',
          forestType: '59V',
        },
        '81',
      ).projections.slice(-1)[0],
    ).toStrictEqual({ altitudinalZone: '81', forestType: '46MRe' });
  });

  test('projection skipping altitudinalZone 30 which is not available in forestEcoregion M', () => {
    expect(
      project(
        {
          forestEcoregion: 'M',
          altitudinalZone: '40',
          forestType: '7S',
        },
        '20',
      ).projections,
    ).toStrictEqual([{ altitudinalZone: '20', forestType: '7S collin' }]);
  });

  // Disabled for now until target altitudinalZone "hochmontan Tannenareale" has been fixed in source data.
  // test('projection skipping altitudinalZones which are not available in forestEcoregion 2b', () => {
  //   expect(
  //     project(
  //       {
  //         forestEcoregion: '2b',
  //         altitudinalZone: '83',
  //         forestType: '55*',
  //       },
  //       '20',
  //     ).projections.slice(-1)[0],
  //   ).toStrictEqual({ altitudinalZone: '20', forestType: '55* collin' });
  // });

  test('empty projections if targetAltitudinalZone is not found', () => {
    expect(
      project(
        {
          forestEcoregion: 'M',
          altitudinalZone: '40',
          forestType: '7S',
        },
        '30',
      ).projections,
    ).toStrictEqual([]);
  });

  test('projections based on fixtures', () => {
    fixtures.forEach(({ location, projections }) => {
      const target = projections.slice(-1)[0].altitudinalZone;
      expect(project(location, target).projections).toStrictEqual(projections);
    });
  });
});
