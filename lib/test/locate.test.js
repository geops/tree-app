const { locate } = require('../src');

describe('valid options', () => {
  test('indicator', () => {
    const location = { indicators: [1000446] };
    expect(locate(location).forestTypes.main).toStrictEqual([
      '45',
      '56',
      '57S',
      '57STa',
    ]);
  });

  test('carbonate yes/no', () => {
    const location = { carbonateFine: 'yes', carbonateRock: 'no' };
    expect(locate(location).forestTypes.main).toStrictEqual(['25a', '25au']);
  });

  test('carbonate unknown', () => {
    const location = { carbonateFine: 'unknown', carbonateRock: 'unknown' };
    expect(locate(location).forestTypes.pioneer).toStrictEqual(['32*', '92z']);
  });
});

test('valid profile-specific ecograms', () => {
  const location = { forestEcoregion: '1', altitudinalZone: '40' };
  expect(locate(location).ecogram.length).toBe(27);
  expect(locate(location, 'lu').ecogram.length).toBe(31);
});

test('invalid profile', () => {
  expect(() => locate({}, 'fooBar')).toThrowError(
    'fooBar is not a valid profile.',
  );
});
