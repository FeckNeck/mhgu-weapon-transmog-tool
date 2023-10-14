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
      <img
        src="../assets/folder-open.svg"
        alt="open folder"
        width="15"
        height="15"
      />
      <span v-if="$state.moddingFoler" class="path">{{
        $state.moddingFoler
      }}</span>
      <span v-else class="placeholder path">Mhgu\...\weapon-transmog-tool</span>
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
    font-size: 14px;
  }

  .placeholder {
    color: gray;
  }
}

.folder-btn:hover {
  background-color: #f5f5f5;
}
</style>
