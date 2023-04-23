import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Participants',
      name: 'Participants',
      component: () => import('../views/Participants.vue')
    },
    {
      path: '/Gifts',
      name: 'Gifts',
      component: () => import('../views/Gifts.vue')
    },
    {
      path: '/Meetups',
      name: 'Meetups',
      component: () => import('../views/Meetups.vue')
    }
  ]
})

export default router
