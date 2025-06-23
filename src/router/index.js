import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
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
