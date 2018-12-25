/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './createWords.json';
import createWords from './createWords';

let taskName;
let taskNote;
let words;
describe('Create Words', () => {
  beforeAll(() => {
    [taskNote, taskName, words] = createWords();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: образовать подходящее слово');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Create appropriate word from ');
  });
  it('Words', () => {
    const word = data[0];
    expect(word.answer).toBe('unemployed');
  });
});
