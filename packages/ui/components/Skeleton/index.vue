<template>
  <div class="skeleton-loader" :class="`skeleton-loader--${type}`">
    <div v-if="type === 'text'" class="skeleton-loader__text"></div>
    <div v-if="type === 'avatar'" class="skeleton-loader__avatar"></div>
    <div v-if="type === 'image'" class="skeleton-loader__image"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: true,
    default: 'text',
    validator: (value: string) => ['text', 'avatar', 'image'].includes(value) // Các loại được hỗ trợ
  }
})
</script>
