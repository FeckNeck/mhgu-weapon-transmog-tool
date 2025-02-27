import { parentPort, workerData } from "worker_threads";
import { chromium } from "playwright";
import type { Skin } from "./types";

const KIRANICO_URL = "https://mhxx.kiranico.com/en";

(async () => {
  const { weaponPrefix, weaponId } = workerData;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${KIRANICO_URL}/${weaponPrefix}`);

  let skins: Skin[] = [];

  const skinLinks = await page.locator("table").first().locator("a").all();
  const skinUrls = await Promise.all(
    skinLinks.map((skinLink: any) => skinLink.getAttribute("href"))
  );

  for (const skinUrl of skinUrls) {
    if (skinUrl) {
      const skinPage = await browser.newPage();
      await skinPage.goto(skinUrl);

      const skinName = await skinPage.locator("rt").first().innerText();
      const skinId = await skinPage.evaluate(() => {
        const div = document.querySelector("div#model-viewer.center-block");
        if (div) {
          const bgImage = window.getComputedStyle(div).backgroundImage;
          return bgImage.replace(/\D/g, "");
        }
        return "Not found";
      });

      console.log(`Weapon ${weaponId} - Skin ${skinId}: ${skinName}`);
      skins.push({ id: skinId, name: skinName });
      await skinPage.close();
    }
  }

  await page.close();
  await browser.close();

  parentPort?.postMessage(skins);
})();
