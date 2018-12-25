/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './tenseTests.json';
import getTenses from './getTenses';

let taskName;
let taskNote;
let tenses;
let template;
describe('Tenses', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <div class="container" id="content"></div>
        `;
    [taskNote, taskName, tenses, template] = getTenses();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: выбрать нужную форму глагола');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Put the correct preposition: ');
  });
  it('Tenses', () => {
    const word = data[0];
    document.querySelector('.container').innerHTML = `${template({ words: word })}`;
    expect(document.getElementById('getTenses').children.length).toBeLessThanOrEqual(2);
  });
});
