<script setup>
import { watch, ref } from 'vue'
import { defineEmits } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  label: String
})

const emit = defineEmits(['update:modelValue'])
const isOn = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    isOn.value = newVal
  }
)

function toggleSwitch() {
  const newValue = !isOn.value
  isOn.value = newValue
  emit('update:modelValue', newValue)
}
</script>
<template>
  <div class="base-switch">
    <p class="label" v-if="label">{{ label }}</p>
    <slot class="label" name="prepend" />
    <div @click="toggleSwitch" class="box" :class="isOn ? 'is-on' : ''">
      <div class="switch-circle"></div>
    </div>
    <slot class="label" name="append" />
  </div>
</template>
