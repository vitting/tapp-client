import { TolkeApp2Page } from './app.po';

describe('tolke-app2 App', () => {
  let page: TolkeApp2Page;

  beforeEach(() => {
    page = new TolkeApp2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
