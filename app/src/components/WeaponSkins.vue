<script setup lang="ts">
import { computed } from "vue";
import { useWeaponStore } from "../store/store";

const weaponURL =
  "https://cdn.kiranico.net/file/kiranico/mhgu-web/images/rotate";

const props = defineProps<{
  isWeaponToTransmog: boolean;
}>();

const { $state } = useWeaponStore();

const selectedSkin = computed({
  get: () =>
    props.isWeaponToTransmog ? $state.weaponToTransmog : $state.skinToApply,
  set: (value: string) => {
    if (props.isWeaponToTransmog) {
      $state.weaponToTransmog = value;
    } else {
      $state.skinToApply = value;
    }
  },
});

const skins = computed(() => {
  return $state.selectedWeaponType.skins;
});

const weaponImage = computed(() => {
  return `url(${weaponURL}/${$state.selectedWeaponType.image_prefix}${selectedSkin.value}_rotate.webp)`;
});

const inputLabel = computed(() => {
  return props.isWeaponToTransmog ? "Weapon to transmog" : "Skin to apply";
});
</script>

<template>
  <div class="skins-container">
    <div :style="{ backgroundImage: weaponImage }" class="weapon-image"></div>
    <div>
      <label :for="inputLabel">{{ inputLabel }} :</label>
      <select :id="inputLabel" name="weapon-skins" v-model="selectedSkin">
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
