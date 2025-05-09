<template>
  <div class="error-book-container">
    <nav class="top-nav">
      <div class="nav-section">
        <button class="back-btn" @click="router.push('/')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>錯字本</h2>
      </div>
      <div class="nav-section">
        <button class="theme-toggle" @click="toggleTheme">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>

    <main class="error-book-content">
      <div v-if="errorWords.length === 0" class="empty-state">
        <i class="fas fa-book-open"></i>
        <p>目前還沒有錯誤記錄</p>
      </div>
      <div v-else class="error-words-list">
        <div v-for="(word, index) in errorWords" :key="index" class="error-word-card">
          <div class="word-info">
            <div class="word-text">{{ word.text }}</div>
            <div class="word-translation">
              <div v-if="Array.isArray(word.translation)" v-for="(trans, index) in word.translation" :key="index" class="trans-item">
                {{ trans }}
              </div>
              <div v-else class="trans-item">
                {{ word.translation }}
              </div>
            </div>
          </div>
          <div class="error-count">
            <i class="fas fa-times-circle"></i>
            <span>{{ word.errorCount }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const errorWords = ref([])
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

onMounted(() => {
  const storedErrorWords = localStorage.getItem('errorWords')
  if (storedErrorWords) {
    errorWords.value = JSON.parse(storedErrorWords)
  }
})
</script>

<style scoped>
.error-book-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  color: var(--text);
  --nav-height: 60px;
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
  max-width: 1400px;
}

.nav-section {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.back-btn {
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

.back-btn:hover {
  background: var(--primary);
  color: #fff;
}

.theme-toggle {
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

.error-book-content {
  margin-top: calc(var(--nav-height) + 60px);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-words-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 85vh;
  overflow-y: auto;
  max-width: 1600px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 2rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.error-words-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.error-word-card {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.word-info {
  flex: 1;
}

.word-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.word-phonetic {
  color: var(--text-secondary);
  font-family: monospace;
  margin-bottom: 0.5rem;
}

.word-translation {
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.trans-item {
  line-height: 1.4;
}

.error-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #F44336;
  font-size: 1.2rem;
  font-weight: bold;
}

.error-count i {
  font-size: 1.5rem;
}
</style> 