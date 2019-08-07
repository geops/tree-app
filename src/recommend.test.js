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
    expect(recommend('18M')).toStrictEqual({
      positive: [100, 165000],
      neutral: [800, 174200, 302800, 432800],
      negative: [
        25300,
        60400,
        227200,
        317500,
        328400,
        363700,
        402200,
        402300,
        421400,
        421500,
      ],
      attention: [],
    });
  });

  test('valid multiple forest type recommendations', () => {
    expect(recommend('18M', '9a', true)).toStrictEqual({
      positive: [700, 335900],
      neutral: [
        300,
        600,
        96900,
        213300,
        217500,
        305900,
        306100,
        336100,
        346500,
        402500,
        402700,
        413600,
      ],
      negative: [],
      attention: [9500],
    });
  });

  test('valid multiple forest type recommendations', () => {
    expect(recommend('60', '50')).toStrictEqual({
      positive: [302800, 402300, 800],
      neutral: [60400, 227200, 363700],
      negative: [25400, 60500],
      attention: [],
    });
  });

  test('valid multiple forest type recommendations with future flag', () => {
    expect(recommend('60', '50', true)).toStrictEqual({
      positive: [100],
      neutral: [25300, 174200, 317500, 402200],
      negative: [],
      attention: [],
    });
  });

  test('result does not include null values', () => {
    expect(recommend('71', '45', false)).toStrictEqual({
      positive: [60500, 302800],
      neutral: [402300],
      negative: [305500],
      attention: [],
    });
  });

  test('forest type with no recommendation currently', () => {
    expect(recommend('AV', '7S collin')).toStrictEqual({
      positive: [],
      neutral: [],
      negative: [],
      attention: [],
    });
  });
});
