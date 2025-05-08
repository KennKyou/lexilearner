<template>
  <div class="typing-container">
    <div class="lesson-selector">
      <select v-model="selectedLanguage" @change="handleLanguageChange">
        <option v-for="(lesson, key) in lessons" :key="key" :value="key">
          {{ lesson.name }}
        </option>
      </select>
      <select v-model="selectedTextIndex" @change="handleTextChange">
        <option v-for="(text, index) in currentTexts" :key="index" :value="index">
          {{ text.description }}
        </option>
      </select>
    </div>

    <div class="stats">
      <div class="stat-item">
        <span>WPM: {{ wpm }}</span>
      </div>
      <div class="stat-item">
        <span>準確率: {{ accuracy }}%</span>
      </div>
      <div class="stat-item">
        <span>時間: {{ timeElapsed }}秒</span>
      </div>
    </div>
    
    <div class="text-display">
      <span
        v-for="(char, index) in currentText"
        :key="index"
        :class="{
          'correct': index < currentIndex && char === userInput[index],
          'incorrect': index < currentIndex && char !== userInput[index],
          'current': index === currentIndex
        }"
      >
        {{ char }}
      </span>
    </div>

    <input
      ref="inputRef"
      v-model="userInput"
      class="typing-input"
      @input="handleInput"
      :disabled="isFinished"
      placeholder="開始輸入..."
    />

    <div class="controls">
      <button @click="restart" class="restart-btn">重新開始</button>
      <button @click="nextText" class="next-btn" :disabled="!isFinished">下一個</button>
    </div>

    <div v-if="isFinished" class="result">
      <h3>練習完成！</h3>
      <p>WPM: {{ wpm }}</p>
      <p>準確率: {{ accuracy }}%</p>
      <p>時間: {{ timeElapsed }}秒</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { lessons } from '../data/lessons'

// 狀態
const selectedLanguage = ref('javascript')
const selectedTextIndex = ref(0)
const userInput = ref('')
const currentIndex = ref(0)
const startTime = ref(null)
const isFinished = ref(false)
const timer = ref(null)

// 計算屬性
const currentTexts = computed(() => lessons[selectedLanguage.value].texts)
const currentText = computed(() => currentTexts.value[selectedTextIndex.value].text)

const wpm = computed(() => {
  if (!startTime.value) return 0
  const timeElapsed = (Date.now() - startTime.value) / 1000 / 60 // 轉換為分鐘
  const words = userInput.value.length / 5 // 假設一個單詞平均5個字符
  return Math.round(words / timeElapsed)
})

const accuracy = computed(() => {
  if (currentIndex.value === 0) return 100
  const correctChars = currentText.value
    .slice(0, currentIndex.value)
    .split('')
    .filter((char, index) => char === userInput.value[index]).length
  return Math.round((correctChars / currentIndex.value) * 100)
})

const timeElapsed = computed(() => {
  if (!startTime.value) return 0
  return Math.floor((Date.now() - startTime.value) / 1000)
})

// 方法
const handleInput = () => {
  if (!startTime.value) {
    startTime.value = Date.now()
    startTimer()
  }

  if (userInput.value.length > currentIndex.value) {
    currentIndex.value++
  } else if (userInput.value.length < currentIndex.value) {
    currentIndex.value--
  }

  if (currentIndex.value === currentText.value.length) {
    isFinished.value = true
    stopTimer()
  }
}

const handleLanguageChange = () => {
  selectedTextIndex.value = 0
  restart()
}

const handleTextChange = () => {
  restart()
}

const restart = () => {
  userInput.value = ''
  currentIndex.value = 0
  startTime.value = null
  isFinished.value = false
  stopTimer()
}

const nextText = () => {
  if (selectedTextIndex.value < currentTexts.value.length - 1) {
    selectedTextIndex.value++
  } else {
    selectedTextIndex.value = 0
  }
  restart()
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

// 生命週期鉤子
onMounted(() => {
  const inputRef = document.querySelector('.typing-input')
  if (inputRef) {
    inputRef.focus()
  }
})

// 監聽器
watch(isFinished, (newValue) => {
  if (newValue) {
    stopTimer()
  }
})
</script>

<style scoped>
.typing-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.lesson-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.lesson-selector select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.text-display {
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  word-break: break-all;
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.correct {
  color: var(--success-color);
}

.incorrect {
  color: var(--error-color);
  text-decoration: underline;
}

.current {
  background-color: #e0e0e0;
}

.typing-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 4px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.restart-btn,
.next-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.restart-btn:hover,
.next-btn:hover {
  background-color: var(--primary-hover);
}

.next-btn:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
}

.result {
  margin-top: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.result h3 {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.result p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}
</style> 