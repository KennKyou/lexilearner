<template>
  <div class="stats-display">
    <div class="stats">
      <div class="stat-item">
        <span>時間：</span>
        <span>{{ timeElapsed }}秒</span>
      </div>
      <div class="stat-item">
        <span>WPM：</span>
        <span>{{ wpm }}</span>
      </div>
      <div class="stat-item">
        <span>輸入數：</span>
        <span>{{ totalInput }}</span>
      </div>
      <div class="stat-item">
        <span>正確數：</span>
        <span>{{ correctInput }}</span>
      </div>
      
      <div class="stat-item">
        <span>正確率：</span>
        <span>{{ accuracy }}%</span>
      </div>
      
    </div>

    <div v-if="isFinished" class="result">
      <h3>練習完成！</h3>
      <p>WPM：{{ wpm }}</p>
      <p>正確率：{{ accuracy }}%</p>
      <p>時間：{{ timeElapsed }}秒</p>
      <div class="controls">
        <button @click="$emit('restart')" class="restart-btn">重新開始</button>
        <button @click="$emit('next')" class="next-btn">下一章</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
  },
  totalInput: {
    type: Number,
    required: true
  },
  correctInput: {
    type: Number,
    required: true
  },
  isFinished: {
    type: Boolean,
    default: false
  }
})
defineEmits(['restart', 'next'])
</script>

<style scoped>
.stats-display {
  width: 80%;
  position: fixed;
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

.result {
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--bg-card);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}

.result h3 {
  margin-bottom: 1rem;
  color: var(--primary);
}

.result p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.restart-btn,
.next-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: var(--primary);
  color: var(--bg-card);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.restart-btn:hover,
.next-btn:hover {
  background-color: var(--primary-dark);
  color: #fff;
}
</style> 