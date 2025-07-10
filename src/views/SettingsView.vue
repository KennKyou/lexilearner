<template>
  <div class="settings-container">
    <nav class="top-nav">
      <div class="nav-section">
        <button class="back-btn" @click="router.push('/')">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>設定</h2>
      </div>
      <div class="nav-section">
        <button 
          class="theme-toggle" 
          @click="themeStore.toggleTheme"
          :title="themeStore.theme === 'dark' ? '切換至淺色主題' : '切換至深色主題'"
          :aria-label="themeStore.theme === 'dark' ? '切換至淺色主題' : '切換至深色主題'"
        >
          <i :class="themeStore.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>
    </nav>

    <main class="settings-content">
      <div class="settings-section">
        <h3>學習設定</h3>
        <div class="settings-item">
          <div class="setting-info">
            <h4>忽略大小寫</h4>
            <p>開啟後，單字輸入時將不區分大小寫（例如：CD player 可以輸入成 cd player）</p>
          </div>
          <div class="toggle-container">
            <label class="toggle-switch">
              <input 
                type="checkbox" 
                v-model="settingsStore.ignoreCase"
              >
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3>資料備份</h3>
        <div class="backup-description">
          <p>本應用程式的學習資料（包含學習進度、錯字本、統計和主題設定）是儲存在您的瀏覽器本地儲存空間中。為了確保您的學習記錄不會因為以下情況而遺失：</p>
          <ul>
            <li>清除瀏覽器快取或資料</li>
            <li>更換瀏覽器或設備</li>
            <li>重新安裝作業系統</li>
          </ul>
          <p>建議您定期匯出並備份您的學習資料。</p>
          <div class="warning-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>為了確保資料的完整性，請勿手動修改匯出的備份檔案內容。不正確的檔案格式可能導致資料無法正確匯入。</p>
          </div>
        </div>
        
        <div class="backup-section">
          <div class="section-description">
            <h4>匯出資料</h4>
            <p>將您的學習進度、錯字本、統計和主題設定匯出為檔案。當您需要更換瀏覽器或設備時，可以使用此功能保存您的學習記錄。</p>
          </div>
          <button class="export-btn" @click="handleExport">
            <i class="fas fa-upload"></i>
            匯出資料
          </button>
        </div>

        <div class="backup-section">
          <div class="section-description">
            <h4>匯入資料</h4>
            <p>從之前匯出的備份檔案中恢復您的學習記錄。請確保匯入的檔案是從本應用程式匯出的備份檔案。</p>
          </div>
          <div class="import-section">
            <input
              type="file"
              ref="fileInput"
              accept=".json"
              style="display: none"
              @change="handleImport"
            >
            <button class="import-btn" @click="triggerFileInput">
              <i class="fas fa-download"></i>
              匯入資料
            </button>
          </div>
        </div>

        <div v-if="importMessage" :class="['import-message', importMessage.type]">
          {{ importMessage.text }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useExportDataStore } from '../stores/exportData'
import { useThemeStore } from '../stores/theme'
import { useSettingsStore } from '../stores/settings'

const router = useRouter()
const exportDataStore = useExportDataStore()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
const fileInput = ref(null)
const importMessage = ref(null)

const handleExport = () => {
  exportDataStore.exportAllData()
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    await exportDataStore.importData(file)
    importMessage.value = {
      type: 'success',
      text: '資料匯入成功！'
    }
  } catch (error) {
    importMessage.value = {
      type: 'error',
      text: error.message
    }
  }

  // 重置檔案輸入
  event.target.value = ''
  
  // 3秒後清除訊息
  setTimeout(() => {
    importMessage.value = null
  }, 3000)
}
</script>

<style scoped>
.settings-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  color: var(--text);
  --nav-height: 60px;
  --footer: 32px;
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

.settings-content {
  margin-top: calc(var(--nav-height) + 60px);
  padding: 0 2rem;
  max-height: calc(100vh - (var(--nav-height) + 60px) - (var(--footer)));
  overflow-y: auto;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.settings-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.settings-section {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow);
}

.settings-section h3 {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.backup-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg);
  border-radius: var(--border-radius);
}

.section-description {
  margin-bottom: 1rem;
}

.section-description h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.section-description p {
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 0.95rem;
}

.export-btn,
.import-btn {
  background: var(--bg-card);
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: var(--border-radius-10);
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
}

.export-btn:hover,
.import-btn:hover {
  background: var(--primary);
  color: #fff;
}

.import-message {
  margin-top: 1rem;
  padding: 0.8rem;
  border-radius: var(--border-radius-10);
  font-size: 0.9rem;
}

.import-message.success {
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.import-message.error {
  background: rgba(244, 67, 54, 0.1);
  color: #F44336;
}

.backup-description {
  margin-bottom: 2rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.backup-description p {
  margin-bottom: 1rem;
}

.backup-description ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.backup-description li {
  margin-bottom: 0.5rem;
}

.warning-message {
  background: rgba(255, 193, 7, 0.1);
  border-left: 4px solid #FFC107;
  padding: 1rem;
  border-radius: 0 var(--border-radius-10) var(--border-radius-10) 0;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-top: 1.5rem;
}

.warning-message i {
  color: #FFC107;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.warning-message p {
  margin: 0;
  color: var(--text);
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: var(--bg);
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
}

.setting-info h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.setting-info p {
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 0.95rem;
  margin: 0;
}

.toggle-container {
  flex-shrink: 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider:hover {
  opacity: 0.8;
}
</style> 