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
