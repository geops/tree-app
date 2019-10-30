const { list } = require('../');

describe('invalid function parameters', () => {
  test('missing forestType', () =>
    expect(() => list()).toThrowError(`forestType is missing`));

  test('invalid forestType', () =>
    expect(() => list('fooBar')).toThrowError(`fooBar is not valid`));
});

describe('valid results', () => {
  test('valid forestType', () =>
    expect(list('60')).toStrictEqual([
      [302800],
      [402300],
      [800, 25400, 60400, 60500, 227200, 363700],
      [],
    ]));
});
