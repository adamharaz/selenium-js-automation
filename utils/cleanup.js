export async function removeDemoQaOverlays(driver) {
    await driver.executeScript(`
      const f = document.querySelector('footer'); if (f) f.remove();
      const b = document.querySelector('#fixedban'); if (b) b.remove();
    `);
  }
  