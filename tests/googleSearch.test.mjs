import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('DuckDuckGo Search BDD Test', function () {
  this.timeout(2000000); // adjust as needed

  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should search for "Selenium" on DuckDuckGo and verify results', async () => {
    await driver.get('https://duckduckgo.com');
    const searchBoxLocator = By.xpath(`//input[@name="q"]`);
  
    await driver.wait(until.elementLocated(searchBoxLocator), 10000);
  
    const searchInput = await driver.findElement(searchBoxLocator);
    await searchInput.sendKeys('Selenium WebDriver');
    await searchInput.submit();
  
    await driver.wait(until.titleContains('Selenium'), 10000);
  
    const title = await driver.getTitle();
    expect(title).to.include('Selenium');
  });
  
});

pm.test("Response has expected fields", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("userId");
    pm.expect(jsonData.userId).to.be.a('number');
});
