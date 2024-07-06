<script lang="ts" setup>
import { ref } from 'vue'
import { Dropdown } from 'floating-vue'

defineProps({
  popperClass: {
    type: String,
    default: ''
  },
  hideOnClick: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits<{
  'isOpen:change': [show: boolean]
  'update:isOpen': [show: boolean]
}>()

const isOpen = ref(false)

function onUpdate(value: boolean) {
  isOpen.value = value
}

function onClose() {
  isOpen.value = false
}

function onOpenDropdown() {
  emit('isOpen:change', true)
  emit('update:isOpen', true)
}

function onCloseDropdown() {
  emit('isOpen:change', false)
  emit('update:isOpen', false)
}

defineExpose({
  isOpen
})
</script>

<template>
  <Dropdown
    v-bind="$attrs"
    class="base-dropdown"
    :shown="isOpen"
    @update:shown="onUpdate"
    @show="onOpenDropdown"
    @hide="onCloseDropdown"
    :popperClass="['base-dropdown__popover', popperClass].join(' ')"
    :popperHideTriggers="(triggers) => (!hideOnClick ? triggers : [...triggers, 'click'])"
  >
    <slot :is-open="isOpen" />
    <template #popper>
      <slot name="content" :close="onClose" />
    </template>
  </Dropdown>
</template>
