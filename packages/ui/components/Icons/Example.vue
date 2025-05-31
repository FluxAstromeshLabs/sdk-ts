<template>
  <div class="grid grid-cols-4 gap-4">
    <div v-for="icon in icons.icons" :key="icon">
      <BaseIcons :name="icon" class="w-10 h-10" />
      <span>{{ icon }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import icons from '../../icons.json'
import BaseIcons from './index.vue'
</script>
