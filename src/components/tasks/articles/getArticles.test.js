/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-const */
import data from './articles.json';
import getArticles from './getArticles';

let taskName;
let taskNote;
let articles;
let template;
describe('Articles', () => {
  beforeAll(() => {
    document.body.innerHTML = `
        <div class="container" id="content"></div>
        `;
    [taskNote, taskName, articles, template] = getArticles();
  });
  it('TaskNote', () => {
    expect(taskNote).toBe('Note: выбрать нужный предлог/слово');
  });
  it('TaskName', () => {
    expect(taskName).toBe('Put the correct article: ');
  });
  it('Articles', () => {
    const word = data[0];
    document.querySelector('.container').innerHTML = `${template({ words: word })}`;
    expect(document.getElementById('content').children.length).toBeLessThanOrEqual(2);
  });
});
