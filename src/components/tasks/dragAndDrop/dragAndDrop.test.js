/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './colors.json';
import dragAndDrop from './dragAndDrop';

let taskName;
let taskNote;
let colors;
let template;
describe('Drag&Drop', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <div class="container" id="content"></div>
        `;
    [taskNote, taskName, colors, template] = dragAndDrop();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: собрать из букв слово');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Drag&Drop');
  });
  it('Colors', () => {
    const word = data.colors[0].split('');
    document.querySelector('.container').innerHTML = `${template({ letters: word })}`;
    expect(document.getElementById('sortable').children.length).toBeTruthy();
  });
});
