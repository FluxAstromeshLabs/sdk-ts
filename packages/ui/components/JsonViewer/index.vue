<template>
  <div class="w-full overflow-x-auto transition-all duration-300">
    <div v-for="(value, key) in data" :key="key" class="w-fit ml-4">
      <div class="flex">
        <div
          v-if="isArray(value) || isObject(value)"
          @click="toggle(key)"
          class="arrow-icon"
          :class="{
            active: collapsed[key]
          }"
        >
          <BaseIcons name="AngleDown" />
        </div>
        <span v-if="!isArray(data)" @click="toggle(key)" class="cursor-pointer">{{ key }}:</span>
        <span v-if="isObject(value)">
          <span v-if="collapsed[key]">{...}</span>
          <span v-else>{</span>
        </span>
        <span v-else-if="isArray(value)">
          <span v-if="collapsed[key]">[...]</span>
          <span v-else>[</span>
        </span>
        <span v-else>{{ value }}</span>
      </div>

      <div v-show="!collapsed[key]" class="wrapper">
        <BaseJsonViewer v-if="isObject(value) || isArray(value)" :data="value" />
      </div>
      <span v-if="isObject(value) && !collapsed[key]" class="ml-4">}</span>
      <span v-if="isArray(value) && !collapsed[key]" class="ml-4">]</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface JsonTreeProps {
  data: Record<string, any> | Array<any>
}

defineProps<JsonTreeProps>()

const collapsed = reactive<Record<string, boolean>>({})

const toggle = (key: string) => {
  collapsed[key] = !collapsed[key]
}

const isObject = (value: any): boolean => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

const isArray = (value: any): boolean => {
  return Array.isArray(value)
}
</script>

<style scoped>
.wrapper {
  @apply ml-4 border-neutral-400 border-l border-dotted;
}
.arrow-icon {
  @apply cursor-pointer ml-[-10px] transition-all duration-300;
  &.active {
    transform: rotate(-90deg);
  }
}
</style>
