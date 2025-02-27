import { weapons } from "./weapons";
import { Worker } from "worker_threads";
import { writeFile } from "fs/promises";
import type { Skin } from "./types";

const MAX_WORKERS = 12;
let activeWorkers = 0;

function startWorker(
  weaponId: string,
  weaponName: string,
  weaponPrefix: string
) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Start worker for ${weaponId} - ${weaponName}`);
    activeWorkers++;

    const worker = new Worker("./worker.js", {
      workerData: { weaponPrefix, weaponId },
    });

    worker.on("message", (data: Skin[]) => {
      console.log(`✅ Worker finished for ${weaponId} - ${weaponName}`);
      weapons.find((w) => w.id === weaponId)!.skins = data;
      resolve(data);
    });

    worker.on("error", (err: Error) => {
      console.error(`❌ Error in worker ${weaponId} - ${weaponName} :`, err);
      reject(err);
    });

    worker.on("exit", (code: number) => {
      activeWorkers--;
      if (code !== 0) {
        console.error(
          `❌ Worker ${weaponId} - ${weaponName} stopped with code ${code}`
        );
        reject(new Error(`Worker stopped with code ${code}`));
      }
    });
  });
}

async function processWeapons() {
  console.log("🐧 Scraping begins...");

  const tasks: Promise<any>[] = [];
  for (const weapon of weapons) {
    while (activeWorkers >= MAX_WORKERS) {
      await new Promise((res) => setTimeout(res, 100));
    }

    tasks.push(startWorker(weapon.id, weapon.name, weapon.kiranico_prefix));
  }

  await Promise.all(tasks);
}

(async () => {
  await processWeapons();

  await writeFile("./data/weapons.json", JSON.stringify(weapons, null, 2));
  console.log("✅ File saved successfully!");
})();
