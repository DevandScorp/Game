/* eslint-disable no-undef */
import template from './footer.template';

class Footer {
  static draw() {
    $('body').append(template);
  }
}

export default Footer;
