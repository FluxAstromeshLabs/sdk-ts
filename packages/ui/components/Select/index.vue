<script setup lang="ts">
import { watch, ref, useAttrs, computed, onMounted, onBeforeUnmount } from 'vue'
import { Dropdown } from 'floating-vue'
import BaseChip from '../Chip/index.vue'
import CheckBox from '../Checkbox/index.vue'
import BaseIcons from '../Icons/index.vue'
interface Option {
  value: string
  title: string
  disabled?: boolean
  meta?: Record<string, unknown>
}
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String || Array,
  label: {
    type: String
  },
  placeholder: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  containerClass: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as () => Option[],
    default: () => []
  }
})
const $attrs = useAttrs()
const selectRef = ref(null)
const popoverWidth = ref('0px')
const dropdownAttrs = computed(() => ({
  ...$attrs,
  disabled: props.disabled
}))

let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  if (selectRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect
        popoverWidth.value = `${width}px`
      }
    })
    resizeObserver.observe(selectRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && selectRef.value) {
    resizeObserver.unobserve(selectRef.value)
  }
})

const internalValue = ref<Option | Array<Option> | null>(
  props.multiple
    ? Array.isArray(props.modelValue)
      ? props.options.filter((option) => props.modelValue?.includes(option.value))
      : []
    : props.options.find((option) => option.value === props.modelValue) || null
)
const handleSelect = (option: any) => {
  if (props.multiple && Array.isArray(internalValue.value)) {
    if (internalValue.value.some((item) => item.value === option.value)) {
      internalValue.value = internalValue.value.filter((item) => item.value !== option.value)
    } else {
      internalValue.value = [...internalValue.value, option]
    }
    return emit(
      'update:modelValue',
      internalValue.value.map((item) => item.value)
    )
  }
  internalValue.value = option
  emit('update:modelValue', option.value)
}

const isActive = (value: string) => {
  return Array.isArray(internalValue.value)
    ? Boolean(internalValue.value?.find((item) => item.value === value))
    : internalValue.value?.value === value
}
watch(
  () => props.modelValue,
  (value) => {
    // let _internalValue = props.modelValue
    //   ? Array.isArray(internalValue.value)
    //     ? internalValue.value.map((item) => item.value)
    //     : []
    //   : !Array.isArray(internalValue.value)
    //   ? internalValue.value?.value
    //   : null

    // if (JSON.stringify(_internalValue) === JSON.stringify(value)) return
    internalValue.value = props.multiple
      ? Array.isArray(value)
        ? props.options.filter((option) => props.modelValue?.includes(option.value))
        : []
      : props.options.find((option) => option.value === props.modelValue) || null
  }
)
</script>
<template>
  <div class="base-select" :class="[containerClass].join(' ')" ref="selectRef">
    <div class="label flex gap-2 items-center" :class="labelClass" v-if="label">
      {{ label }} <slot name="appendLabel" />
    </div>
    <Dropdown
      :disabled="disabled"
      :popperHideTriggers="(triggers) => (multiple ? triggers : [...triggers, 'click'])"
      :popperClass="`base-select__popover`"
    >
      <div class="select" v-bind="dropdownAttrs">
        <div class="flex-1 overflow-hidden">
          <p
            class="flex items-center"
            v-if="!internalValue || (Array.isArray(internalValue) && internalValue.length === 0)"
          >
            {{ placeholder }}
          </p>
          <p class="value" v-else-if="!Array.isArray(internalValue)">
            <slot name="prepend" v-if="$slots.prepend" :option="internalValue" />
            {{ internalValue?.title }}
          </p>
          <div v-else-if="Array.isArray(internalValue)" class="flex flex-wrap gap-2">
            <BaseChip
              v-for="item in internalValue"
              :key="item.value"
              :onDelete="() => handleSelect(item)"
              @click.stop
              >{{ item.title }}</BaseChip
            >
          </div>
        </div>
        <BaseIcons name="angleDown" />
      </div>
      <template #popper>
        <div
          :style="{ minWidth: popoverWidth }"
          class="content-popover"
          :class="multiple ? 'flex flex-col items-start' : ''"
        >
          <div
            v-if="!multiple"
            v-for="option in options"
            @click="handleSelect(option)"
            :key="option.value"
            class="content-popover__item"
            :class="[
              { ['disabled']: option.disabled },
              { ['content-popover__item--selected']: isActive(option.value) },
              'flex items-center'
            ]"
          >
            <slot v-if="$slots.prepend" name="prepend" :option="option" />
            {{ option.title }}
          </div>
          <CheckBox
            v-if="multiple"
            v-for="option in options"
            :key="option.value"
            :onChange="() => handleSelect(option)"
            :checked="isActive(option.value)"
            class="content-popover__item multiple"
            :class="[{ ['disabled']: option.disabled }]"
          >
          </CheckBox>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
