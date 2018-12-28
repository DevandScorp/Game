/* eslint-disable func-names */
/* eslint-disable no-undef */
import Header from '../../../components/landing-page/header/header';
import Main from '../../../components/landing-page/main/main';
import Footer from '../../../components/landing-page/footer/footer';
import plusSlides from '../../../components/landing-page/slider/plusSlides';
import makeASound from '../../game/js/musicHandler';

Header.draw();
Main.draw();
Footer.draw();
$('document').ready(() => {
  makeASound('../landing-page/sounds/Audiomachine - Wars of Faith(playvk.com).mp3');
});
$('a').click(() => {
  makeASound('../landing-page/sounds/click.wav');
});
$('.prev').click(() => {
  plusSlides(-1);
});
$('.next').click(() => {
  plusSlides(1);
});
$('a.navigation-link').click(function () {
  $('html, body').animate({
    scrollTop: `${$($(this).attr('href')).offset().top}px`,
  }, {
    duration: 500,
    easing: 'swing',
  });
  return false;
});
