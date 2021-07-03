import Main from './main';

describe('Main', () => {
  beforeAll(() => {
    document.body.innerHTML = '';
  });
  it('test main', () => {
    Main.draw();
    expect(document.querySelector('main').children).not.toBeNull();
  });
});
