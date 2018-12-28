import Header from './header';

describe('Header', () => {
  beforeAll(() => {
    document.body.innerHTML = '';
  });
  it('test header', () => {
    Header.draw();
    expect(document.querySelector('header').children).not.toBeNull();
  });
});
