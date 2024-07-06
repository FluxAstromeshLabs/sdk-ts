<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseSkeleton from '../Skeleton/index.vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => {
      return ['sm', 'md', 'lg'].includes(value)
    }
  },
  number: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0 && value <= 4
    }
  }
})
const loading = ref(true)
const loadError = ref(false)
const error = () => {
  loading.value = !loading.value
  loadError.value = true
}
const bgClass = computed(() => {
  return `background-${props.number % 5}`
})
</script>
<template>
  <div class="base-avatar" :class="[size, bgClass].join(' ')">
    <img :src="src" @load="loading = !loading" @error="error" v-show="!loading && !loadError" />
    <BaseSkeleton v-if="loading" type="avatar" class="!w-full !h-full absolute top-0 left-0" />
  </div>
</template>
