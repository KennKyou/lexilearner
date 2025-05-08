<template>
  <div class="completion-modal">
    <div class="modal-content">
      <h3>練習完成！</h3>
      <div class="stats">
        <div class="stat-item">
          <span class="label">WPM</span>
          <span class="value">{{ wpm }}</span>
        </div>
        <div class="stat-item">
          <span class="label">正確率</span>
          <span class="value">{{ accuracy }}%</span>
        </div>
        <div class="stat-item">
          <span class="label">時間</span>
          <span class="value">{{ timeElapsed }}秒</span>
        </div>
      </div>
      <div class="controls">
        <button @click="$emit('restart')" class="restart-btn">重新開始</button>
        <button @click="$emit('next')" class="next-btn">下一章</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  wpm: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  },
  timeElapsed: {
    type: Number,
    required: true
  }
})

defineEmits(['restart', 'next'])
</script>

<style scoped>
.completion-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
}

.modal-content {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

h3 {
  color: var(--primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item .label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.stat-item .value {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: bold;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.restart-btn,
.next-btn {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  max-width: 150px;
}

.restart-btn:hover,
.next-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.next-btn {
  background: var(--bg-card);
  color: var(--primary);
  border: 1px solid var(--primary);
}

.next-btn:hover {
  background: var(--primary);
  color: #fff;
}
</style> 