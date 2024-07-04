<script setup lang="ts">
import { ref, useAttrs } from 'vue'
defineOptions({
  inheritAttrs: false
})
defineProps({
  modalValue: String,
  label: {
    type: String
  },
  errorMessage: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: ''
  },
  inputClass: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  appendIcon: {
    type: String,
    default: ''
  },
  prependIcon: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  },
  helperTextIcon: {
    type: String,
    default: null
  }
})
const inputRef = ref<any>(null)
defineModel('modelValue')
const $attrs = useAttrs()
const emit = defineEmits(['update:modelValue'])
const inputChange = (e: any) => {
  emit('update:modelValue', e.target.value)
}
</script>
<template>
  <div class="base-text-field" :class="[errorMessage ? 'invalid' : '', containerClass].join(' ')">
    <p class="label flex gap-1" :class="labelClass" v-if="label">
      {{ label }}
      <BaseTooltip v-if="helperText && helperTextIcon">
        <BaseIcons :name="helperTextIcon" />
        <template #content>
          {{ helperText }}
        </template>
      </BaseTooltip>
    </p>
    <p v-if="helperText && !helperTextIcon" class="text-[14px] mb-2 leading-[20px]">
      {{ helperText }}
    </p>
    <slot name="label" class="label" />
    <div class="input" :class="class">
      <BaseIcons v-if="prependIcon" :name="prependIcon" class="prepend-icon" />
      <slot v-else name="prependIcon" class="prepend-icon" />

      <input
        type="text"
        v-bind="$attrs"
        ref="inputRef"
        :class="inputClass"
        :value="modelValue"
        @input="inputChange"
      />

      <BaseIcons v-if="appendIcon" :name="appendIcon" class="append-icon" />
      <slot v-else name="appendIcon" class="append-icon" />
    </div>
    <p v-if="errorMessage" class="message">{{ errorMessage }}</p>
  </div>
</template>
