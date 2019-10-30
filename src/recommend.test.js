const { recommend } = require('../');

describe('Test for input values', () => {
  test('forest type today is required', () => {
    expect(() => recommend()).toThrowError('forestTypeToday is required');
  });

  test('at least 2 projected forestTypes are required', () => {
    expect(() => recommend('60', [{ forestType: '8b' }])).toThrowError(
      `at least 2 projected forestTypes are required`,
    );
  });

  test('invalid forestType', () => {
    expect(() =>
      recommend('fooBar', [{ forestType: '8b' }, { forestType: '7b' }]),
    ).toThrowError('fooBar is not valid');
  });

  test('invalid forestType in projections', () => {
    expect(() =>
      recommend('60', [{ forestType: 'fooBar1' }, { forestType: 'fooBar2' }]),
    ).toThrowError('fooBar1 is not valid');
  });

  test('invalid type for future flag', () => {
    expect(() =>
      recommend('60', [{ forestType: '8b' }, { forestType: '7b' }], 'fooBar'),
    ).toThrowError(`expected boolean type for future flag`);
  });
});

describe('Test for output values', () => {
  test('valid multiple forest type recommendations', () => {
    expect(
      recommend('19f', [{ forestType: '8b' }, { forestType: '7b' }], true),
    ).toStrictEqual([
      [100, 165000],
      [302800],
      [],
      [336100],
      [402300, 60400, 317500, 330600, 363700],
      [302800],
      [
        700,
        800,
        97200,
        174200,
        213300,
        227200,
        306100,
        328400,
        335900,
        336200,
        413600,
        421400,
        432800,
      ],
      [336100, 25200, 96900, 329700, 346500],
      [25300, 402200],
      [],
    ]);
  });
});
