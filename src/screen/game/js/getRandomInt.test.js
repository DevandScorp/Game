import getRandomInt from './getRandomInt';

describe('Get Random Int', () => {
  it('check', () => {
    expect(getRandomInt(0, 10)).toBeLessThan(10);
  });
});
