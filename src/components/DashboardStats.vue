<template>
  <div class="dashboard-stats">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ totalTime }}</div>
          <div class="stat-label">學習時間</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-tachometer-alt"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ averageWPM }}</div>
          <div class="stat-label">平均 WPM</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-target"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ averageAccuracy }}%</div>
          <div class="stat-label">平均準確率</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-book-open"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ completedChapters }}</div>
          <div class="stat-label">完成章節</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import { dictionaries } from '../data/lessons'

const progressStore = useProgressStore()

const totalTime = computed(() => {
  const saved = localStorage.getItem('totalStudyTime') || '0'
  const minutes = Math.floor(parseInt(saved) / 60)
  return `${minutes}分`
})

const averageWPM = computed(() => {
  const saved = localStorage.getItem('averageWPM') || '0'
  return parseInt(saved)
})

const averageAccuracy = computed(() => {
  const saved = localStorage.getItem('averageAccuracy') || '100'
  return parseInt(saved)
})

const completedChapters = computed(() => {
  let total = 0
  Object.keys(dictionaries).forEach(dictKey => {
    const progress = progressStore.getDictProgress(dictKey, dictionaries[dictKey].chapters.length)
    total += progress.completed
  })
  return total
})
</script>

<style scoped>
.dashboard-stats {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px 0 rgba(60, 60, 120, 0.15);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #8faaff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}
</style>