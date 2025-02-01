<script setup lang="ts">
import { ref, useAttrs } from 'vue'
defineOptions({
  inheritAttrs: false
})
defineProps({
  modelValue: String,
  label: {
    type: String,
    required: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: 0
  },
  inputClass: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineModel('modelValue')

const $attrs = useAttrs()
const emit = defineEmits(['update:modelValue'])
const inputChange = (e: any) => {
  emit('update:modelValue', e.target.value)
}
const inputRef = ref<any>(null)
const containerClick = () => {
  inputRef.value?.focus()
}
</script>
<template>
  <div class="base-text-area" :class="[errorMessage ? 'invalid' : '', containerClass].join(' ')">
    <p class="label" :class="labelClass" v-if="label">
      {{ label }}
      <span v-if="required">&ast;</span>
    </p>
    <div class="relative w-full flex-1">
      <textarea
        class="input h-full"
        type="text"
        ref="inputRef"
        v-bind="$attrs"
        :class="inputClass"
        :value="modelValue ? modelValue : value"
        @input="inputChange"
      />
      <p v-if="maxLength" class="max-length">{{ modelValue?.length || 0 }}/{{ maxLength }}</p>
    </div>
    <p v-if="errorMessage" class="message">{{ errorMessage }}</p>
  </div>
</template>
