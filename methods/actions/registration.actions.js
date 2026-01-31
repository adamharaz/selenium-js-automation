import { Key, By, until } from 'selenium-webdriver';
import { clickXpath, typeXpath } from '../../utils/dom.js';
import { RegistrationPage as P } from '../pages/registration.page.js';



export async function fillBasicInfo(driver, data) {
    await typeXpath(driver, P.firstName, data.firstName);
    await typeXpath(driver, P.lastName, data.lastName);
    await typeXpath(driver, P.email, data.email);
    await clickXpath(driver, data.genderXpath);
    await typeXpath(driver, P.mobile, data.mobile);
}

export async function addSubject(driver, subjectText) {
    const input = await driver.wait(
        until.elementLocated(By.xpath(P.subjects)),
        15000
    );

    await input.click();
    await input.sendKeys(subjectText, Key.ENTER);
}

export async function setHobbies(driver, hobbyXpaths = []) {
    for (const hx of hobbyXpaths) {
        await clickXpath(driver, hx);
    }
}


export async function uploadPicture(driver, absolutePath) {
    const input = await driver.wait(until.elementLocated(By.xpath(P.upload)), 15000);

    // scroll into view (DemoQA can be annoying)
    await driver.executeScript("arguments[0].scrollIntoView({block:'center'});", input);

    // send absolute file path
    await input.sendKeys(absolutePath);
}

export async function setAddress(driver, address) {
    await typeXpath(driver, P.address, address);
}

export async function setStateAndCity(driver, state, city) {

    await clickXpath(driver, P.stateCtrl);
    // await clickXpath(driver, P.stateOptionByText(state));

    // await clickXpath(driver, P.cityCtrl);
    // await clickXpath(driver, P.cityOptionByText(city));
}

export async function submit(driver) {
    await clickXpath(driver, P.submit);
}
