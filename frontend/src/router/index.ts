import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Participants',
      name: 'Participants',
      component: () => import('../views/Participants.vue')
    },
    {
      path: '/Gifts',
      name: 'Gifts',
      component: () => import('../views/Gifts.vue')
    }
  ]
})

export default router
