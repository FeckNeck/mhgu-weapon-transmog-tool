import weapons from '@/assets/weapons.json' assert { type: 'json' };
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Weapon } from '@mhgu-wtt/shared';

export const useWeaponStore = defineStore('weapons', () => {
  const moddingFoler = useStorage('moddingFolder', '');

  const selectedWeaponType = ref<Weapon>(weapons[0]);
  const weaponToTransmog = ref<string>('130');
  const skinToApply = ref<string>('181');

  const weaponPath = computed(() => {
    return `${moddingFoler.value}\\romfs\\nativeNX\\arc\\weapon\\${selectedWeaponType.value.id}`;
  });

  watch(selectedWeaponType, () => {
    weaponToTransmog.value = selectedWeaponType.value.skins[0].id;
    skinToApply.value = selectedWeaponType.value.skins.filter((skin) =>
      skin.name.includes('Jewelled'),
    )[0].id;
  });

  return {
    moddingFoler,
    selectedWeaponType,
    weaponToTransmog,
    skinToApply,
    weaponPath,
  };
});
