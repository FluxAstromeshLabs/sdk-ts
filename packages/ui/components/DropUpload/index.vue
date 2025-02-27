<script setup>
import { ref, defineProps } from 'vue'
import BaseIcons from '../Icons/index.vue'
defineProps({
  modelValue: File | null,
  description: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'image'
  }
})
const emit = defineEmits(['update:modelValue'])
const fileInput = ref(null)
const dragover = ref(false)
function handleDragOver(event) {
  event.dataTransfer.dropEffect = 'copy'
  dragover.value = true
}

function handleDragLeave() {
  dragover.value = false
}
function handleDrop(event) {
  dragover.value = false
  const files = event.dataTransfer.files
  if (files.length) {
    emit('update:modelValue', files)
  }
}

function handleFiles(event) {
  const files = event.target.files
  if (files.length) {
    emit('update:modelValue', files)
  }
}

function triggerFileInput() {
  fileInput.value.click()
}
</script>
<template>
  <div
    class="base-drop-upload"
    :class="dragover ? 'drag-over' : ''"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    @click.stop="triggerFileInput"
  >
    <BaseIcons name="fileUpLoad" />
    <p v-if="title">{{ title }}</p>
    <p v-else class="title">
      Drag and drop an {{ type }}, or <span class="click-here">Browse</span>
    </p>
    <p v-if="description" class="description">{{ description }}</p>
    <input
      type="file"
      @click.stop
      :accept="accept"
      ref="fileInput"
      @change="handleFiles"
      multiple
      hidden
    />
  </div>
</template>
