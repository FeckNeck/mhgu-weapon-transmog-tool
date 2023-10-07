<script setup lang="ts">
import { open } from "@tauri-apps/api/dialog";
import { useWeaponStore } from "../store/store.ts";

const { $state } = useWeaponStore();

const openDirectoryDialog = async () => {
  await open({
    directory: true,
  }).then((result) => {
    if (result) {
      $state.moddingFoler = result as string;
    }
  });
};
</script>

<template>
  <div class="path-container">
    <p>Select Yuzu or Ryujinx mod directory :</p>
    <button class="folder-btn" @click="openDirectoryDialog">
      <img src="../assets/folder-open.svg" alt="open folder" />
      <span v-if="$state.moddingFoler" class="path">{{
        $state.moddingFoler
      }}</span>
      <span v-else class="placeholder">placeholder</span>
    </button>
  </div>
</template>

<style scoped>
.folder-btn {
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 250px;
  gap: 0.5rem;

  .path {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .placeholder {
    color: gray;
  }
}
</style>
