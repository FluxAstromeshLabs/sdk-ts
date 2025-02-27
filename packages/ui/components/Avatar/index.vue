<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
  },
  fallback: {
    type: String,
    default: ''
  },
  fallbackTimeout: {
    type: Number,
    default: 1000
  }
})
const realSrc = ref(props.src)
const loading = ref(true)
const loadError = ref(false)
const error = () => {
  if (props.fallback) {
    realSrc.value = props.fallback
    return
  }
  loading.value = !loading.value
  loadError.value = true
}
const bgClass = computed(() => {
  return `background-${props.number % 5}`
})
const timeout = ref<NodeJS.Timeout>()
const imageRef = ref<HTMLImageElement>()

onMounted(() => {
  timeout.value = setTimeout(() => {
    if (!imageRef.value?.complete) {
      error()
    }
  }, props.fallbackTimeout)
})
onUnmounted(() => {
  clearTimeout(timeout.value)
})
</script>
<template>
  <div class="base-avatar" :class="[size, bgClass].join(' ')">
    <img
      :src="realSrc"
      @load="loading = !loading"
      @error="error"
      v-show="!loading && !loadError"
      ref="imageRef"
    />
    <BaseSkeleton v-if="loading" type="avatar" class="!w-full !h-full absolute top-0 left-0" />
  </div>
</template>
