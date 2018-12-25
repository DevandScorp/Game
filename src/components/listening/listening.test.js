/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './dictionary.json';
import listen from './listening';

let taskNote;
let taskName;
let dictionary;
let synth;
describe('Listening', () => {
  beforeAll(() => {
    [taskNote, taskName, dictionary, synth] = listen();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: прослушать и записать слово');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Translate');
  });
  it('Dictionary', () => {
    expect(data.dictionary.words.length).toBeTruthy();
  });
});
