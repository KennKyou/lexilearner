<template>
  <div class="completion-modal">
    <div class="modal-content">
      <div class="chapter-info">
        <span class="dict-name">{{ dictName }}</span>
        <span class="chapter-name">{{ chapterName }}</span>
      </div>

      <div v-if="errorWords.length > 0" class="error-words">
        <h4>需要加強的單字</h4>
        <div class="word-list">
          <div v-for="(word, index) in errorWords" :key="index" class="word-item">
            <div class="word-text">{{ word.text }}</div>
            <!-- <div class="word-phonetic">[{{ word.phonetic }}]</div>
            <div class="word-translation">{{ word.translation }}</div> -->
          </div>
        </div>
      </div>

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
  },
  dictName: {
    type: String,
    required: true
  },
  chapterName: {
    type: String,
    required: true
  },
  errorWords: {
    type: Array,
    default: () => []
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
  max-width: 600px;
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
  margin-bottom: 1rem;
}

.chapter-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  border-radius: var(--border-radius);
}

.dict-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text);
}

.chapter-name {
  font-size: 1rem;
  color: var(--text-secondary);
}

.error-words {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--bg);
  border-radius: var(--border-radius);
}

.error-words h4 {
  color: var(--primary);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.word-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

/* Webkit (Chrome, Safari, Edge) 滾動條樣式 */
.word-list::-webkit-scrollbar {
  width: 8px;
}

.word-list::-webkit-scrollbar-track {
  background: var(--bg);
  border-radius: 4px;
}

.word-list::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 4px;
  transition: background 0.2s;
}

.word-list::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark, var(--primary));
}

/* Firefox 滾動條樣式 */
.word-list {
  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--bg);
}

.word-item {
  background: var(--bg-card);
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius);
  text-align: left;
}

.word-text {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.word-phonetic {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
}

.word-translation {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
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