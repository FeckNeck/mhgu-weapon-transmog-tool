import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Weapon } from "../types";
import { useStorage } from "@vueuse/core";
import weapons from "../assets/weapons.json";

export const useWeaponStore = defineStore("weapons", () => {
  const moddingFoler = useStorage("moddingFolder", "");

  const selectedWeaponType = ref<Weapon>(weapons[0]);
  const weaponToTransmog = ref<string>("130");
  const skinToApply = ref<string>("181");

  const weaponPath = computed(() => {
    return `${moddingFoler.value}\\romfs\\nativeNX\\arc\\weapon\\${selectedWeaponType.value.id}`;
  });

  return {
    moddingFoler,
    selectedWeaponType,
    weaponToTransmog,
    skinToApply,
    weaponPath,
  };
});
