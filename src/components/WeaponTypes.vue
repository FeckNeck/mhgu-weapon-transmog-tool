<script setup lang="ts">
import { computed } from "vue";
import { useWeaponStore } from "../store/store";
import weapons from "../assets/weapons.json";

const { $state } = useWeaponStore();

const weaponImage = computed(() => {
  return "assets/images/icon_" + $state.selectedWeaponType?.name + ".png";
});
</script>

<template>
  <div class="weapon-type">
    <img
      :src="weaponImage"
      :alt="$state.selectedWeaponType + ' icon'"
      class="weapon-icon"
    />
    <div>
      <label for="weapon-type">Weapon type :</label>
      <select
        name="weapon-type"
        id="weapon-type"
        v-model="$state.selectedWeaponType"
      >
        <option
          v-for="(weaponType, index) in weapons"
          :key="weaponType.id"
          :value="weaponType"
          :selected="index === 0"
        >
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
