<template>
  <div class="dictionary-selector">
    <select v-model="selectedDictionary" @change="handleDictionaryChange">
      <option value="">請選擇字典</option>
      <option v-for="(dict, key) in dictionaries" :key="key" :value="key">
        {{ dict.name }} ({{ dict.totalWords }} 個單字)
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { dictionaries } from '../data/lessons'

const emit = defineEmits(['update:dictionary'])

const selectedDictionary = ref('')

const handleDictionaryChange = () => {
  emit('update:dictionary', selectedDictionary.value)
}
</script>

<style scoped>

.dictionary-selector select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.dictionary-selector select:focus {
  outline: none;
  border-color: var(--primary-color);
}
</style> 