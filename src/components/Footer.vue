<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <a href="https://github.com/yourusername/lexilearner" target="_blank" rel="noreferrer noopener" class="footer-link" title="GitHub">
          <i class="fab fa-github"></i>
        </a>
      </div>

      <div class="footer-section">
        <a href="mailto:ken@kyoudesu.com" class="footer-link" target="_blank" rel="noreferrer noopener" title="發送電子郵件至 ken@kyoudesu.com">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
      
      <div class="footer-section">
        <button type="button" class="footer-link" @click="showDonate = true" title="贊助我們">
          <i class="fas fa-coffee"></i>
        </button>
      </div>

      <div class="footer-section">
        <button type="button" class="footer-link" @click="showDonate = true">@LexiLearner</button>
      </div>
    </div>

    <!-- 彈窗 -->
    <div v-if="showDonate" class="donate-modal" @click="showDonate = false">
      <div class="donate-modal-content" @click.stop>
        <button class="close-btn" @click="showDonate = false">&times;</button>
        <h3>支持 LexiLearner</h3>
        <p>如果你喜歡這個專案，歡迎贊助支持我們的開發！</p>
        <div class="donate-info">
          <p>Buy Me a Coffee：<a href="https://www.buymeacoffee.com/lexilearner" target="_blank">點我前往</a></p>
          <p>Email：ken@kyoudesu.com</p>
          <!-- 你可以在這裡放 QR code 或其他資訊 -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const showDonate = ref(false)
</script>

<style scoped>
.footer {
  color: var(--text);
  padding: 0.3rem
}

.footer-content {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.footer-section {
  display: flex;
  align-items: center;
}

.footer-section button {
  border: none;
  outline: none;
  background-color: unset;
  cursor: pointer;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s;
  background-color: unset;
}

.footer-link:hover {
  color: var(--primary);
}

/* 彈窗樣式 */
.donate-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.donate-modal-content {
  background: var(--bg-card);
  color: var(--text);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem 2.5rem;
  min-width: 300px;
  max-width: 90vw;
  position: relative;
  text-align: center;
}
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
}
.donate-info {
  margin-top: 1.2rem;
  font-size: 1.1rem;
}
.donate-info a {
  color: var(--primary);
  text-decoration: underline;
}
</style> 