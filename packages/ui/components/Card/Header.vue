<script setup lang="ts">
interface CardHeaderProps {
  class?: string
}

withDefaults(defineProps<CardHeaderProps>(), {
  class: '',
})
</script>

<template>
  <div :class="['base-card-header', $props.class]">
    <slot />
  </div>
</template>

<style scoped>
.base-card-header {
  @apply flex flex-col space-y-1.5 p-6;
}
</style>
