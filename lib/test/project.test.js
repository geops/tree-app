import project from '../src/project.mjs';
import fixtures from './project.fixtures.json';

describe('invalid function parameters', () => {
  const validLocation = { forestEcoregion: '1', altitudinalZone: '80' };
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
    expect(project().options.forestEcoregion.length).toBe(10);
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
    ).toStrictEqual(['1', '3', '4', 'J', 'M', '2a', '2b', '5a', '5b', 'Me']);
  });

  test('valid list for altitudinalZone', () => {
    expect(
      project({
        forestEcoregion: '1',
        forestType: '59V',
      }).options.altitudinalZone,
    ).toStrictEqual(['20', '40', '50', '60', '80', '90', '100']);
  });

  test('valid list for targetAltitudinalZone', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '60',
        forestType: '47H',
      }).options.targetAltitudinalZone,
    ).toStrictEqual(['60', '50', '40', '30', '20', '10', '0']);
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
        transitionAltitudinalZone: '80',
      }).options.slope,
    ).toStrictEqual(['unknown', '<20', '>20']);
  });

  test('option for secondary field', () => {
    expect(
      project({
        forestEcoregion: '1',
        altitudinalZone: '90',
        forestType: '60*',
      }).options.relief,
    ).toStrictEqual(['unknown']);
  });

  test('empty option field for incomplete location values', () => {
    expect(
      project({
        forestEcoregion: '1',
      }).options.forestType,
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

  test('projection with missing secondary fields', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '90',
          forestType: '60*',
        },
        '80',
      ).projections,
    ).toStrictEqual([{ altitudinalZone: '80', forestType: '50*' }]);
  });

  test('projection with fallback to unknown secondary field (silverFirArea)', () => {
    expect(
      project(
        {
          forestEcoregion: '2a',
          altitudinalZone: '80',
          forestType: '50*',
          silverFirArea: '2',
        },
        '50',
      ).projections.slice(-1)[0],
    ).toStrictEqual({ altitudinalZone: '50', forestType: '12a' });
  });

  test('projection with valid transitionForestType', () => {
    const projected = project(
      {
        forestEcoregion: '1',
        forestType: '19f',
        transitionForestType: '46',
        altitudinalZone: '60',
        transitionAltitudinalZone: '80',
        slope: '<20',
      },
      '50',
    );
    expect(projected.projections[0]).toStrictEqual({
      altitudinalZone: '50',
      forestType: '8b',
      transitionForestType: '8*',
    });
    expect(projected.options.transitionForestType).toStrictEqual([
      '21',
      '23',
      '23Fe',
      '23H',
      '24',
      '24*',
      '24*Fe',
      '26',
      '26h',
      '26w',
      '27*',
      '32C',
      '32V',
      '32*',
      '33V',
      '40P',
      '40PBl',
      '46',
      '46Re',
      '46M',
      '46MRe',
      '46*',
      '46*Re',
      '47',
      '47H',
      '47*Lä',
      '48',
      '49',
      '49*',
      '49*Ta',
      '50',
      '50Re',
      '50Fe',
      '50P',
      '50*',
      '50*Re',
      '51',
      '51Re',
      '51Fe',
      '51C',
      '52',
      '52Re',
      '52T',
      '53Lä',
      '53Ta',
      '53*',
      '53*Ta',
      '54',
      '54A',
      '55',
      '55Lä',
      '55*',
      '55*Lä',
      '55*Ta',
      '56',
      '57Bl',
      '57BlTa',
      '59R',
      '60',
      '60*',
      '60*Lä',
      '60*Ta',
      '65',
      '65*',
      '66',
      '67',
      '68',
      '68*',
      '69',
      '70',
      '71',
      '23G',
      '24G',
      '24*G',
      '26hG',
      '32VG',
      '47HG',
      '48G',
      '50G',
      '51G',
      '53*G',
      '55*G',
      '57BlG',
      '60*G',
      '60*TaG',
      '67G',
      '69G',
      '70G',
      '71G',
      'AV',
    ]);
  });

  test('projection with valid transitionForestType but missing transitionAltitudinalZone', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          forestType: '19f',
          transitionForestType: '46',
          altitudinalZone: '60',
          slope: '<20',
        },
        '50',
      ).projections[0].transitionForestType,
    ).toBe('8*');
  });

  test('projection with transitionForestType not found', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          forestType: '19f',
          transitionForestType: '46',
          altitudinalZone: '60',
          transitionAltitudinalZone: '80',
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
          transitionAltitudinalZone: '80',
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
    ).toStrictEqual(undefined);
  });

  test('multi altitudinal zone projection', () => {
    expect(
      project(
        {
          forestEcoregion: '1',
          altitudinalZone: '100',
          forestType: '59V',
        },
        '80',
      ).projections.slice(-1)[0],
    ).toStrictEqual({ altitudinalZone: '80', forestType: '46MRe' });
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

  test('projection skipping altitudinalZones which are not available in forestEcoregion 2b', () => {
    expect(
      project(
        {
          forestEcoregion: '2b',
          altitudinalZone: '80',
          forestType: '55*',
        },
        '20',
      ).projections.slice(-1)[0],
    ).toStrictEqual({ altitudinalZone: '20', forestType: '55* collin' });
  });

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
    ).toStrictEqual(undefined);
  });

  test('projections based on fixtures', () => {
    fixtures.forEach(({ location, projections }) => {
      const target = projections.slice(-1)[0].altitudinalZone;
      expect(project(location, target).projections).toStrictEqual(projections);
    });
  });
});
