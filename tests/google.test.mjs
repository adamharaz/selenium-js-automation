import { expect } from 'chai';
import { getDriver } from '../utils/driver.js';


xdescribe('Google Search Test', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await getDriver();
  });

  after(async () => {
    await driver.quit();
  });

  it('1 - should load Google and check title', async () => {
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    expect(title).to.include('Google');
  });
});
