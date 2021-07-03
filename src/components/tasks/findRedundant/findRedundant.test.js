/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './redundant.json';
import findRedundant from './findRedundant';

let taskName;
let taskNote;
let variants;
let template;
describe('Redundant', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <div class="container" id="content"></div>
        `;
    [taskNote, taskName, variants, template] = findRedundant();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Определите ряд,в котором не все слова относятся к тематике: ');
  });
  it('Variants', () => {
    const word = data[0];
    document.querySelector('.container').innerHTML = `${template({ words: word })}`;
    expect(document.getElementById('getRedundant').children.length).toBeLessThanOrEqual(3);
  });
});
