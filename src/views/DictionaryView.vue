<template>
  <div class="dictionary-view">
    <!-- 分類選擇器 -->
    <div class="category-selector">
      <button
        v-for="category in categories"
        :key="category"
        class="category-btn"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- 標籤選擇器 -->
    <div class="tag-selector" v-if="selectedCategory">
      <button
        class="tag-btn"
        :class="{ active: selectedTag === '' }"
        @click="selectedTag = ''"
      >
        全部
      </button>
      <button
        v-for="tag in categoryTags"
        :key="tag"
        class="tag-btn"
        :class="{ active: selectedTag === tag }"
        @click="selectedTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <!-- 字典列表 -->
    <div class="dictionary-list">
      <div
        v-for="(dict, key) in filteredDictionaries"
        :key="key"
        class="dictionary-card"
        @click="openModal(key)"
      >
        <div class="dict-title">{{ dict.name }}</div>
        <!-- <div class="dict-desc">{{ dict.description }}</div> -->
        <div class="dict-tag">{{ dict.tag }}</div>
        <div class="dict-count">{{ dict.totalWords }} 詞</div>
      </div>
    </div>

    <!-- 章節選擇 Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">{{ currentDict?.name }}</div>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        <div class="modal-info">
          <div>{{ currentDict?.chapters.length }} 章節</div>
          <div>共 {{ currentDict?.totalWords }} 詞</div>
          <div>{{ currentDict?.description }}</div>
        </div>
        <div class="chapter-list">
          <button
            v-for="(chapter, idx) in currentDict?.chapters"
            :key="idx"
            class="chapter-btn"
            @click="selectChapter(idx)"
          >
            {{ chapter.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { dictionaries } from '../data/lessons'

const showModal = ref(false)
const selectedDictKey = ref('')
const selectedCategory = ref('')
const selectedTag = ref('')
const router = useRouter()

// 獲取所有分類
const categories = computed(() => {
  const cats = new Set()
  Object.values(dictionaries).forEach(dict => {
    if (dict.cate) cats.add(dict.cate)
  })
  return Array.from(cats)
})

// 獲取當前分類下的所有標籤
const categoryTags = computed(() => {
  const tags = new Set()
  Object.values(dictionaries).forEach(dict => {
    if (dict.cate === selectedCategory.value && dict.tag) {
      tags.add(dict.tag)
    }
  })
  return Array.from(tags)
})

// 過濾字典
const filteredDictionaries = computed(() => {
  return Object.entries(dictionaries).reduce((acc, [key, dict]) => {
    if (dict.cate === selectedCategory.value && (!selectedTag.value || dict.tag === selectedTag.value)) {
      acc[key] = dict
    }
    return acc
  }, {})
})

// 初始化選擇第一個分類
if (categories.value.length > 0) {
  selectedCategory.value = categories.value[0]
}

const openModal = (key) => {
  selectedDictKey.value = key
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const currentDict = computed(() => dictionaries[selectedDictKey.value])

const selectChapter = (idx) => {
  showModal.value = false
  router.push({ name: 'vocabulary', params: { dict: selectedDictKey.value, chapter: idx } })
}
</script>

<style scoped>
.dictionary-view {
  min-height: 100vh;
  background: var(--bg);
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 1400px;
  padding: 0 2rem;
}

.category-btn {
  background: var(--bg-card);
  color: var(--text);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all 0.2s;
}

.category-btn.active {
  background: var(--primary);
  color: #fff;
}

.tag-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 1400px;
  padding: 0 2rem;
}

.tag-btn {
  background: var(--bg-card);
  color: var(--text-secondary);
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag-btn.active {
  background: var(--primary);
  color: #fff;
}

.dictionary-list {
  width: 100%;
  max-width: 1400px;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 1rem;
}

.dictionary-card {
  background: var(--bg-card);
  color: var(--text);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem 2.5rem;
  min-width: 220px;
  min-height: 120px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.dictionary-card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 8px 32px 0 rgba(60, 60, 120, 0.18);
}

.dict-title {
  font-size: 1.3rem;
  font-weight: bold;
}

.dict-desc {
  font-size: 1rem;
  color: var(--text-secondary);
}

.dict-tag {
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: bold;
}

.dict-count {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0.5rem;
  color: var(--text-secondary);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.12);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2.5rem 2rem 2rem 2rem;
  min-width: 420px;
  width: 960px;
  max-width: 960px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--primary);
}

.modal-info {
  font-size: 1.1rem;
  color: var(--text-secondary);
  display: flex;
  gap: 2rem;
}

.chapter-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--bg);
}

/* Webkit (Chrome, Safari, Edge) 滾動條樣式 */
.chapter-list::-webkit-scrollbar {
  width: 8px;
}

.chapter-list::-webkit-scrollbar-track {
  background: var(--bg);
  border-radius: 4px;
}

.chapter-list::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 4px;
  transition: background 0.2s;
}

.chapter-list::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark, var(--primary));
}

/* Firefox 滾動條樣式 */
.chapter-list {
  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--bg);
}

.chapter-btn {
  width: calc((100% - 80px) / 5);
  background: var(--chapter-card);
  color: var(--text);
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  /* box-shadow: var(--shadow); */
  transition: background 0.2s, color 0.2s;
}

.chapter-btn:hover {
  background: var(--primary);
  color: #fff;
}

@media (max-width: 1440px) {
  .category-selector,
  .tag-selector,
  .dictionary-list {
    max-width: 1200px;
  }
}

@media (max-width: 1240px) {
  .category-selector,
  .tag-selector,
  .dictionary-list {
    max-width: 900px;
  }
}

@media (max-width: 940px) {
  .category-selector,
  .tag-selector,
  .dictionary-list {
    max-width: 600px;
  }
}

@media (max-width: 640px) {
  .category-selector,
  .tag-selector,
  .dictionary-list {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .dictionary-list {
    grid-template-columns: 1fr;
  }
}
</style> 