/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './prepositions.json';
import getPrepositions from './getPrepositions';

let taskName;
let taskNote;
let prepositions;
let template;
describe('Prepositions', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <div class="container" id="content"></div>
        `;
    [taskNote, taskName, prepositions, template] = getPrepositions();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: выбрать нужный предлог/слово');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Put the correct preposition: ');
  });
  it('Prepositions', () => {
    const word = data[0];
    document.querySelector('.container').innerHTML = `${template({ words: word })}`;
    expect(document.getElementById('getPrepositions').children.length).toBeLessThanOrEqual(3);
  });
});
