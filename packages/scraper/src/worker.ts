import { parentPort, workerData } from 'worker_threads';
import { chromium, Locator } from 'playwright';
import type { Skin } from '@mhgu-wtt/shared';

const KIRANICO_URL = 'https://mhxx.kiranico.com/en';

const { weaponPrefix, weaponId } = workerData;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(`${KIRANICO_URL}/${weaponPrefix}`);

const skins: Skin[] = [];

const skinElements = await page.locator('td[rowspan]').all();

const skinUrls = await Promise.all(
  skinElements.map(async (td: Locator) => {
    try {
      const firstLink = td.locator('a').first();
      return await firstLink.getAttribute('href');
    } catch (error) {
      const innerText = await td.innerText();
      console.log(
        `Weapon ${weaponId} - Error getting skin URL for ${innerText}:`,
        error,
      );
      return null;
    }
  }),
);

const filteredSkinUrls = skinUrls.filter((url) => url !== null);
console.log(`Found ${filteredSkinUrls.length} skins for weapon ${weaponId}`);

for (const skinUrl of filteredSkinUrls) {
  const skinPage = await browser.newPage();
  await skinPage.goto(skinUrl);

  const skinName = await skinPage.locator('rt').first().innerText();
  const skinId = await skinPage.evaluate(() => {
    const div = document.querySelector('div#model-viewer.center-block');
    if (div) {
      const bgImage = window.getComputedStyle(div).backgroundImage;
      return bgImage.replace(/\D/g, '');
    }
    return 'Not found';
  });

  console.log(`Weapon ${weaponId} - Skin ${skinId}: ${skinName}`);
  skins.push({ id: skinId, name: skinName });
  await skinPage.close();
}

await page.close();
await browser.close();

parentPort?.postMessage(skins);
