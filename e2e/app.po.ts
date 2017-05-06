import { browser, element, by } from 'protractor';

export class DrawpyPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('draw-root h1')).getText();
  }
}
