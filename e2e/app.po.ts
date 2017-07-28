import { browser, by, element } from 'protractor';

export class Drawpyv2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('draw-root h1')).getText();
  }
}
