import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useStatsStore = defineStore('stats', () => {
  const startTime = ref(null)
  const isStarted = ref(false)
  const isPaused = ref(false)
  const pauseTime = ref(0)
  const totalPausedDuration = ref(0)
  const totalInputCount = ref(0)
  const correctInputCount = ref(0)
  const isFinished = ref(false)
  const currentTime = ref(Date.now())

  // 每秒更新當前時間
  if (typeof window !== 'undefined') {
    setInterval(() => {
      if (isStarted.value && !isPaused.value && !isFinished.value) {
        currentTime.value = Date.now()
      }
    }, 1000)
  }

  const timeElapsed = computed(() => {
    if (!startTime.value || !isStarted.value) return 0
    if (isPaused.value) {
      return Math.floor((pauseTime.value - startTime.value - totalPausedDuration.value) / 1000)
    }
    return Math.floor((currentTime.value - startTime.value - totalPausedDuration.value) / 1000)
  })

  const wpm = computed(() => {
    if (!startTime.value || !isStarted.value) return 0
    const seconds = isPaused.value
      ? (pauseTime.value - startTime.value - totalPausedDuration.value) / 1000
      : (currentTime.value - startTime.value - totalPausedDuration.value) / 1000
    if (seconds === 0) return 0
    return Math.round((correctInputCount.value / 5 / seconds) * 60)
  })

  const accuracy = computed(() => {
    if (totalInputCount.value === 0) return 100
    return Math.round((correctInputCount.value / totalInputCount.value) * 100)
  })

  function start() {
    startTime.value = Date.now()
    isStarted.value = true
    totalPausedDuration.value = 0
    isPaused.value = false
    currentTime.value = Date.now()
  }

  function pause() {
    isPaused.value = true
    pauseTime.value = Date.now()
  }

  function resume() {
    isPaused.value = false
    totalPausedDuration.value += Date.now() - pauseTime.value
    currentTime.value = Date.now()
  }

  function incrementInput(correct) {
    totalInputCount.value++
    if (correct) correctInputCount.value++
  }

  function finish() {
    isFinished.value = true
  }

  function restart() {
    startTime.value = null
    isStarted.value = false
    isPaused.value = false
    pauseTime.value = 0
    totalPausedDuration.value = 0
    totalInputCount.value = 0
    correctInputCount.value = 0
    isFinished.value = false
    currentTime.value = Date.now()
  }

  return {
    startTime,
    isStarted,
    isPaused,
    pauseTime,
    totalPausedDuration,
    totalInputCount,
    correctInputCount,
    isFinished,
    timeElapsed,
    wpm,
    accuracy,
    start,
    pause,
    resume,
    incrementInput,
    finish,
    restart
  }
})
