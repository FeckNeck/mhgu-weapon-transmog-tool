import { chromium } from "playwright";
import { weapons } from "./weapon";
import { writeFile } from "fs";

export type Weapons = Weapon[];

export interface Weapon {
  id: string;
  name: string;
  icon: string;
  image_prefix: string;
  skins: Skin[];
}

export interface Skin {
  id: string;
  name: string;
}

const kiranicoWeaponOrder = [
  "w00",
  "w07",
  "w01",
  "w11",
  "w02",
  "w12",
  "w03",
  "w09",
  "w08",
  "w14",
  "w13",
  "w11",
  "w06",
  "w04",
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://mhxx.kiranico.com/en");

  const weaponLinks = await page
    .locator('p:has-text("Weapon") + table a')
    .all();

  for (let i = 0; i < weaponLinks.length; i++) {
    const weaponUrl = await weaponLinks[i].getAttribute("href");

    if (weaponUrl) {
      console.log(`Navigating to: ${weaponUrl}`);
      const weapon = weapons.find((w) => w.id === kiranicoWeaponOrder[i]);
      const weaponSkins: Skin[] = [];
      const weaponPage = await browser.newPage();
      await weaponPage.goto(weaponUrl);

      const skinLinks = await weaponPage.locator("table a").all();
      for (const skinLink of skinLinks) {
        const skinUrl = await skinLink.getAttribute("href");

        if (skinUrl) {
          console.log(`Navigating to new link: ${skinUrl}`);
          const skinPage = await browser.newPage();
          await skinPage.goto(skinUrl);

          const skinName = await skinPage.locator("rt").first().innerText();

          const skinId = await skinPage.evaluate(() => {
            const div = document.querySelector("div#model-viewer.center-block");
            if (div) {
              const bgImage = window.getComputedStyle(div).backgroundImage;
              console.log("bgImage:", bgImage);
              return bgImage.replace(/^.*image\/(.*?)_.*$/, "$1"); // Extrait uniquement l'URL
            }
            return "Not found";
          });

          const skin: Skin = {
            name: skinName,
            id: skinId,
          };

          weaponSkins.push(skin);

          console.log(`Background Image URL: ${skinId || "Not found"}`);

          await skinPage.close();
        }
      }

      weapon!.skins = weaponSkins;

      await weaponPage.close();
    }
  }

  await browser.close();

  // save the weapons to a file
  writeFile(
    "src/weapon.ts",
    `export const weapons = ${JSON.stringify(weapons, null, 2)}`,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Weapons saved to src/weapon.ts");
      }
    }
  );
})();
