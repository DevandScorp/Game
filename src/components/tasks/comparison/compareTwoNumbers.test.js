/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import compareTwoNumbers from './compareTwoNumbers';

let taskNote;
let taskName;
let a;
let b;
let sign;
describe('Compare two numbers', () => {
  beforeAll(() => {
    [taskNote, taskName, sign, a, b] = compareTwoNumbers();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: сравнить два числа');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Compare two numbers: ');
  });
  it('Sign', () => {
    expect(sign).toHaveLength(1);
  });
  it('Arguments', () => {
    expect(a).not.toBeNull();
  });
});
