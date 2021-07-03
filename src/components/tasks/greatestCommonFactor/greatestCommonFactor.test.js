/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import getGreatestCommonFactor from './greatestCommonFactor';
import { getNOD } from './greatestCommonFactor';

let taskNote;
let taskName;
let result;
let a;
let b;
describe('Greatest common factor', () => {
  beforeAll(() => {
    [taskNote, taskName, result, a, b] = getGreatestCommonFactor();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: найти НОД двух чисел');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Count the greatest common factor: ');
  });
  it('Result', () => {
    expect(result).toBe(getNOD(a, b));
  });
});
