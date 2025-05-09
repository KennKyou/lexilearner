import { defineStore } from 'pinia'

export const useErrorStatsStore = defineStore('errorStats', {
  state: () => ({
    keyErrors: {}
  }),

  actions: {
    recordError(key) {
      if (!this.keyErrors[key]) {
        this.keyErrors[key] = 0
      }
      this.keyErrors[key]++
      this.saveToLocalStorage()
    },

    resetStats() {
      this.keyErrors = {}
      this.saveToLocalStorage()
    },

    getErrorPercentage(key) {
      const totalErrors = Object.values(this.keyErrors).reduce((sum, count) => sum + count, 0)
      if (totalErrors === 0) return 0
      return (this.keyErrors[key] || 0) / totalErrors
    },

    saveToLocalStorage() {
      localStorage.setItem('keyErrors', JSON.stringify(this.keyErrors))
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem('keyErrors')
      if (stored) {
        this.keyErrors = JSON.parse(stored)
      }
    }
  }
}) 