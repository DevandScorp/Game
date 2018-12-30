/* eslint-disable no-undef */
import setInfo from './setInfo';

describe('Set Info', () => {
  beforeAll(() => {
    document.body.innerHTML = `
            <div id="#taskModelLabel"></div>
            <div id="#note"></div>
            <input type="hidden" id = "hidden-result">
            `;
    setInfo('1', '2', '3');
  });
  it('Hidden', () => {
    console.log(document.body.innerHTML);
    expect($('#hidden-result').val()).toBe('2');
  });
});
