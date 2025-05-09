import { createRouter, createWebHistory } from 'vue-router'
import VocabularyView from '../views/VocabularyView.vue'
import DictionaryView from '../views/DictionaryView.vue'
import ErrorBookView from '../views/ErrorBookView.vue'
import StatsView from '../views/StatsView.vue'

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
      path: '/error-book',
      name: 'error-book',
      component: ErrorBookView
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView
    }
  ]
})

export default router
