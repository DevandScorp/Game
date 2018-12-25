/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './names.json';
import generateName from './generateName';

let first;
let third;
let second;
let names;
describe('Generate Names', () => {
  beforeAll(() => {
    [first, second, third, names] = generateName();
  });
  it('First name ', () => {
    expect(first).toBeLessThan(10);
  });
  it('Third name ', () => {
    expect(second).toBeLessThan(6);
  });
  it('Names', () => {
    expect(data.second[second]).toBe('Орк');
  });
});
