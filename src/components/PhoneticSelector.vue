<template>
  <div class="phonetic-selector">
    <select v-model="selectedPhonetic" class="phonetic-select">
      <option value="us">美音</option>
      <option value="uk">英音</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const selectedPhonetic = ref('us')

const emit = defineEmits(['update:phonetic'])

watch(selectedPhonetic, (newValue) => {
  emit('update:phonetic', newValue)
})
</script>

<style scoped>
.phonetic-selector {
  position: relative;
}

.phonetic-select {
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

.phonetic-select:hover {
  border-color: var(--primary-dark);
}

.phonetic-select:focus {
  outline: none;
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 2px rgba(91, 109, 250, 0.15);
}
</style> 