/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import getLeastCommonMultiple from './leastCommonMultiple';
import { getNOD } from '../greatestCommonFactor/greatestCommonFactor';

let taskNote;
let taskName;
let result;
let a;
let b;
describe('Least Common Multiple', () => {
  beforeAll(() => {
    [taskNote, taskName, result, a, b] = getLeastCommonMultiple();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: найти НОК двух чисел');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Count the least common multiple: ');
  });
  it('Result', () => {
    expect(result).toBe(Math.abs(a * b) / getNOD(a, b));
  });
});
