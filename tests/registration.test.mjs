

import { expect } from 'chai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

import { config } from '../config/test.config.js';
import { removeDemoQaOverlays } from '../utils/cleanup.js';
import { waitForXpath } from '../utils/dom.js';
import testData from '../data/registration.data.js';
import { getDriver } from '../utils/driver.js';

import { RegistrationPage as P } from '../methods/pages/registration.page.js';
import {
  fillBasicInfo,
  addSubject,
  setHobbies,
  uploadPicture,
  setAddress,
  setStateAndCity,
  submit
} from '../methods/actions/registration.actions.js';

// import testData from '../data/registration.data' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('DemoQA Registration Form', function () {
  this.timeout(60000);

  let driver;

  before(async () => {
    driver = await getDriver();
  });

  after(async () => {
    if (driver) await driver.quit();
  });


  it('should submit registration form and validate confirmation modal', async () => {

    await driver.get(config.baseUrl);
    await removeDemoQaOverlays(driver);

    await fillBasicInfo(driver, {
      ...testData,
      genderXpath: P.genderMale
    });

    await addSubject(driver, testData.subject);


    await setHobbies(driver, [P.hobbySports]);

    // make sure this file exists
    const filePath = path.resolve(__dirname, '../data/sample.png');

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    await uploadPicture(driver, filePath);

    await setAddress(driver, testData.address);

    await setStateAndCity(driver, testData.state, testData.city);

    await submit(driver);

    const titleEl = await waitForXpath(driver, P.modalTitle, 15000);
    const title = await titleEl.getText();
    expect(title).to.equal('Thanks for submitting the form');

    const tableText = await (await waitForXpath(driver, P.modalTable, 15000)).getText();
    expect(tableText).to.include(`${testData.firstName} ${testData.lastName}`);
    expect(tableText).to.include(testData.email);
    expect(tableText).to.include('Male');
    expect(tableText).to.include(testData.mobile);
  });
});
