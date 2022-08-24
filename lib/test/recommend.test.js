import recommend from '../src/recommend.mjs';

describe('Test for input values', () => {
  test('location forestType is required', () => {
    expect(() => recommend()).toThrowError('location.forestType is required');
  });

  test('at least 1 projected forestType is required', () => {
    expect(() => recommend({ forestType: '60' })).toThrowError(
      `at least 1 projected forestType is required`,
    );
  });

  test('invalid forestType', () => {
    expect(() =>
      recommend({ forestType: 'fooBar' }, [{ forestType: '8b' }]),
    ).toThrowError('fooBar is not valid');
  });

  test('invalid forestType in projections', () => {
    expect(() =>
      recommend({ forestType: '60' }, [{ forestType: 'fooBar' }]),
    ).toThrowError('fooBar is not valid');
  });

  test('invalid type for future flag', () => {
    expect(() =>
      recommend({ forestType: '60' }, [{ forestType: '8b' }], 'fooBar'),
    ).toThrowError(`expected boolean type for future flag`);
  });
});

describe('Test for output values', () => {
  test('valid recommendations for single projection', () => {
    expect(
      recommend({ forestType: '19f' }, [{ forestType: '8b' }], true),
    ).toStrictEqual([
      [100, 165000, 302800],
      [],
      [],
      [],
      [800, 25300, 60400, 317500, 363700, 402300, 330600],
      [],
      [
        700, 97200, 174200, 213300, 227200, 306100, 328400, 335900, 336100,
        413600, 421400, 432800, 336200,
      ],
      [],
      [],
      [],
      [],
    ]);
  });

  test('valid recommendations for multiple projection', () => {
    expect(
      recommend(
        { forestType: '19f' },
        [{ forestType: '8b' }, { forestType: '7b' }],
        true,
      ),
    ).toStrictEqual([
      [100, 165000],
      [302800],
      [],
      [336100],
      [800, 25300, 60400, 317500, 363700, 402300, 330600],
      [],
      [
        700, 97200, 174200, 213300, 227200, 306100, 328400, 335900, 413600,
        421400, 432800, 336200,
      ],
      [25200, 96900, 329700, 346500],
      [],
      [],
      [],
    ]);
  });

  test('valid sorted lists', () => {
    expect(
      recommend({ forestType: '93' }, [{ forestType: '93 hyp' }], true),
    ).toStrictEqual([
      [
        100, 300, 97200, 174200, 213300, 217500, 287100, 328400, 336000, 413600,
        421400, 421500, 433000, 137700, 231500, 422450,
      ],
      [],
      [238050],
      [],
      [
        700, 800, 96900, 172200, 174300, 335600, 335900, 336100, 363700, 432800,
        6900, 97800, 308600, 330200, 336200, 346500,
      ],
      [],
      [402200, 335800, 345600],
      [],
      [25200, 60400, 165000, 302800, 306100, 317500, 113350, 330600],
      [9500],
      [],
    ]);
  });
});
