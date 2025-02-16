<script setup lang="ts">
import { useWeaponStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const WEAPON_URL =
  'https://cdn.kiranico.net/file/kiranico/mhgu-web/images/rotate';

const props = defineProps<{
  isWeaponToTransmog: boolean;
}>();

const weaponStore = useWeaponStore();
const { selectedWeaponType } = storeToRefs(weaponStore);

const weaponModel = defineModel<string>();

const skins = computed(() => {
  return selectedWeaponType.value.skins;
});

const weaponImage = computed(() => {
  return `url(${WEAPON_URL}/${selectedWeaponType.value.image_prefix}${weaponModel.value}_rotate.webp)`;
});

const inputLabel = computed(() => {
  return props.isWeaponToTransmog ? 'Weapon to transmog' : 'Skin to apply';
});
</script>

<template>
  <div class="skins-container">
    <div :style="{ backgroundImage: weaponImage }" class="weapon-image"></div>
    <div>
      <label :for="inputLabel">{{ inputLabel }} :</label>
      <select :id="inputLabel" name="weapon-skins" v-model="weaponModel">
        <option v-for="skin in skins" :key="skin.id" :value="skin.id">
          {{ skin.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.skins-container {
  display: flex;
  align-items: center;
}
.weapon-image {
  width: 270px;
  height: 270px;
}
</style>
