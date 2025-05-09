<template>
  <div class="stats-container">
    <nav class="top-nav">
      <div class="nav-section">
        <button class="back-btn" @click="router.push('/')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>統計</h2>
      </div>
      <div class="nav-section">
        <button 
          class="theme-toggle" 
          @click="toggleTheme"
          :title="theme === 'dark' ? '切換至淺色主題' : '切換至深色主題'"
          :aria-label="theme === 'dark' ? '切換至淺色主題' : '切換至深色主題'"
        >
          <i :class="theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>
    </nav>

    <main class="stats-content">
      <div class="keyboard-container">
        <div class="keyboard-row">
          <div v-for="key in ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']" 
               :key="key" 
               class="key"
               :style="getKeyStyle(key)">
            {{ key.toUpperCase() }}
            <div class="error-count" v-if="errorStatsStore.keyErrors[key]">
              {{ errorStatsStore.keyErrors[key] }}
            </div>
          </div>
        </div>
        <div class="keyboard-row">
          <div v-for="key in ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']" 
               :key="key" 
               class="key"
               :style="getKeyStyle(key)">
            {{ key.toUpperCase() }}
            <div class="error-count" v-if="errorStatsStore.keyErrors[key]">
              {{ errorStatsStore.keyErrors[key] }}
            </div>
          </div>
        </div>
        <div class="keyboard-row">
          <div v-for="key in ['z', 'x', 'c', 'v', 'b', 'n', 'm']" 
               :key="key" 
               class="key"
               :style="getKeyStyle(key)">
            {{ key.toUpperCase() }}
            <div class="error-count" v-if="errorStatsStore.keyErrors[key]">
              {{ errorStatsStore.keyErrors[key] }}
            </div>
          </div>
        </div>
      </div>

      <div class="stats-summary">
        <div class="total-errors">
          總錯誤次數：{{ totalErrors }}
        </div>
        <button 
          class="reset-btn" 
          @click="handleReset"
          :disabled="totalErrors === 0"
          title="重置統計"
          aria-label="重置統計"
        >
          <i class="fas fa-redo"></i>
          重置
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useErrorStatsStore } from '../stores/errorStats'

const router = useRouter()
const errorStatsStore = useErrorStatsStore()
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')

const totalErrors = computed(() => {
  return Object.values(errorStatsStore.keyErrors).reduce((sum, count) => sum + count, 0)
})

const getKeyStyle = (key) => {
  const percentage = errorStatsStore.getErrorPercentage(key)
  if (percentage === 0) return {}
  
  // 將百分比轉換為透明度（0.1 到 0.9 之間）
  const opacity = 0.1 + (percentage * 0.8)
  
  // 將 #5b6dfa 轉換為 RGB 值
  const r = 91  // 5b
  const g = 109 // 6d
  const b = 250 // fa
  
  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
    color: percentage > 0.5 ? '#fff' : 'var(--text)' // 當錯誤率超過 50% 時，文字改為白色
  }
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

const handleReset = () => {
  if (confirm('確定要重置所有錯誤統計嗎？')) {
    errorStatsStore.resetStats()
  }
}

onMounted(() => {
  errorStatsStore.loadFromLocalStorage()
})
</script>

<style scoped>
.stats-container {
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

.stats-content {
  margin-top: calc(var(--nav-height) + 60px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.keyboard-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
  background: var(--bg-card);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.keyboard-row {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.key {
  width: 60px;
  height: 60px;
  background: var(--bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  position: relative;
  box-shadow: var(--shadow);
  transition: all 0.3s;
}

.error-count {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.stats-summary {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.total-errors {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text);
}

.reset-btn {
  background: var(--bg-card);
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reset-btn:hover:not(:disabled) {
  background: var(--primary);
  color: #fff;
}

.reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-btn i {
  font-size: 1rem;
}
</style> 