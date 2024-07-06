import { ref } from 'vue'
import { defineStore } from 'pinia'

export enum ThemeColor {
  neutral = 'neutral',
  blueGray = 'blueGray'
}
export const useTheme = defineStore('ThemeStore', () => {
  const store = ref({
    dark: false,
    primaryColor: ThemeColor.blueGray
  })
  const setColor = (color: ThemeColor) => {
    document.body.classList.remove(store.value.primaryColor)
    store.value.primaryColor = color
    document.body.classList.add(color)
  }
  return { store, setColor }
})
