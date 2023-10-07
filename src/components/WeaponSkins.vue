<script setup lang="ts">
import { ref, computed } from "vue";
import { useWeaponStore } from "../store/store";

const weaponURL =
  "https://cdn.kiranico.net/file/kiranico/mhgu-web/images/rotate/two";

const props = defineProps<{
  isWeaponToTransmog?: boolean;
}>();

const { $state } = useWeaponStore();

const selectedSkin = ref(
  props.isWeaponToTransmog ? $state.weaponToTransmog : $state.skinToApply
);

const skins = computed(() => {
  return $state.selectedWeaponType?.skins;
});

const weaponImage = computed(() => {
  return `url(${weaponURL}${selectedSkin.value}_rotate.webp)`;
});

const inputLabel = computed(() => {
  return props.isWeaponToTransmog ? "Weapon to transmog" : "Skin to apply";
});
</script>

<template>
  <div class="skins-container">
    <div :style="{ backgroundImage: weaponImage }" class="weapon-image"></div>
    <div>
      <label for="weapon-skins">{{ inputLabel }}</label>
      <select name="weapon-skins" id="weapon-skins" v-model="selectedSkin">
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
  gap: 1rem;
}
.weapon-image {
  width: 270px;
  height: 270px;
}
</style>
