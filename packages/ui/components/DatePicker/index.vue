<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import BaseTextField from '../TextField/index.vue'
import { ref, watch, computed, useAttrs } from 'vue'
import dayjs from 'dayjs'
// Define props and emits
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  }, // Changed to modelValue to work with v-model
  inputClass: {
    type: String,
    default: '',
  },
  format: {
    type: String,
    default: 'MM/DD/YYYY',
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()
const internalValue = ref(props.modelValue)
// Update internal value when the prop changes
watch([() => internalValue.value], () => {
  const dateTime = dayjs(internalValue.value)
  emit('update:modelValue', dateTime)
})

// Compute attributes for v-date-picker
const datePickerAttrs = computed(() => {
  const { modelValue, inputClass, format, errorMessage, ...otherAttrs } = { ...props, ...attrs }
  return otherAttrs
})
const inputDisplay = computed(() => {
  return internalValue.value ? dayjs(internalValue.value).format(props.format) : props.format
})
</script>

<template>
  <Datepicker
    time-picker-inline
    enable-seconds
    seconds-grid-increment="1"
    minutes-grid-increment="1"
    dark
    :min-date="new Date()"
    v-model="internalValue"
    v-bind="datePickerAttrs"
  >
    <template #trigger>
      <BaseTextField
        containerClass="w-full"
        :label="label"
        :class="inputClass"
        v-model="inputDisplay"
        :error-message="errorMessage"
        :disabled="disabled"
        readonly
      ></BaseTextField>
    </template>
    <template #input-icon>
      <slot name="input-icon" />
    </template>

    <template #clear-icon>
      <slot name="clear-icon" />
    </template>
  </Datepicker>
</template>
