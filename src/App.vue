<script setup lang="ts">
import WeaponTypes from "./components/WeaponTypes.vue";
import WeaponSkins from "./components/WeaponSkins.vue";
import ModdingPath from "./components/ModdingPath.vue";

import { readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";
import { useWeaponStore } from "./store/store";
import { storeToRefs } from "pinia";

const indexes = [266, 273, 346, 353];
const store = useWeaponStore();
const { weaponPath, skinToApply, moddingFoler } = storeToRefs(store);

const transmogWeapon = async () => {
  console.log();
  const file = await readBinaryFile(weaponPath.value);
  for (let index of indexes) {
    for (let i = 0; i < 3; i++) {
      const hexValue = [...file[index + i].toString(16)];
      hexValue[1] = skinToApply.value[i];
      file[index + i] = parseInt(hexValue.join(""), 16);
    }
  }
  await writeBinaryFile("C:\\Users\\Mathis\\Desktop\\001.arc", file);
};
</script>

<template>
  <ModdingPath />
  <WeaponTypes />
  <div class="transmog-container">
    <WeaponSkins :is-weapon-to-transmog="true" />
    <WeaponSkins />
  </div>
  <button
    alt="Transmog weapon"
    title="Transmog weapon"
    @click="transmogWeapon()"
    :disabled="!moddingFoler"
  >
    Transmog Weapon !
  </button>
</template>

<style scoped>
.transmog-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
