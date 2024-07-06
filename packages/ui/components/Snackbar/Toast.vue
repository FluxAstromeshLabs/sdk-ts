<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import BaseIcons from '../Icons/index.vue'
const props = defineProps({
  modelValue: Boolean,
  timeout: {
    type: Number,
    default: 8000
  },
  color: {
    type: String,
    default: 'info'
  },
  createAt: {
    type: Number,
    default: 0
  }
})
const _timeout = ref<any>('')
const emit = defineEmits(['update:modelValue'])
const hide = () => {
  emit('update:modelValue', false)
  if (_timeout.value) {
    clearTimeout(_timeout.value)
  }
}
watchEffect(() => {
  if (_timeout.value) {
    clearTimeout(_timeout.value)
  }
  if (props.modelValue && props.createAt) {
    _timeout.value = setTimeout(() => {
      hide()
    }, props.timeout)
  }
})
</script>
<template>
  <transition>
    <div class="snackbar" :class="color" v-if="modelValue">
      <div class="snackbar_content">
        <slot />
      </div>
      <div class="max-h-[100%] overflow-auto">
        <BaseButton size="sm icon ml-2" @click="hide">
          <span class="icon-close">
            <BaseIcons name="close" />
          </span>
        </BaseButton>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  bottom: -5%;
}
</style>
