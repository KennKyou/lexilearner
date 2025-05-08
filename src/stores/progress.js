import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProgressStore = defineStore('progress', () => {
  const completedChapters = ref(JSON.parse(localStorage.getItem('completedChapters') || '{}'))

  function completeChapter(dictKey, chapterIndex) {
    if (!completedChapters.value[dictKey]) {
      completedChapters.value[dictKey] = []
    }
    if (!completedChapters.value[dictKey].includes(chapterIndex)) {
      completedChapters.value[dictKey].push(chapterIndex)
      saveToLocalStorage()
    }
  }

  function isChapterCompleted(dictKey, chapterIndex) {
    return completedChapters.value[dictKey]?.includes(chapterIndex) || false
  }

  function getDictProgress(dictKey, totalChapters) {
    const completed = completedChapters.value[dictKey]?.length || 0
    return {
      completed,
      total: totalChapters,
      percentage: Math.round((completed / totalChapters) * 100)
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem('completedChapters', JSON.stringify(completedChapters.value))
  }

  return {
    completedChapters,
    completeChapter,
    isChapterCompleted,
    getDictProgress,
    saveToLocalStorage
  }
}) 