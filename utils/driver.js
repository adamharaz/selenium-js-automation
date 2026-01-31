// utils/driver.js
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { config } from '../config/test.config.js';

export const getDriver = async () => {
  const options = new chrome.Options();

  if (config.headless) {
    options.addArguments('--headless=new');
  }

  options.addArguments('--disable-gpu');
  options.addArguments('--no-sandbox');

  const driver = await new Builder()
    .forBrowser(config.browser || 'chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.sendDevToolsCommand(
      'Emulation.setAnimationPlaybackRate',
      { rate: 1 }
    );
  } catch (e) {
    console.log('[INFO] CDP animation slow-down not supported here, continuing...');
  }

  return driver;
};

// ✅ EXPORT DEFAULT MUST BE AFTER DEFINITION
export default getDriver;
