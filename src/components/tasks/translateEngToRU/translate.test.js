/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './dictionary.json';
import getDictionary from './translate';

let taskName;
let taskNote;
let dictionary;
describe('Translate', () => {
  beforeAll(() => {
    [taskNote, taskName, dictionary] = getDictionary();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: несколько вариантов перевода');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Translate: ');
  });
  it('Dictionary', () => {
    const word = data.dictionary.words[0];
    expect(word.english).toBe('cat');
  });
});
