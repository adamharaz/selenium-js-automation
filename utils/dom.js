
import { By, until } from 'selenium-webdriver';
import { config } from '../config/test.config.js';

export async function waitForXpath(driver, xpath, timeout = config.timeout) {
  try {
    return await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  } catch (e) {
    const url = await driver.getCurrentUrl().catch(() => 'unknown-url');
    console.log(`[WAIT FAIL] xpath=${xpath}`);
    console.log(`[WAIT FAIL] url=${url}`);
    throw e;
  }
}

export async function clickXpath(driver, xpath) {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
  await driver.executeScript("arguments[0].scrollIntoView({block:'center'});", el);

  try {
    await driver.wait(until.elementIsVisible(el), 15000);
    await driver.wait(until.elementIsEnabled(el), 15000);
    await el.click();
  } catch (e) {
    // if intercepted, force click via JS
    await driver.executeScript("arguments[0].click();", el);
  }
}

export async function typeXpath(driver, xpath, value) {
  try {
    const el = await waitForXpath(driver, xpath);
    await driver.wait(until.elementIsVisible(el), config.timeout);
    await el.clear();
    await el.sendKeys(value);
  } catch (e) {
    const url = await driver.getCurrentUrl().catch(() => 'unknown-url');
    console.log(`[TYPE FAIL] xpath=${xpath} value=${value}`);
    console.log(`[TYPE FAIL] url=${url}`);
    throw e;
  }
}

export async function sendKeysXpath(driver, xpath, ...keys) {
  const el = await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    15000
  );
  await el.sendKeys(...keys);
}

