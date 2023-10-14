import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Weapon } from "../types";
import weapons from "../assets/weapons.json";

export const useWeaponStore = defineStore("weapons", () => {
  const moddingFoler = ref<string | null>(
    "F:\\Games\\Monster Hunter Generations Ultimate\\data\\mods\\contents\\0100770008dd8000\\weapon-transmog-tool\\romfs\\nativeNX"
  );
  const selectedWeaponType = ref<Weapon>(weapons[0]);
  const weaponToTransmog = ref<string>("130");
  const skinToApply = ref<string>("181");

  const weaponPath = computed(() => {
    return `${moddingFoler.value}\\arc\\weapon\\${selectedWeaponType.value.id}\\${skinToApply.value}.arc`;
  });

  return {
    moddingFoler,
    selectedWeaponType,
    weaponToTransmog,
    skinToApply,
    weaponPath,
  };
});
