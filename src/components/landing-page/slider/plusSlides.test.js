import plusSlides from './plusSlides';
import Main from '../main/main';

describe('Slider', () => {
  beforeAll(() => {
    Main.draw();
  });
  it('test plus slides', () => {
    plusSlides(1);
    expect(document.querySelector('.slideshow-container').children[1].style.display).toBe('block');
  });
});
