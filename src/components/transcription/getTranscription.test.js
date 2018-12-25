/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './transcription.json';
import getTranscription from './getTranscription';

let taskName;
let taskNote;
let transcriptions;
describe('Transcription', () => {
  beforeAll(() => {
    [taskNote, taskName, transcriptions] = getTranscription();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: записать слово по его транскрипции');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Transcription');
  });
  it('Transcriptions', () => {
    const word = data[0];
    expect(word.transcription).toBe('[ helˈəʊ ]');
  });
});
