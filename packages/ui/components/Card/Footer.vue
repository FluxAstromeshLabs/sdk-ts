<script setup lang="ts">
interface CardFooterProps {
  class?: string
}

withDefaults(defineProps<CardFooterProps>(), {
  class: '',
})
</script>

<template>
  <div :class="['base-card-footer', $props.class]">
    <slot />
  </div>
</template>

<style scoped>
.base-card-footer {
  @apply flex items-center p-6 pt-0;
}
</style>
