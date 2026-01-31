/**
 * stubbornFill
 * For inputs that refuse to keep their value (phone, SIN, postal code, etc.)
 */
 export async function stubbornFill(
    page,
    locator,
    value,
    {
      retries = 3,
      delay = 50,
      verify = true,
    } = {}
  ) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`stubbornFill attempt ${attempt} with value: ${value}`);
  
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.scrollIntoViewIfNeeded();
        await locator.click({ clickCount: 3 });
  
        // Clear the field the old-school way
        await locator.press('Control+A');
        await locator.press('Backspace');
  
        // Type slowly so masks don’t freak out
        await locator.type(value, { delay });
  
        if (verify) {
          const currentValue = await locator.inputValue();
          if (currentValue.includes(value) || currentValue.replace(/\D/g, '') === value.replace(/\D/g, '')) {
            return;
          }
  
          throw new Error(`Value mismatch. Found: ${currentValue}`);
        }
  
        return;
      } catch (err) {
        console.log(`stubbornFill failed on attempt ${attempt}`);
  
        if (attempt === retries) {
          throw err;
        }
  
        await page.waitForTimeout(300);
      }
    }
  }
  