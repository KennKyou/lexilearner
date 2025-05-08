<template>
  <div class="stats-display">
    <div class="stats">
      <div class="stat-item">
        <span>時間：</span>
        <span>{{ statsStore.timeElapsed }}秒</span>
      </div>
      <div class="stat-item">
        <span>WPM：</span>
        <span>{{ statsStore.wpm }}</span>
      </div>
      <div class="stat-item">
        <span>輸入數：</span>
        <span>{{ statsStore.totalInputCount }}</span>
      </div>
      <div class="stat-item">
        <span>正確數：</span>
        <span>{{ statsStore.correctInputCount }}</span>
      </div>
      <div class="stat-item">
        <span>正確率：</span>
        <span>{{ statsStore.accuracy }}%</span>
      </div>
    </div>

    
  </div>
</template>

<script setup>
import { useStatsStore } from '../stores/counter'
import { onMounted, onBeforeUnmount } from 'vue'


const statsStore = useStatsStore()

// 新增 interval 相關變數
let updateInterval = null

// 新增 startUpdateInterval 方法
const startUpdateInterval = () => {
  if (updateInterval) clearInterval(updateInterval)
  updateInterval = setInterval(() => {
    if (statsStore.isStarted && !statsStore.isPaused && !statsStore.isFinished) {
      statsStore.update()
    }
  }, 1000)
}

// 新增 stopUpdateInterval 方法
const stopUpdateInterval = () => {
  if (updateInterval) {
    clearInterval(updateInterval)
    updateInterval = null
  }
}

// 在 onMounted 中啟動 interval
onMounted(() => {
  startUpdateInterval()
})

// 在 onBeforeUnmount 中清除 interval
onBeforeUnmount(() => {
  stopUpdateInterval()
})

defineEmits(['restart', 'next'])
</script>

<style scoped>
.stats-display {
  width: 80%;
  max-width: 1400px;
  position: fixed;
  z-index: 10000;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.stats {
  display: flex;
  justify-content: space-around;
  font-size: 1.1rem;
  background: var(--bg-card);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1rem 0.5rem;
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}

.stat-item {
  text-align: center;
}

.stat-item span:first-child {
  color: var(--text-secondary);
  margin-right: 0.5rem;
}

.stat-item span:last-child {
  font-weight: bold;
  color: var(--primary);
}
</style> 