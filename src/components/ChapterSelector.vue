<template>
  <div class="chapter-selector">
    <select v-model="selectedChapter" @change="handleChapterChange" class="chapter-select">
      <option value="">請選擇章節</option>
      <option v-for="(chapter, index) in chapters" :key="index" :value="index">
        {{ chapter.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  chapters: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:chapter'])

const selectedChapter = ref('')

const handleChapterChange = () => {
  emit('update:chapter', selectedChapter.value)
}

// 當章節列表改變時重置選擇
watch(() => props.chapters, () => {
  selectedChapter.value = ''
})
</script>

<style scoped>
.chapter-selector {
  position: relative;
}

.chapter-select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--primary);
  border-radius: var(--border-radius);
  background-color: var(--bg-card);
  color: var(--text);
  cursor: pointer;
  min-width: 100px;
  appearance: none;
  box-shadow: var(--shadow);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
  transition: background 0.3s, color 0.3s, border 0.3s;
}

.chapter-select:hover {
  border-color: var(--primary-dark);
}

.chapter-select:focus {
  outline: none;
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 2px rgba(91, 109, 250, 0.15);
}

.chapter-select option {
  padding: 0.5rem;
  background: var(--bg-card);
  color: var(--text);
}
</style> 