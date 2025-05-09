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
        <button 
          class="theme-toggle" 
          @click="themeStore.toggleTheme"
          :title="themeStore.theme === 'dark' ? '切換至淺色主題' : '切換至深色主題'"
          :aria-label="themeStore.theme === 'dark' ? '切換至淺色主題' : '切換至深色主題'"
        >
          <i :class="themeStore.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>
    </nav>

    <main class="error-book-content">
      <div v-if="errorWords.length === 0" class="empty-state">
        <i class="fas fa-book-open"></i>
        <p>目前還沒有錯誤記錄</p>
      </div>
      <div v-else class="error-words-list">
        <div v-for="(word, index) in paginatedWords" :key="index" class="error-word-card">
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
            <div class="word-source">
              <i class="fas fa-book"></i>
              <span>{{ word.dictName }}</span>
            </div>
          </div>
          <div class="card-actions">
            <div class="error-count">
              <i class="fas fa-times-circle"></i>
              <span>{{ word.errorCount }}</span>
            </div>
            <button class="delete-btn" @click="deleteWord(index)" title="刪除">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="pagination">
          <button 
            class="page-btn" 
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="page-info">{{ currentPage }}/{{ totalPages }}</span>
          <button 
            class="page-btn" 
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const errorWords = ref([])
const themeStore = useThemeStore()
const currentPage = ref(1)
const itemsPerPage = 20

const totalPages = computed(() => Math.ceil(errorWords.value.length / itemsPerPage))

const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return errorWords.value.slice(start, end)
})

const deleteWord = (index) => {
  const start = (currentPage.value - 1) * itemsPerPage
  const actualIndex = start + index
  errorWords.value.splice(actualIndex, 1)
  localStorage.setItem('errorWords', JSON.stringify(errorWords.value))
  
  // 如果當前頁沒有單字了，且不是第一頁，則回到上一頁
  if (paginatedWords.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
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
  --footer: 32px;
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
  max-height: calc(100vh - (var(--nav-height) + 60px) - (var(--footer)));
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

.card-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.delete-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  color: #F44336;
  background: rgba(244, 67, 54, 0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg);
  padding-bottom: 1rem;
}

.page-btn {
  background: var(--bg-card);
  color: var(--primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: var(--shadow);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  background: var(--primary);
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 1.2rem;
  color: var(--text);
  min-width: 60px;
  text-align: center;
}

.word-source {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.word-source i {
  font-size: 0.9rem;
}
</style> 