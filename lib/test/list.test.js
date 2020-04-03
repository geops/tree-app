const { list } = require('../src');

describe('invalid function parameters', () => {
  test('missing forestType', () =>
    expect(() => list()).toThrowError(`forestType is missing`));

  test('invalid forestType', () =>
    expect(() => list({ forestType: 'fooBar' })).toThrowError(
      `fooBar is not valid`,
    ));

  test('invalid transitionForestType', () =>
    expect(() =>
      list({ forestType: '60', transitionForestType: 'fooBar' }),
    ).toThrowError(`fooBar is not valid`));
});

describe('valid results', () => {
  test('valid forestType', () =>
    expect(list({ forestType: '60' })).toStrictEqual([
      [302800],
      [402300],
      [800, 25400, 60400, 60500, 227200, 363700],
      [],
    ]));

  test('nonresident tree types (330600, 346500) at the end of list and 9500 only in attention', () =>
    expect(list({ forestType: '55 collin' })).toStrictEqual([
      [335900],
      [],
      [60400, 97200, 306100, 317500, 328400, 363700, 402200, 402300, 421400, 330600, 346500], // prettier-ignore
      [9500],
    ]));

  test('valid forestType and transitionForestType', () =>
    expect(
      list({ forestType: '60', transitionForestType: '55 collin' }),
    ).toStrictEqual([[], [402300], [60400, 363700], [9500]]));
});
