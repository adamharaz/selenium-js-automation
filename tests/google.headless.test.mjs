import { expect } from 'chai';
import { getDriver } from '../utils/driver.js';

describe('Example.com Home Page', function () {
  this.timeout(10000); // increases timeout to 10 seconds
  let driver;

  before(async () => {
    driver = await getDriver();
  });

  after(async () => {
    await driver.quit();
  });

  it('should load and have correct title', async () => {
    await driver.get('https://example.com');
    const title = await driver.getTitle();
    expect(title).to.equal('Example Domain');
  });
});
