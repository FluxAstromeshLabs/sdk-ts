<template>
  <div
    class="w-full overflow-x-auto transition-all duration-300"
    :class="{
      space: !isChildren
    }"
  >
    <div class="flex items-center">
      <div
        v-if="!isChildren && (isArray(data) || isObject(data))"
        @click="toggleRoot"
        class="arrow-icon"
        :class="{
          active: !collapsedRoot
        }"
      >
        <BaseIcons name="AngleDown" />
      </div>
      <span v-if="!isChildren && isArray(data)">[</span>
      <span v-if="!isChildren && isObject(data)">{</span>
      <span v-if="!collapsedRoot && !isChildren && isArray(data)">...]</span>
      <span v-if="!collapsedRoot && !isChildren && isObject(data)">...}</span>
    </div>

    <div
      v-if="collapsedRoot"
      v-for="(value, key) in data"
      :key="key"
      class="w-fit space"
      :class="{
        wrapper: !isChildren
      }"
    >
      <div
        :class="{
          space: !isChildren
        }"
      >
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
          <BaseJsonViewer v-if="isObject(value) || isArray(value)" :data="value" isChildren />
        </div>
        <span v-if="isObject(value) && !collapsed[key]" class="space">}</span>
        <span v-if="isArray(value) && !collapsed[key]" class="space">]</span>
      </div>
    </div>

    <span v-if="collapsedRoot && !isChildren && isArray(data)" class="space">]</span>
    <span v-if="collapsedRoot && !isChildren && isObject(data)" class="space">}</span>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface JsonTreeProps {
  data: Record<string, any> | Array<any>
  isChildren?: boolean
}

defineProps<JsonTreeProps>()

const collapsed = reactive<Record<string, boolean>>({})
const collapsedRoot = ref(true)
const toggleRoot = () => {
  collapsedRoot.value = !collapsedRoot.value
}
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
.space {
  margin-left: 16px;
}
.wrapper {
  @apply space border-neutral-400 border-l border-dotted;
}
.arrow-icon {
  @apply cursor-pointer ml-[-10px] transition-all duration-300;
  &.active {
    transform: rotate(-90deg);
  }
}
</style>
