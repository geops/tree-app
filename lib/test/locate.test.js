const { locate } = require('../src');

test('indicator', () => {
  expect(locate({ indicators: [1000446] }).forestTypes.main).toStrictEqual([
    '45',
    '56',
    '57S',
    '57STa',
  ]);
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
