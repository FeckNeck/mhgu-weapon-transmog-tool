import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Weapon } from "../types";
import weapons from "../assets/weapons.json";

export const useWeaponStore = defineStore("weapons", () => {
  const moddingFoler = ref<string | null>(null);
  const selectedWeaponType = ref<Weapon>(weapons[0]);
  const weaponToTransmog = ref<string>("003");
  const skinToApply = ref<string>("004");

  const weaponPath = computed(() => {
    return `${moddingFoler.value}\\arc\\weapon\\${selectedWeaponType.value.id}\\${weaponToTransmog.value}.arc`;
  });

  return {
    moddingFoler,
    selectedWeaponType,
    weaponToTransmog,
    skinToApply,
    weaponPath,
  };
});
