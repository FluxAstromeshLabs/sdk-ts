<script lang="ts" setup>
defineProps({
  onDelete: null,
  color: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      return ['default', 'success', 'error', 'info'].includes(value)
    }
  }
})
</script>
<template>
  <div class="base-badge" :class="{ [color]: color }">
    <slot />
  </div>
</template>
