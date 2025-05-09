import { defineStore } from 'pinia'

export const useExportDataStore = defineStore('exportData', {
  state: () => ({
    exportData: null
  }),

  actions: {
    exportAllData() {
      const data = {
        progress: JSON.parse(localStorage.getItem('progress') || '{}'),
        errorWords: JSON.parse(localStorage.getItem('errorWords') || '[]'),
        keyErrors: JSON.parse(localStorage.getItem('keyErrors') || '{}'),
        completedChapters: JSON.parse(localStorage.getItem('completedChapters') || '{}'),
        theme: localStorage.getItem('theme') || 'light',
        exportDate: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `lexilearner-backup.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },

    importData(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result)
            
            // 驗證資料格式
            if (!data.progress || !data.errorWords || !data.keyErrors || !data.completedChapters || !data.theme || !data.exportDate) {
              throw new Error('無效的備份檔案格式')
            }

            // 更新 localStorage
            localStorage.setItem('progress', JSON.stringify(data.progress))
            localStorage.setItem('errorWords', JSON.stringify(data.errorWords))
            localStorage.setItem('keyErrors', JSON.stringify(data.keyErrors))
            localStorage.setItem('completedChapters', JSON.stringify(data.completedChapters))
            localStorage.setItem('theme', data.theme)
            
            // 更新主題
            document.documentElement.setAttribute('data-theme', data.theme)
            
            this.exportData = data
            resolve(data)
          } catch (error) {
            reject(error)
          }
        }

        reader.onerror = () => {
          reject(new Error('讀取檔案失敗'))
        }

        reader.readAsText(file)
      })
    }
  }
}) 