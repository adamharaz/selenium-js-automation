/**
 * smartClick
 * Reliable click helper for flaky UI elements
 */
 export async function smartClick(
    page,
    locator,
    {
      timeout = 5000,
      retries = 3,
      forceLastAttempt = true,
    } = {}
  ) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`smartClick attempt ${attempt}`);
  
        await locator.waitFor({ state: 'visible', timeout });
        await locator.scrollIntoViewIfNeeded();
  
        await locator.click({ timeout });
        return;
      } catch (err) {
        console.log(`smartClick failed on attempt ${attempt}`);
  
        if (attempt === retries && forceLastAttempt) {
          console.log('smartClick forcing click as last attempt');
          await locator.click({ force: true });
          return;
        }
  
        if (attempt === retries) {
          throw err;
        }
  
        await page.waitForTimeout(500);
      }
    }
  }
  