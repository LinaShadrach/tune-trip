import { TuneTripPage } from './app.po';

describe('tune-trip App', function() {
  let page: TuneTripPage;

  beforeEach(() => {
    page = new TuneTripPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
