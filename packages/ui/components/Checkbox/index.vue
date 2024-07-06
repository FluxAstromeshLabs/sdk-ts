<script lang="ts" setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: Boolean,
  onChange: Function,
  checked: Boolean
})
const internalValue = ref(props.modelValue || props.checked)
watch(
  () => props.modelValue,
  (value) => {
    if (value === internalValue.value) return
    internalValue.value = value
  }
)
const checkBoxChange = (value: boolean) => {
  internalValue.value = value
  emit('update:modelValue', value)
  props.onChange && props.onChange(value)
}
</script>

<template>
  <div
    class="checkbox"
    @click="checkBoxChange(!internalValue)"
    :class="{
      checked: internalValue
    }"
  >
    <p class="checkbox__label">
      <slot name="prepend" />
    </p>
    <div class="checkbox__box">
      <svg
        v-if="internalValue"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3.33333 8.66667L6 11.3333L12.6667 4.66667"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <p class="checkbox__label">
      <slot />
    </p>
  </div>
</template>
