<template>
  <div class="mobile-intro">
    <div class="intro-container">
      <!-- 應用程式Logo和標題 -->
      <div class="app-header">
        <div class="app-logo">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <h1 class="app-title">LexiLearner</h1>
        <!--<p class="app-subtitle">智能單字學習平台</p>-->
      </div>

      <!-- 功能特色 -->
      <div class="features-section">
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-keyboard"></i>
            </div>
            <h3>打字練習</h3>
            <p>透過打字方式學習單字，提升記憶效果和打字速度</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>學習統計</h3>
            <p>詳細的學習紀錄，追蹤進度和弱點</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <h3>多元字典</h3>
            <p>涵蓋英語、日語等多種語言的豐富詞庫</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>錯字本</h3>
            <p>收集錯誤單字，針對性復習提升效率</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-moon"></i>
            </div>
            <h3>深淺色主題</h3>
            <p>護眼的深色模式，適應不同學習環境</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-cloud-download-alt"></i>
            </div>
            <h3>資料備份</h3>
            <p>學習記錄本地儲存，支援匯出備份</p>
          </div>
        </div>
      </div>

      <!-- 桌面端提示 -->
      <div class="desktop-notice">
        <div class="notice-card">
          <div class="notice-icon">
            <i class="fas fa-desktop"></i>
          </div>
          <div class="notice-content">
            <h3>最佳體驗在桌面端</h3>
            <p>LexiLearner 專為桌面環境設計，提供完整的鍵盤打字學習體驗。</p>
            <p>請使用電腦或以平板連接鍵盤以獲得最佳學習效果。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以在這裡添加一些互動邏輯
</script>

<style scoped>
.mobile-intro {
  min-height: 100vh;
  background: linear-gradient(135deg, 
    var(--primary) 0%, 
    #8faaff 50%, 
    var(--primary-dark) 100%);
  color: white;
  overflow-y: auto;
}

.intro-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.app-header {
  text-align: center;
  padding: 2rem 0;
}

.app-logo {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.app-logo i {
  font-size: 3rem;
  color: white;
}

.app-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  margin: 0;
}

.features-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.feature-icon i {
  font-size: 1.5rem;
  color: white;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.feature-card p {
  opacity: 0.9;
  line-height: 1.6;
  margin: 0;
}

.notice-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.notice-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notice-icon i {
  font-size: 1.5rem;
  color: white;
}

.notice-content h3 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}

.notice-content p {
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.notice-content p:last-child {
  margin-bottom: 0;
}

.tech-section {
  margin-bottom: 3rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.tech-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
}

.tech-item i {
  font-size: 2rem;
  margin-bottom: 0.8rem;
  display: block;
}

.tech-item span {
  font-weight: 600;
  font-size: 0.9rem;
}

.footer-section {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.copyright {
  opacity: 0.8;
  margin-bottom: 1rem;
}

.links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.link {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.link:hover {
  opacity: 1;
  text-decoration: underline;
}

/* 移動端優化 */
@media (max-width: 600px) {
  .intro-container {
    padding: 1.5rem 1rem;
  }
  
  .app-title {
    font-size: 2.5rem;
  }
  
  .app-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .notice-card {
    flex-direction: column;
    text-align: center;
  }
  
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .links {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>