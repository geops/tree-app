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
  test('nonresident tree types (330600, 346500) at the end of list and 9500 only in attention', () =>
    expect(list('55 collin')).toStrictEqual([
      [335900],
      [],
      [
        60400,
        97200,
        306100,
        317500,
        328400,
        363700,
        402200,
        402300,
        421400,
        330600,
        346500,
      ],
      [9500],
    ]));
});
