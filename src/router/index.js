import { createRouter, createWebHistory } from 'vue-router'
import TypingView from '../views/TypingView.vue'
import VocabularyView from '../views/VocabularyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vocabulary',
      component: VocabularyView
    },
    {
      path: '/typing',
      name: 'typing',
      component: TypingView
    }
  ]
})

export default router
