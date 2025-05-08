<template>
  <div class="dictionary-view">
    <div class="dictionary-list">
      <div
        v-for="(dict, key) in dictionaries"
        :key="key"
        class="dictionary-card"
        @click="openModal(key)"
      >
        <div class="dict-title">{{ dict.name }}</div>
        <div class="dict-desc">{{ dict.description }}</div>
        <div class="dict-count">{{ dict.totalWords }} 詞</div>
      </div>
    </div>

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
const router = useRouter()

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
  padding: 3rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dictionary-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}
.dictionary-card {
  background: var(--primary);
  color: #fff;
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
  opacity: 0.9;
}
.dict-count {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0.5rem;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.12);
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
  max-width: 90vw;
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
  margin-bottom: 0.5rem;
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
  margin-bottom: 1rem;
}
.chapter-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}
.chapter-btn {
  background: #f5f5f5;
  color: var(--primary-dark);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(60, 60, 120, 0.08);
  transition: background 0.2s, color 0.2s;
}
.chapter-btn:hover {
  background: var(--primary);
  color: #fff;
}
</style> 