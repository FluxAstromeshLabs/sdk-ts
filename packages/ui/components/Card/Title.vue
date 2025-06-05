<script setup lang="ts">
interface CardTitleProps {
  class?: string
}

withDefaults(defineProps<CardTitleProps>(), {
  class: '',
})
</script>

<template>
  <h3 :class="['base-card-title', $props.class]">
    <slot />
  </h3>
</template>

<style scoped>
.base-card-title {
  @apply text-2xl font-semibold leading-none tracking-tight text-white;
}
</style>
