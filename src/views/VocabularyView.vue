<template>
  <div class="vocabulary-container">
    <nav class="top-nav">
      <div class="nav-section">
        <DictionarySelector v-model:dictionary="selectedDictionary" />
        <ChapterSelector
          v-if="currentDictionary"
          :chapters="currentDictionary.chapters"
          v-model:chapter="selectedChapterIndex"
        />
      </div>
      <div class="nav-section">
        <PhoneticSelector
          v-if="currentWord"
          v-model:phonetic="selectedPhonetic"
        />
      </div>
    </nav>

    <main class="typing-area" v-if="currentWord" @keydown="handleKeyDown" tabindex="0" ref="typingArea">
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
      :current-index="currentWordIndex"
      :total-words="currentChapter.words.length"
      :is-finished="isFinished"
      @restart="restart"
      @next="nextChapter"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { dictionaries } from '../data/lessons'
import DictionarySelector from '../components/DictionarySelector.vue'
import ChapterSelector from '../components/ChapterSelector.vue'
import PhoneticSelector from '../components/PhoneticSelector.vue'
import StatsDisplay from '../components/StatsDisplay.vue'

// 狀態
const selectedDictionary = ref('')
const selectedChapterIndex = ref('')
const selectedPhonetic = ref('us')
const userInput = ref('')
const completedCount = ref(0)
const totalAttempts = ref(0)
const typingArea = ref(null)
const isError = ref(false)
const startTime = ref(null)
const isFinished = ref(false)
const timer = ref(null)

// 計算屬性
const currentDictionary = computed(() => 
  selectedDictionary.value ? dictionaries[selectedDictionary.value] : null
)
const currentChapter = computed(() => 
  selectedChapterIndex.value !== '' ? currentDictionary.value?.chapters[selectedChapterIndex.value] : null
)
const currentWordIndex = ref(0)
const currentWord = computed(() => currentChapter.value?.words[currentWordIndex.value])
const accuracy = computed(() => {
  if (totalAttempts.value === 0) return 100
  return Math.round((completedCount.value / totalAttempts.value) * 100)
})

const wpm = computed(() => {
  if (!startTime.value) return 0
  const timeElapsed = (Date.now() - startTime.value) / 1000 / 60 // 轉換為分鐘
  const words = completedCount.value
  return Math.round(words / timeElapsed)
})

const timeElapsed = computed(() => {
  if (!startTime.value) return 0
  return Math.floor((Date.now() - startTime.value) / 1000)
})

// 方法
const handleKeyDown = (event) => {
  if (!currentWord.value || isFinished.value) return

  if (!startTime.value) {
    startTime.value = Date.now()
    startTimer()
  }

  // 處理空格鍵
  if (event.key === ' ') {
    const currentInput = userInput.value
    const targetWord = currentWord.value.text
    if (currentInput.length < targetWord.length && targetWord[currentInput.length] === ' ') {
      userInput.value += ' '
      // 檢查是否完成當前單字
      if (userInput.value === targetWord) {
        completedCount.value++
        totalAttempts.value++
        setTimeout(() => {
          nextWord()
        }, 300)
      }
    } else {
      // 不該有空格的地方按了空格，顯示錯誤
      isError.value = true
      totalAttempts.value++
      userInput.value = ''
      setTimeout(() => {
        isError.value = false
      }, 300)
    }
    return
  }

  // 處理連字符
  if (event.key === '-') {
    const currentInput = userInput.value
    const targetWord = currentWord.value.text
    if (currentInput.length < targetWord.length && targetWord[currentInput.length] === '-') {
      userInput.value += '-'
      // 檢查是否完成當前單字
      if (userInput.value === targetWord) {
        completedCount.value++
        totalAttempts.value++
        setTimeout(() => {
          nextWord()
        }, 300)
      }
    } else {
      // 不該有連字符的地方按了連字符，顯示錯誤
      isError.value = true
      totalAttempts.value++
      userInput.value = ''
      setTimeout(() => {
        isError.value = false
      }, 300)
    }
    return
  }

  // 處理一般字母和數字
  const key = event.key
  // 忽略特殊按鍵，但允許空格、連字符、字母和數字
  if (key.length !== 1 || !/^[a-zA-Z0-9]$/.test(key)) return

  const currentInput = userInput.value
  const targetWord = currentWord.value.text
  
  if (currentInput.length < targetWord.length) {
    // 檢查輸入的字符是否正確（包括大小寫和數字）
    if (key === targetWord[currentInput.length]) {
      userInput.value += key
      
      // 檢查是否完成當前單字
      if (userInput.value === targetWord) {
        completedCount.value++
        totalAttempts.value++
        setTimeout(() => {
          nextWord()
        }, 300)
      }
    } else {
      // 打錯字符，顯示錯誤效果
      isError.value = true
      totalAttempts.value++
      userInput.value = ''
      setTimeout(() => {
        isError.value = false
      }, 300)
    }
  }
}

const nextWord = () => {
  if (currentWordIndex.value < currentChapter.value.words.length - 1) {
    currentWordIndex.value++
  } else {
    // 完成當前章節
    isFinished.value = true
    stopTimer()
  }
  userInput.value = ''
}

const nextChapter = () => {
  if (selectedChapterIndex.value < currentDictionary.value.chapters.length - 1) {
    selectedChapterIndex.value++
  } else {
    selectedChapterIndex.value = 0
  }
  restart()
}

const restart = () => {
  userInput.value = ''
  currentWordIndex.value = 0
  startTime.value = null
  isFinished.value = false
  completedCount.value = 0
  totalAttempts.value = 0
  selectedPhonetic.value = 'us'
  stopTimer()
  if (typingArea.value) {
    typingArea.value.focus()
  }
}

const startTimer = () => {
  timer.value = setInterval(() => {
    // 更新時間顯示
  }, 1000)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 監聽章節變化
watch(selectedChapterIndex, () => {
  restart()
})

onMounted(() => {
  if (typingArea.value) {
    typingArea.value.focus()
  }
})
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
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-radius: var(--border-radius);
  margin: 1.5rem auto 0 auto;
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
</style> 