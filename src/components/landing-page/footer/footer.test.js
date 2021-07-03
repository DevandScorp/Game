import Footer from './footer';

describe('Footer', () => {
  beforeAll(() => {
    document.body.innerHTML = '';
  });
  it('test footer', () => {
    Footer.draw();
    expect(document.querySelector('footer').children).not.toBeNull();
  });
});
