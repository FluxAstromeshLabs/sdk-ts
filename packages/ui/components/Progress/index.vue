<script setup lang="ts">
interface ProgressProps {
  value?: number
  max?: number
  class?: string
  variant?: 'default' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  max: 100,
  class: '',
  variant: 'default',
  size: 'md',
})

const percentage = computed(() => {
  return Math.min(Math.max((props.value / props.max) * 100, 0), 100)
})
</script>

<template>
  <div :class="['base-progress', variant, size, $props.class]">
    <div class="base-progress-indicator" :style="{ width: `${percentage}%` }" />
  </div>
</template>

<style scoped>
.base-progress {
  @apply relative w-full overflow-hidden rounded-full bg-gray-700;
}

.base-progress.sm {
  @apply h-2;
}

.base-progress.md {
  @apply h-3;
}

.base-progress.lg {
  @apply h-4;
}

.base-progress-indicator {
  @apply h-full transition-all duration-300 ease-in-out rounded-full;
}

.base-progress.default .base-progress-indicator {
  @apply bg-orange-400;
}

.base-progress.gradient .base-progress-indicator {
  @apply bg-gradient-to-r from-orange-400 to-lime-400;
}
</style>
