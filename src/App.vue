<script setup lang="ts">
import WeaponTypes from "./components/WeaponTypes.vue";
import WeaponSkins from "./components/WeaponSkins.vue";
import ModdingPath from "./components/ModdingPath.vue";

import { useWeaponStore } from "./store/store";
import { storeToRefs } from "pinia";

import { readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";
import { computed, ref } from "vue";

const store = useWeaponStore();
const { weaponPath, weaponToTransmog, moddingFoler } = storeToRefs(store);

const indexes = [346, 353, 426, 433]; // four weapon IDs of the last two paths
const isLoading = ref(false);
const error = ref<string | null>(null);

const transmogWeapon = async () => {
  try {
    isLoading.value = true;
    const file = await readBinaryFile(weaponPath.value);
    for (let index of indexes) {
      for (let i = 0; i < 3; i++) {
        const hexValue = [...file[index + i].toString(16)];
        hexValue[1] = weaponToTransmog.value[i];
        file[index + i] = parseInt(hexValue.join(""), 16);
      }
    }
    await writeBinaryFile(
      `C:\\Users\\Mathis\\Desktop\\${weaponToTransmog.value}.arc`,
      file
    );
  } catch (e: any) {
    error.value = e;
  } finally {
    isLoading.value = false;
  }
};

const btnText = computed(() => {
  return isLoading.value ? "Loading..." : "Transmog Weapon !";
});
</script>

<template>
  <div class="container">
    <ModdingPath />
    <span class="line"></span>
    <WeaponTypes />
    <span class="line"></span>
    <div class="transmog-container">
      <WeaponSkins :is-weapon-to-transmog="true" />
      <WeaponSkins :is-weapon-to-transmog="false" />
    </div>
    <span class="line"></span>
    <div class="footer">
      <button
        @click="transmogWeapon()"
        :disabled="!moddingFoler || isLoading"
        alt="Transmog weapon"
        title="Transmog weapon"
        class="transmog-btn"
      >
        {{ btnText }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
}
.transmog-container {
  display: flex;
  align-items: center;
}

.line {
  height: 1px;
  width: 100%;
  background-color: lightgrey;
}

.transmog-btn {
  padding: 0.25rem 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  background-color: #f5f5f5;
  cursor: pointer;
}

.transmog-btn:disabled {
  cursor: not-allowed;
  background-color: lightgray;
}

.transmog-btn:enabled:hover {
  background-color: #e5e5e5;
}

.footer {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
