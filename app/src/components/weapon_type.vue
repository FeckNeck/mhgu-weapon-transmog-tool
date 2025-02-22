<script setup lang="ts">
import weapons from '@/assets/weapons.json';
import { useWeaponStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const weaponStore = useWeaponStore();
const { selectedWeaponType } = storeToRefs(weaponStore);

const weaponImage = computed(() => {
  return (
    'assets/images/icon_' +
    selectedWeaponType.value.name.toLowerCase().replace(/ /g, '_') +
    '.png'
  );
});
</script>

<template>
  <div class="weapon-type">
    <img
      :src="weaponImage"
      :alt="selectedWeaponType.name + ' icon'"
      class="weapon-icon" />
    <div>
      <label for="weapon-type">Weapon type :</label>
      <select
        name="weapon-type"
        id="weapon-type"
        v-model="selectedWeaponType"
        aria-label="Weapon type">
        <option
          v-for="(weaponType, index) in weapons"
          :key="weaponType.id"
          :value="weaponType"
          :selected="index === 0">
          {{ weaponType.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.weapon-icon {
  width: 50px;
  height: 50px;
}

.weapon-type {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
