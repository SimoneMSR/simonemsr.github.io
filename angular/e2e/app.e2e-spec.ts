import { ComelitVistoPreorderPage } from './app.po';

describe('comelit-visto-preorder App', () => {
  let page: ComelitVistoPreorderPage;

  beforeEach(() => {
    page = new ComelitVistoPreorderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
