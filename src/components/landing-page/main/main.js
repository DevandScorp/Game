/* eslint-disable no-undef */
import template from './main.template';

class Main {
  static draw() {
    $('body').append(template);
  }
}

export default Main;
