import { createRouter, createWebHistory } from 'vue-router'
import TypingView from '../views/TypingView.vue'
import VocabularyView from '../views/VocabularyView.vue'
import DictionaryView from '../views/DictionaryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dictionary'
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: DictionaryView
    },
    {
      path: '/vocabulary/:dict/:chapter',
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
