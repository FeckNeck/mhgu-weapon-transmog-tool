<script setup lang="ts">
import weapons from '@/assets/weapons.json';
import { useWeaponStore } from '@/store';
import { computed } from 'vue';

const { $state } = useWeaponStore();

const weaponImage = computed(() => {
  return 'assets/images/icon_' + $state.selectedWeaponType?.name + '.png';
});
</script>

<template>
  <div class="weapon-type">
    <img
      :src="weaponImage"
      :alt="$state.selectedWeaponType.name + ' icon'"
      class="weapon-icon" />
    <div>
      <label for="weapon-type">Weapon type :</label>
      <select
        name="weapon-type"
        id="weapon-type"
        v-model="$state.selectedWeaponType"
        aria-label="Weapon type">
        <option
          v-for="(weaponType, index) in weapons"
          :key="weaponType.id"
          :value="weaponType"
          :selected="index === 0">
          {{ weaponType.title }}
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
