const { recommend } = require('../');

describe('Test for input values', () => {
  test('at least one forest type required', () => {
    expect(() => recommend()).toThrowError(
      `at least one forest type is required to get the recommendation of tree species`,
    );
  });

  test('invalid forestType1', () => {
    expect(() => recommend('963D')).toThrowError(
      `963D is not a valid forest type`,
    );
  });

  test('invalid forestType2', () => {
    expect(() => recommend('60', '963D')).toThrowError(
      `963D is not a valid forest type`,
    );
  });

  test('invalid data type for future flag', () => {
    expect(() => recommend('60', '50', 56)).toThrowError(
      `expected boolean type for future flag`,
    );
  });
});

describe('Test for output values', () => {
  test('valid single forest type recommendations', () => {
    expect(recommend('60')).toStrictEqual({
      positive: [302800],
      neutral: [402300],
      negative: [800, 25400, 60400, 60500, 227200, 363700],
    });
  });

  test('valid multiple forest type recommendations', () => {
    expect(recommend('60', '50')).toStrictEqual({
      positive: [302800, 100, 402300, 800],
      neutral: [
        800,
        25400,
        60400,
        60500,
        227200,
        363700,
        25300,
        174200,
        317500,
        402200,
      ],
      negative: [25400, 60500],
    });
  });

  test('valid multiple forest type recommendations with future flag', () => {
    expect(recommend('60', '50', true)).toStrictEqual({
      positive: [],
      neutral: [],
      negative: [800, 25400, 60500],
    });
  });
});
