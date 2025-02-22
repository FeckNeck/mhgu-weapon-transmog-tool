import { Worker } from "worker_threads";
import { writeFile } from "fs/promises";
import { Skin } from ".";
import { weapons } from "./weapon";

export interface WeaponUrl {
  id: string;
  prefix: string;
}

const weaponUrls: WeaponUrl[] = [
  // { id: "w00", prefix: "dai" },
  // { id: "w07", prefix: "tachi" },
  // { id: "w01", prefix: "kata" },
  // { id: "w11", prefix: "sou" },
  // { id: "w02", prefix: "ham" },
  // { id: "w12", prefix: "fue" },
  // { id: "w03", prefix: "lan" },
  // { id: "w09", prefix: "gun" },
  // { id: "w08", prefix: "saxe" },
  // { id: "w14", prefix: "caxe" },
  // { id: "w13", prefix: "rod" },
  { id: "w10", prefix: "yumi" },
  // { id: "w06", prefix: "lbg" },
  // { id: "w04", prefix: "hbg" },
];

const MAX_WORKERS = 12;
let activeWorkers = 0;

function startWorker(weaponId: string, weaponPrefix: string) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Lancement du worker pour ${weaponId}`);
    activeWorkers++;

    const worker = new Worker("./worker.js", {
      workerData: { weaponPrefix },
    });

    worker.on("message", (data: Skin[]) => {
      console.log(`✅ Worker terminé pour ${weaponId}`);
      weapons.find((w) => w.id === weaponId)!.skins = data;
      resolve(data);
    });

    worker.on("error", (err: Error) => {
      console.error(`❌ Erreur dans le worker ${weaponId} :`, err);
      reject(err);
    });

    worker.on("exit", (code: number) => {
      activeWorkers--;
      if (code !== 0) {
        console.error(`❌ Worker ${weaponId} arrêté avec le code ${code}`);
        reject(new Error(`Worker stopped with code ${code}`));
      }
    });
  });
}

async function processWeapons() {
  console.log("🚀 Début du scraping...");

  const tasks: Promise<any>[] = [];
  for (const weaponUrl of weaponUrls) {
    // Tant qu'on a trop de workers actifs, on attend un peu
    while (activeWorkers >= MAX_WORKERS) {
      await new Promise((res) => setTimeout(res, 100));
    }

    // Démarre un worker et ajoute sa promesse dans la liste
    tasks.push(startWorker(weaponUrl.id, weaponUrl.prefix));
  }

  // Attendre que tous les workers terminent
  await Promise.all(tasks);
}

// ✅ Exécuter le tout
(async () => {
  await processWeapons();

  await writeFile("./weapons.json", JSON.stringify(weapons, null, 2));
  console.log("✅ Fichier écrit avec succès !");
})();
