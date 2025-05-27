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
  @apply rounded-xl border border-gray-700 bg-gray-800 text-white shadow-sm;
}

.base-card.outlined {
  @apply border-gray-600 bg-transparent;
}

.base-card.elevated {
  @apply shadow-lg border-gray-600;
}

/* Hover effects */
.base-card:hover {
  @apply border-gray-600 transition-colors duration-200;
}

.base-card.outlined:hover {
  @apply border-gray-500;
}

.base-card.elevated:hover {
  @apply shadow-xl border-gray-500;
}
</style>
