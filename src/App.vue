<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

const theme = ref('light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}
onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

<template>
  <div :data-theme="theme" class="app-container">
    <RouterView />
  </div>
</template>

<style>
:root {
  --primary: #5b6dfa;
  --primary-dark: #3a3f6e;
  --bg: #f7f8fc;
  --bg-card: #fff;
  --chapter-card: #f7f8fc;
  --text: #222;
  --text-secondary: #888;
  --shadow: 0 8px 32px 0 rgba(60, 60, 120, 0.10);
  --border-radius: 18px;
}
[data-theme='dark'] {
  --primary: #8faaff;
  --primary-dark: #22264c;
  --bg: #181a23;
  --bg-card: #23263a;
  --chapter-card: #2b2f48;
  --text: #f7f8fc;
  --text-secondary: #aaa;
  --shadow: 0 8px 32px 0 rgba(0,0,0,0.25);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', 'Noto Sans TC', Arial, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}

.app-container {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}

.theme-toggle {
  display: none;
}

[data-theme="dark"] .chapter-select, [data-theme="dark"] .phonetic-select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") !important;
}
</style>
