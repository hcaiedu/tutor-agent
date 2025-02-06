import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/roomcreate',
      name: 'roomcreate',
      component: () => import('../views/RoomCreate.vue'),
    },
    {
      path: '/roomjoin',
      name: 'roomjoin',
      component: () => import('../views/RoomJoin.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
    },
  ],
})

export default router
