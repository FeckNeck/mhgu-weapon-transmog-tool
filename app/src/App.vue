<script setup lang="ts">
import { readBinaryFile, writeBinaryFile } from '@tauri-apps/api/fs';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import ModdingPath from './components/ModdingPath.vue';
import WeaponSkins from './components/WeaponSkins.vue';
import WeaponTypes from './components/WeaponTypes.vue';
import { useWeaponStore } from './store';

const weaponStore = useWeaponStore();
const { weaponToTransmog, skinToApply, moddingFoler, weaponPath } =
  storeToRefs(weaponStore);

const isLoading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const btnText = computed(() => {
  return isLoading.value ? 'Loading...' : 'Transmog Weapon !';
});

function convertWeaponToHex(num: string): string[] {
  return num
    .split('')
    .map((char: string) => char.charCodeAt(0).toString(16).toUpperCase());
}

function convertFileToHex(uint8Array: Uint8Array): string[] {
  return Array.from(uint8Array).map((byte) =>
    byte.toString(16).padStart(2, '0'),
  );
}

function replaceSkinWithWeapon(file: Uint8Array): string[] {
  const hexFileData = convertFileToHex(file);
  const weaponHex = convertWeaponToHex(weaponToTransmog.value);
  const skinHex = convertWeaponToHex(skinToApply.value);

  const skinOccurrences: number[] = [];

  // Find all occurrences of the skin to apply
  for (let i = 0; i <= hexFileData.length; i++) {
    if (
      hexFileData[i] === skinHex[0] &&
      hexFileData[i + 1] === skinHex[1] &&
      hexFileData[i + 2] === skinHex[2]
    ) {
      skinOccurrences.push(i);
    }
  }

  // Only the last 4 occurrences are necessary to be replaced
  for (let i = 0; i < 4; i++) {
    hexFileData[skinOccurrences[skinOccurrences.length - 1 - i]] = weaponHex[0];
    hexFileData[skinOccurrences[skinOccurrences.length - 1 - i] + 1] =
      weaponHex[1];
    hexFileData[skinOccurrences[skinOccurrences.length - 1 - i] + 2] =
      weaponHex[2];
  }

  return hexFileData;
}

async function transmogWeapon() {
  try {
    isLoading.value = true;
    error.value = null;
    success.value = null;

    const file = await readBinaryFile(
      `${weaponPath.value}\\${skinToApply.value}.arc`,
    );
    const modifiedHexFile = replaceSkinWithWeapon(file);

    await writeBinaryFile(
      `${weaponPath.value}\\${weaponToTransmog.value}.arc`,
      new Uint8Array(modifiedHexFile.map((hex) => parseInt(hex, 16))),
    );

    success.value = 'Weapon transmogged successfully !';
  } catch (e: any) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <ModdingPath />
    <span class="line"></span>
    <WeaponTypes />
    <span class="line"></span>
    <div class="transmog-container">
      <WeaponSkins :is-weapon-to-transmog="true" v-model="weaponToTransmog" />
      <WeaponSkins :is-weapon-to-transmog="false" v-model="skinToApply" />
    </div>
    <span class="line"></span>
    <div class="footer">
      <button
        @click="transmogWeapon()"
        :disabled="!moddingFoler || isLoading"
        alt="Transmog weapon"
        title="Transmog weapon"
        class="transmog-btn">
        {{ btnText }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="succes">{{ success }}</p>
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
  height: 0.0625rem;
  width: 100%;
  background-color: lightgrey;
}

.transmog-btn {
  padding: 0.25rem 0.5rem;
  border: 0.0625rem solid lightgray;
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
  font-size: 0.75rem;
}

.succes {
  color: green;
  font-size: 0.75rem;
}
</style>
