/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import getTask from './createTask';

let taskNote;
let taskName;
let result;
let a;
let b;
let sign;
describe('Simple Math', () => {
  beforeAll(() => {
    [taskName, a, b, sign, result, taskNote] = getTask();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: for division you have to write first number after comma');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Solve task: ');
  });
  it('Sign', () => {
    expect(sign).toHaveLength(1);
  });
  it('Result', () => {
    expect(result).not.toBeNull();
  });
});
