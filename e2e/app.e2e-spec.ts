import { Drawpyv2Page } from './app.po';

describe('drawpyv2 App', () => {
  let page: Drawpyv2Page;

  beforeEach(() => {
    page = new Drawpyv2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to draw!');
  });
});
