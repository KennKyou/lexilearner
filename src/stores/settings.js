import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const ignoreCase = ref(localStorage.getItem('ignoreCase') === 'true')

  // Watch for changes and update localStorage
  watch(ignoreCase, (newValue) => {
    localStorage.setItem('ignoreCase', newValue.toString())
  })

  function toggleIgnoreCase() {
    ignoreCase.value = !ignoreCase.value
  }

  return {
    ignoreCase,
    toggleIgnoreCase
  }
})