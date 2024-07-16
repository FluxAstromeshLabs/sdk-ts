<script lang="ts" setup>
import { watch, onMounted, ref, onBeforeUnmount } from 'vue'
type TabType = 'horizontal' | 'vertical'
const props = defineProps({
  modelValue: Number,
  items: {
    type: Array<any>,
    default: () => []
  },
  type: {
    type: String as () => TabType,
    default: 'horizontal'
  },
  itemClass: {
    type: String,
    default: ''
  }
})
defineModel('modelValue')
const emit = defineEmits(['update:modelValue'])
const position = ref('0px')
const width = ref('0px')
const top = ref('0px')
const indexActive = ref(props.modelValue || 0)
const ids = ref<Array<string>>([])
const onActive = (index: number) => {
  // if (index === indexActive.value) return
  indexActive.value = index
  const element = document.getElementById(ids.value[index])
  if (!element) return
  const rect = element?.getBoundingClientRect()
  position.value = element.offsetLeft + 'px'
  width.value = rect.width + 'px'
  if (props.type === 'vertical') {
    top.value = element.offsetTop + rect.height + 'px'
  }
  emit('update:modelValue', index)
}
const initId = (index: number) => {
  if (ids.value[index]) {
    return ids.value[index]
  }
  const id = Math.random().toString(36).substr(2, 9)
  ids.value[index] = id
  return id
}
let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  let index = props.modelValue || 0
  resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width } = entry.contentRect
      if (width > 0 && entry.target.id === ids.value[indexActive.value]) {
        onActive(indexActive.value)
      }
    }
  })
  ids.value.forEach((id, index) => {
    const element = document.getElementById(id)
    if (element) {
      resizeObserver?.observe(element)
    }
  })

  setTimeout(() => {
    onActive(index)
  }, 200)
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

watch(props, (_props) => {
  if ((_props.modelValue == 0 || _props.modelValue) && _props.modelValue !== indexActive.value) {
    onActive(_props.modelValue)
  }
})
</script>
<template>
  <div class="tabs" :class="type">
    <div
      v-for="(tab, index) in items"
      :key="index"
      class="tabs_item"
      :class="[indexActive === index ? 'active' : '', itemClass].join(' ')"
      @click="onActive(index)"
      :id="initId(index)"
    >
      <template v-if="typeof tab === 'object'">
        <div class="icon">
          <BaseIcons :name="tab?.icon" v-if="tab?.icon" />
        </div>
        {{ tab?.title }}
      </template>
      <template v-if="typeof tab === 'string'">
        {{ tab }}
      </template>
    </div>
    <div class="active-border" :class="type" />
  </div>
</template>
<style scoped>
.active-border {
  left: v-bind('position');
  transition: all 0.2s ease-in-out;
  width: v-bind('width');
}
.active-border.vertical {
  top: v-bind('top');
}
</style>
