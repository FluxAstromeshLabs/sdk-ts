<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue'
const attrs = useAttrs()
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const filteredAttrs = computed(() => {
  const filteredAttrs = { ...attrs }

  const classes = (filteredAttrs.class as string) || ''
  const defaultClasses: string[] = ['base-icon']

  // if (!classes.includes('cursor-')) {
  //   defaultClasses.push('cursor-pointer')
  // }

  if (!classes.includes('w-') && !classes.includes('h-') && !classes.includes('min-w-')) {
    defaultClasses.push(props.size)
  }
  return { ...attrs, class: [...defaultClasses, classes].join(' ') }
})

const dynamicComponent = defineAsyncComponent<Record<string, unknown>>(() => {
  let name = props.name
  //uppercase first letter
  name = name.charAt(0).toUpperCase() + name.slice(1)
  return new Promise((resolve, _reject) => {
    const comps = import.meta.glob('./**/*.vue')

    try {
      return comps[`./${name}.vue`]().then((component: any) => resolve(component.default))
    } catch (e) {
      return comps[`./Default.vue`]().then((component: any) => resolve(component.default))
      console.log({ e, name })
    }
  })
})
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <component v-bind="filteredAttrs" :is="dynamicComponent" />
</template>
