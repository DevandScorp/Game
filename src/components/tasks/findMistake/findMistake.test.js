/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './sentences.json';
import findMistake from './findMistake';

let taskName;
let taskNote;
let sentences;
let template;
describe('Find Mistake', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <div class="container" id="content"></div>
        `;
    [taskNote, taskName, sentences, template] = findMistake();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: кликнуть на часть предложения,где была допущена ошибка');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Find mistake');
  });
  it('Sentences', () => {
    const word = data[0];
    document.querySelector('.container').innerHTML = `${template({ sentence: word })}`;
    expect(document.getElementById('content').children.length).toBeLessThanOrEqual(3);
  });
});
