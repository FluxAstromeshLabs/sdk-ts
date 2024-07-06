<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
interface Suggestion {
  title: string
  value: string
}

const props = defineProps({
  suggestions: {
    type: Array as () => Array<Suggestion>,
    required: true,
    default: () => []
  },
  modalValue: String,
  inputClass: {
    type: String,
    default: ''
  },
  onChange: {
    type: Function,
    default: () => {}
  },
  value: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  }
})
const inputRef = ref<any>(null)
const show = ref(false)
const internalValue = ref('')
const emit = defineEmits(['update:modelValue'])
defineModel('modelValue')
const inputChange = (e: any) => {
  internalValue.value = e.target.value
}
const _suggestions = computed((): Array<Suggestion> => {
  return props.suggestions.filter((suggestion: any) => {
    return suggestion.value.toLowerCase().includes(internalValue.value.toLowerCase())
  })
})

const focus = () => {
  show.value = true
}
const blur = () => {
  setTimeout(() => {
    show.value = false
    props.onChange && props.onChange(internalValue.value)
    emit('update:modelValue', internalValue.value)
  }, 150)
}
const select = (value: any) => {
  internalValue.value = value
  //   props.onChange && props.onChange(internalValue.value)
  //   emit('update:modelValue', value)
}
onMounted(() => {
  internalValue.value = props.value
})
watch(
  () => props,
  (value) => {
    if (props.value && props.value !== internalValue.value) {
      internalValue.value = props.value
    }
  },
  {
    deep: true
  }
)
</script>
<template>
  <div
    class="base-text-field relative"
    :class="[errorMessage ? 'invalid' : '', containerClass].join(' ')"
  >
    <p class="label flex gap-1" :class="labelClass" v-if="label">
      {{ label }}
    </p>
    <div class="input !p-0" :class="class">
      <input
        type="text"
        class="h-[48px] px-4"
        v-bind="$attrs"
        ref="inputRef"
        :class="inputClass"
        :value="internalValue"
        @input="inputChange"
        @focus="focus"
        @blur="blur"
      />
      <BaseButton
        v-if="internalValue"
        :disabled="$attrs.disabled"
        size="xs"
        icon="close"
        @click="
          () => {
            inputChange({ target: { value: '' } })
            onChange && onChange(internalValue)
          }
        "
        style="right: 0.5rem"
      />
    </div>

    <div v-if="show && _suggestions.length" class="list">
      <div
        class="item"
        v-for="suggestion in _suggestions"
        :key="suggestion.value"
        :title="suggestion.title"
        @click="select(suggestion.value)"
      >
        {{ suggestion.title }}
      </div>
    </div>
    <p v-if="errorMessage" class="message">{{ errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
.neutral {
  .list {
    @apply bg-neutral-900;
  }
}
.list {
  @apply bg-blueGray-800 shadow-lg border border-blueGray-light-100 border-t-0 p-2 rounded-xl max-h-[250px] absolute overflow-auto z-[2] w-full;
}
.item {
  @apply cursor-pointer hover:bg-blueGray-light-300 p-2 w-fit min-w-full;
}
</style>
