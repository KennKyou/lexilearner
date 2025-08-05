<template>
  <div class="recent-errors" v-if="recentErrors.length > 0">
    <div class="section-header">
      <div class="title-group">
        <div class="title-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div>
          <h3 class="section-title">最近錯字</h3>
          <p class="section-subtitle">檢視需要加強的單字</p>
        </div>
      </div>
      <button class="view-all-btn" @click="$router.push('/error-book')">
        <span>查看全部</span>
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
    
    <div class="errors-grid">
      <div 
        v-for="(error, index) in displayErrors" 
        :key="error.text"
        class="error-card"
        :class="`priority-${Math.min(error.errorCount, 3)}`"
        @click="$router.push('/error-book')"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="card-header">
          <div class="error-badge">
            <i class="fas fa-times-circle"></i>
            <span>{{ error.errorCount }}</span>
          </div>
          <div class="difficulty-indicator" :class="getDifficultyClass(error.errorCount)">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        
        <div class="card-content">
          <div class="error-word">
            {{ error.text }}
            <div class="word-underline"></div>
          </div>
          
          <div class="error-translation">
            <div v-if="Array.isArray(error.translation)" v-for="(trans, index) in error.translation.slice(0, 2)" :key="index" class="trans-item">
              <i class="fas fa-angle-right"></i>
              {{ trans }}
            </div>
            <div v-else class="trans-item">
              <i class="fas fa-angle-right"></i>
              {{ error.translation }}
            </div>
          </div>
        </div>
        
        <div class="card-footer">
          <div class="error-stats">
            <span class="stats-text">錯誤 {{ error.errorCount }} 次</span>
            <div class="progress-dots">
              <div 
                v-for="i in 5"
                :key="i"
                class="progress-dot"
                :class="{ active: i <= Math.min(error.errorCount, 5) }"
              ></div>
            </div>
          </div>
        </div>
        
        <div class="hover-overlay">
          <i class="fas fa-mouse-pointer"></i>
          <span>點擊複習</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="no-errors" v-else>
    <div class="no-errors-content">
      <div class="success-animation">
        <div class="success-circle">
          <i class="fas fa-check"></i>
        </div>
        <div class="success-particles">
          <div class="particle" v-for="i in 6" :key="i"></div>
        </div>
      </div>
      <div class="no-errors-text">
        <h4>完美表現！</h4>
        <p>目前沒有錯字記錄，繼續保持這個水準！</p>
      </div>
      <button class="start-practice-btn" @click="scrollToDictionaries">
        開始新的練習 <i class="fas fa-play"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const recentErrors = computed(() => {
  const storedErrorWords = localStorage.getItem('errorWords')
  if (!storedErrorWords) return []
  
  const errors = JSON.parse(storedErrorWords)
  // 按錯誤次數排序，取前6個
  return errors
    .sort((a, b) => b.errorCount - a.errorCount)
    .slice(0, 6)
})

const displayErrors = computed(() => {
  return recentErrors.value.slice(0, 4) // 顯示最多4個
})

const getDifficultyClass = (errorCount) => {
  if (errorCount >= 5) return 'high'
  if (errorCount >= 3) return 'medium'
  return 'low'
}

const scrollToDictionaries = () => {
  const dictionarySection = document.querySelector('.dictionary-section')
  if (dictionarySection) {
    dictionarySection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.recent-errors {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(255, 107, 107, 0.05));
  border-radius: var(--border-radius);
  border: 1px solid rgba(244, 67, 54, 0.2);
}

.title-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #F44336, #E53935);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 20px rgba(244, 67, 54, 0.3);
}

.section-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.section-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
}

.view-all-btn {
  background: rgba(244, 67, 54, 0.1);
  color: #F44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  font-weight: 500;
}

.view-all-btn:hover {
  background: #F44336;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.3);
}

.errors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.error-card {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 0;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  overflow: hidden;
  position: relative;
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: rgba(244, 67, 54, 0.3);
}

.error-card.priority-1 {
  border-left: 4px solid #FFC107;
}

.error-card.priority-2 {
  border-left: 4px solid #FF9800;
}

.error-card.priority-3 {
  border-left: 4px solid #F44336;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 0.5rem;
}

.error-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(244, 67, 54, 0.1);
  color: #F44336;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.difficulty-indicator {
  display: flex;
  gap: 3px;
}

.difficulty-indicator .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-secondary);
  opacity: 0.3;
  transition: all 0.3s;
}

.difficulty-indicator.low .dot:nth-child(1) {
  background: #FFC107;
  opacity: 1;
}

.difficulty-indicator.medium .dot:nth-child(1),
.difficulty-indicator.medium .dot:nth-child(2) {
  background: #FF9800;
  opacity: 1;
}

.difficulty-indicator.high .dot {
  background: #F44336;
  opacity: 1;
}

.card-content {
  padding: 0.5rem 1.5rem;
}

.error-word {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--text);
  margin-bottom: 0.8rem;
  position: relative;
  display: inline-block;
}

.word-underline {
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #F44336, #FF9800);
  transition: width 0.3s ease;
}

.error-card:hover .word-underline {
  width: 100%;
}

.error-translation {
  margin-bottom: 1rem;
}

.trans-item {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.trans-item i {
  color: var(--primary);
  font-size: 0.7rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.error-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.progress-dots {
  display: flex;
  gap: 4px;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
  opacity: 0.3;
  transition: all 0.3s;
}

.progress-dot.active {
  background: #F44336;
  opacity: 1;
  transform: scale(1.2);
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(244, 67, 54, 0.9);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;
  font-weight: bold;
}

.error-card:hover .hover-overlay {
  opacity: 1;
}

.hover-overlay i {
  font-size: 1.5rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* No errors section */
.no-errors {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(129, 199, 132, 0.05));
  border-radius: var(--border-radius);
  padding: 4rem 2rem;
  box-shadow: var(--shadow);
  text-align: center;
  margin-bottom: 2rem;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.no-errors-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.success-animation {
  position: relative;
}

.success-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
  animation: successPulse 2s infinite;
}

@keyframes successPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 12px 40px rgba(76, 175, 80, 0.6); }
}

.success-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #4CAF50;
  border-radius: 50%;
  animation: float 3s infinite;
}

.particle:nth-child(1) { animation-delay: 0s; transform: rotate(0deg) translateX(50px); }
.particle:nth-child(2) { animation-delay: 0.5s; transform: rotate(60deg) translateX(50px); }
.particle:nth-child(3) { animation-delay: 1s; transform: rotate(120deg) translateX(50px); }
.particle:nth-child(4) { animation-delay: 1.5s; transform: rotate(180deg) translateX(50px); }
.particle:nth-child(5) { animation-delay: 2s; transform: rotate(240deg) translateX(50px); }
.particle:nth-child(6) { animation-delay: 2.5s; transform: rotate(300deg) translateX(50px); }

@keyframes float {
  0%, 100% { 
    opacity: 0; 
    transform: scale(0) translateX(50px); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1) translateX(60px); 
  }
}

.no-errors-text h4 {
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.no-errors-text p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  max-width: 400px;
}

.start-practice-btn {
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
}

.start-practice-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
}

.start-practice-btn i {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .errors-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .title-group {
    justify-content: center;
  }
  
  .view-all-btn {
    align-self: center;
  }
}
</style>