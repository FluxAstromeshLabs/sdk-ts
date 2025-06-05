<script setup lang="ts">
interface CardProps {
  class?: string
  variant?: 'default' | 'outlined' | 'elevated'
}

withDefaults(defineProps<CardProps>(), {
  class: '',
  variant: 'default',
})
</script>

<template>
  <div :class="['base-card', variant, $props.class]">
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  @apply p-4 dark:bg-dark-secondary rounded-xl border-2 border-light-alpha-200 dark:border-dark-alpha-200 space-y-2;
}

.base-card.outlined {
  @apply border-gray-600 bg-transparent;
}

.base-card.elevated {
  @apply shadow-lg border-gray-600;
}

.base-card.outlined:hover {
  @apply border-gray-500;
}

.base-card.elevated:hover {
  @apply shadow-xl border-gray-500;
}
</style>
