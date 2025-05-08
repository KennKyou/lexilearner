<template>
  <div class="vocabulary-container">
    <div v-if="showOverlay" class="overlay-blur">
      <div class="overlay-text">{{ overlayText }}</div>
    </div>
    <nav class="top-nav">
      <div class="nav-section">
        <button class="dict-btn" @click="router.push('/dictionary')">
          {{ currentDictionary ? currentDictionary.name : '選擇字典' }}
        </button>
        <select
          v-if="currentDictionary"
          class="chapter-select"
          v-model="chapterIdxLocal"
          @change="onChapterChange"
        >
          <option v-for="(chapter, idx) in currentDictionary.chapters" :key="idx" :value="idx">
            {{ chapter.name }}
          </option>
        </select>
      </div>
      <div class="nav-section">
        <PhoneticSelector
          v-if="currentWord"
          v-model:phonetic="selectedPhonetic"
        />
        <button class="theme-toggle" @click="toggleTheme">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>

    <main class="typing-area" v-if="currentWord" @keydown="handleKeyDown" ref="typingArea">
      <div class="word-display">
        <div class="target-word" :class="{ 'error-shake': isError }">
          <span
            v-for="(char, index) in currentWord.text"
            :key="index"
            :class="{
              'correct': index < userInput.length && char === userInput[index],
              'error': index < userInput.length && char !== userInput[index],
              'current': index === userInput.length,
              'upcoming': index > userInput.length,
              'space': char === ' ',
              'hyphen': char === '-',
              'number': /[0-9]/.test(char)
            }"
          >
            {{ char === ' ' ? '␣' : char }}
          </span>
        </div>
        <div class="phonetic">
          <span class="phonetic-item" v-if="selectedPhonetic === 'uk'">
            <span class="label">BrE:</span>
            <span class="phonetic-text">[{{ currentWord.ukphone }}]</span>
          </span>
          <span class="phonetic-item" v-if="selectedPhonetic === 'us'">
            <span class="label">AmE:</span>
            <span class="phonetic-text">[{{ currentWord.usphone }}]</span>
          </span>
        </div>
        <div class="translation">
          <div v-if="Array.isArray(currentWord.translation)" v-for="(trans, index) in currentWord.translation" :key="index" class="trans-item">
            {{ trans }}
          </div>
          <div v-else class="trans-item">
            {{ currentWord.translation }}
          </div>
        </div>
      </div>
    </main>

    <StatsDisplay
      v-if="currentWord"
      :wpm="wpm"
      :accuracy="accuracy"
      :time-elapsed="timeElapsed"
      :total-input="totalInputCount"
      :correct-input="correctInputCount"
      :is-finished="isFinished"
      @restart="restart"
      @next="nextChapter"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dictionaries } from '../data/lessons'
import PhoneticSelector from '../components/PhoneticSelector.vue'
import StatsDisplay from '../components/StatsDisplay.vue'
import { useStatsStore } from '../stores/counter'

const route = useRoute()
const router = useRouter()

const selectedPhonetic = ref('us')
const userInput = ref('')
const completedCount = ref(0)
const totalAttempts = ref(0)
const typingArea = ref(null)
const isError = ref(false)
const startTime = ref(null)
const isFinished = ref(false)
const timer = ref(null)
const totalInputCount = ref(0)
const correctInputCount = ref(0)
const isStarted = ref(false)
const isPaused = ref(false)
const pauseTime = ref(0)
const totalPausedDuration = ref(0)
const forceUpdate = ref(0)
let intervalId = null
let updateInterval = null

const dictKey = computed(() => route.params.dict)
const chapterIdx = computed(() => Number(route.params.chapter))
const currentDictionary = computed(() => dictKey.value ? dictionaries[dictKey.value] : null)
const currentChapter = computed(() => (chapterIdx.value >= 0 && currentDictionary.value) ? currentDictionary.value.chapters[chapterIdx.value] : null)
const currentWordIndex = ref(0)
const currentWord = computed(() => currentChapter.value?.words[currentWordIndex.value])

const statsStore = useStatsStore()

const accuracy = computed(() => statsStore.accuracy)
const wpm = computed(() => statsStore.wpm)
const timeElapsed = computed(() => statsStore.timeElapsed)
const showOverlay = computed(() => {
  if (!currentDictionary.value || !currentChapter.value) return false
  return !statsStore.isStarted || statsStore.isPaused
})
const overlayText = computed(() => {
  if (!statsStore.isStarted) return '輸入任意按鍵開始'
  if (statsStore.isPaused) return '輸入任意按鍵繼續'
  return ''
})

// 主題切換
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

// 方法
const handleKeyDown = (event) => {
  if (showOverlay.value) {
    if (!statsStore.isStarted) {
      statsStore.start()
    } else if (statsStore.isPaused) {
      statsStore.resume()
    }
    event.preventDefault()
    return
  }
  if (event.key === 'Enter') {
    statsStore.pause()
    event.preventDefault()
    return
  }
  if (!statsStore.isStarted || statsStore.isPaused || statsStore.isFinished || !currentWord.value) return

  if (!statsStore.startTime) {
    statsStore.start()
  }

  if (event.key === ' ') {
    const currentInput = userInput.value
    const targetWord = currentWord.value.text
    if (currentInput.length < targetWord.length && targetWord[currentInput.length] === ' ') {
      userInput.value += ' '
      statsStore.incrementInput(true)
      if (userInput.value === targetWord) {
        setTimeout(() => { nextWord() }, 300)
      }
    } else {
      statsStore.incrementInput(false)
      userInput.value = ''
      isError.value = true
      setTimeout(() => { isError.value = false }, 300)
    }
    return
  }

  if (event.key === '-') {
    const currentInput = userInput.value
    const targetWord = currentWord.value.text
    if (currentInput.length < targetWord.length && targetWord[currentInput.length] === '-') {
      userInput.value += '-'
      statsStore.incrementInput(true)
      if (userInput.value === targetWord) {
        setTimeout(() => { nextWord() }, 300)
      }
    } else {
      statsStore.incrementInput(false)
      userInput.value = ''
      isError.value = true
      setTimeout(() => { isError.value = false }, 300)
    }
    return
  }

  const key = event.key
  if (key.length !== 1 || !/^[a-zA-Z0-9]$/.test(key)) return

  const currentInput = userInput.value
  const targetWord = currentWord.value.text

  if (currentInput.length < targetWord.length) {
    if (key === targetWord[currentInput.length]) {
      userInput.value += key
      statsStore.incrementInput(true)
      if (userInput.value === targetWord) {
        setTimeout(() => { nextWord() }, 300)
      }
    } else {
      statsStore.incrementInput(false)
      userInput.value = ''
      isError.value = true
      setTimeout(() => { isError.value = false }, 300)
    }
  }
}

const nextWord = () => {
  if (currentWordIndex.value < currentChapter.value.words.length - 1) {
    currentWordIndex.value++
  } else {
    statsStore.finish()
  }
  userInput.value = ''
}

const nextChapter = () => {
  if (chapterIdx.value < currentDictionary.value.chapters.length - 1) {
    router.push({ params: { dict: dictKey.value, chapter: chapterIdx.value + 1 } })
  } else {
    router.push({ params: { dict: dictKey.value, chapter: 0 } })
  }
  restart()
}

const restart = () => {
  userInput.value = ''
  currentWordIndex.value = 0
  statsStore.restart()
  selectedPhonetic.value = 'us'
}

const dictKeyLocal = ref(dictKey.value || '')
const chapterIdxLocal = ref(chapterIdx.value || 0)

watch(dictKey, (val) => { dictKeyLocal.value = val || '' })
watch(chapterIdx, (val) => { chapterIdxLocal.value = val || 0 })

const onDictChange = () => {
  if (dictKeyLocal.value && currentDictionary.value) {
    router.push({ name: 'vocabulary', params: { dict: dictKeyLocal.value, chapter: 0 } })
    statsStore.restart()
  }
}
const onChapterChange = () => {
  if (currentDictionary.value) {
    router.push({ name: 'vocabulary', params: { dict: dictKey.value, chapter: chapterIdxLocal.value } })
    statsStore.restart()
  }
}

const startUpdateInterval = () => {
  if (updateInterval) clearInterval(updateInterval)
  updateInterval = setInterval(() => {
    if (statsStore.isStarted && !statsStore.isPaused && !statsStore.isFinished) {
      statsStore.update()
    }
  }, 1000)
}

const stopUpdateInterval = () => {
  if (updateInterval) {
    clearInterval(updateInterval)
    updateInterval = null
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  startUpdateInterval()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  stopUpdateInterval()
})

watch(
  [
    () => statsStore.isStarted,
    () => statsStore.isPaused,
    () => statsStore.isFinished
  ],
  ([started, paused, finished]) => {
    if (started && !paused && !finished) {
      startUpdateInterval()
    } else {
      stopUpdateInterval()
    }
  }
)
</script>

<style scoped>
.vocabulary-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  color: var(--text);
}

.top-nav {
  height: var(--nav-height, 60px);
  background-color: var(--bg-card);
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  border-radius: var(--border-radius);
  width: 80%;
  /* max-width: 900px; */
}

.nav-section {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.typing-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  transition: background 0.3s, color 0.3s;
}

.word-display {
  text-align: center;
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  background-color: transparent;
  border-radius: var(--border-radius);
}

.target-word {
  font-size: 2.5rem;
  font-family: monospace;
  color: var(--text);
  margin-bottom: 1rem;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  line-height: 1.5;
  min-height: 3rem;
}

.target-word.error-shake {
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.target-word span {
  display: inline-block;
  padding: 0 2px;
}

.target-word span.correct {
  color: #4CAF50;
}

.target-word span.error {
  color: #F44336;
  text-decoration: underline;
}

.target-word span.current {
  /* background-color: #E3F2FD; */
  border-radius: 2px;
}

.target-word span.upcoming {
  color: var(--text-secondary);
}

.phonetic {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0.5rem 0;
  font-family: monospace;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.phonetic-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.phonetic-item .label {
  color: var(--text);
  font-weight: bold;
}

.phonetic-item .phonetic-text {
  color: var(--text-secondary);
}

.translation {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  text-align: left;
  padding: 0 1rem;
}

.trans-item {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.trans-item:last-child {
  margin-bottom: 0;
}

.overlay-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  backdrop-filter: blur(8px) brightness(1.1);
  background: rgba(255,255,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay-text {
  font-size: 2rem;
  color: var(--primary);
  background: var(--bg-card);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem 3rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
}

.theme-toggle {
  margin-left: 1.5rem;
  background: var(--bg-card);
  color: var(--primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: var(--shadow);
  font-size: 1.3rem;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-toggle:hover {
  background: var(--primary);
  color: #fff;
}

.back-btn {
  margin-right: 1.5rem;
  background: var(--bg-card);
  color: var(--primary);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.4rem 1.1rem;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.back-btn:hover {
  background: var(--primary);
  color: #fff;
}

.dict-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 10px;
  border: none;
  box-shadow: none;
  background: var(--bg-card);
  color: var(--text);
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s, color 0.2s;
}
.dict-btn:hover {
  background: var(--primary);
  color: #fff;
}
.chapter-select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--primary);
  background: var(--bg-card);
  color: var(--text);
  box-shadow: var(--shadow);
  cursor: pointer;
  min-width: 120px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
}
</style> 