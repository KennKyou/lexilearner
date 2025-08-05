<template>
  <div class="quick-actions">
    <h3 class="section-title">快速功能</h3>
    <div class="actions-grid">
      <div class="action-card" @click="$router.push('/stats')">
        <div class="action-icon">
          <i class="fas fa-chart-bar"></i>
        </div>
        <div class="action-content">
          <div class="action-title">學習統計</div>
          <div class="action-desc">查看詳細的學習數據</div>
        </div>
        <div class="action-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>

      <div class="action-card" @click="$router.push('/error-book')">
        <div class="action-icon error">
          <i class="fas fa-book"></i>
        </div>
        <div class="action-content">
          <div class="action-title">錯字本</div>
          <div class="action-desc">{{ errorWordsCount }} 個錯字待複習</div>
        </div>
        <div class="action-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>

      <div class="action-card" @click="$router.push('/settings')">
        <div class="action-icon settings">
          <i class="fas fa-cog"></i>
        </div>
        <div class="action-content">
          <div class="action-title">設定</div>
          <div class="action-desc">個人化設定與資料備份</div>
        </div>
        <div class="action-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>

      <div class="action-card theme-card" @click="themeStore.toggleTheme">
        <div class="action-icon theme">
          <i :class="themeStore.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </div>
        <div class="action-content">
          <div class="action-title">主題切換</div>
          <div class="action-desc">{{ themeStore.theme === 'dark' ? '切換至淺色主題' : '切換至深色主題' }}</div>
        </div>
        <div class="action-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const themeStore = useThemeStore()

const errorWordsCount = computed(() => {
  const storedErrorWords = localStorage.getItem('errorWords')
  if (!storedErrorWords) return 0
  return JSON.parse(storedErrorWords).length
})
</script>

<style scoped>
.quick-actions {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--text);
  margin-bottom: 1rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.action-card {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px 0 rgba(60, 60, 120, 0.15);
}

.action-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #8faaff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
}

.action-icon.error {
  background: linear-gradient(135deg, #F44336, #ff6b6b);
}

.action-icon.settings {
  background: linear-gradient(135deg, #4CAF50, #81C784);
}

.action-icon.theme {
  background: linear-gradient(135deg, #FF9800, #FFB74D);
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.action-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.action-arrow {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.theme-card {
  border: 2px solid transparent;
  background: linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
              linear-gradient(135deg, var(--primary), #8faaff) border-box;
}
</style>