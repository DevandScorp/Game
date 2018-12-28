/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
export default function plusSlides(n) {
  const slides = jQuery('.slideshow-container').find('.slides');
  let slideIndex = 1;
  for (let i = 0; i < slides.length; i += 1) {
    if (slides[i].style.display === 'block') {
      slideIndex = i + 1;
    }
  }
  n += slideIndex;
  if (n > slides.length) { n = 1; }
  if (n < 1) { n = slides.length; }
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].style.display = 'none';
  }
  slides[n - 1].style.display = 'block';
}
