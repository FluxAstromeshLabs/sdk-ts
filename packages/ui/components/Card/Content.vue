<script setup lang="ts">
interface CardContentProps {
  class?: string
}

withDefaults(defineProps<CardContentProps>(), {
  class: '',
})
</script>

<template>
  <div :class="['base-card-content', $props.class]">
    <slot />
  </div>
</template>

<style scoped>
.base-card-content {
  @apply p-6 pt-0;
}
</style>
