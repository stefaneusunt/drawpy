import { DrawpyPage } from './app.po';

describe('drawpy App', () => {
  let page: DrawpyPage;

  beforeEach(() => {
    page = new DrawpyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('draw works!');
  });
});
