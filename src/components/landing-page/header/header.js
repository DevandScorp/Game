/* eslint-disable no-undef */
import template from './header.template';

class Header {
  static draw() {
    $('body').append(template);
  }
}

export default Header;
