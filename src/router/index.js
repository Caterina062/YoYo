import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VideoPageView from '../views/VideoPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: VideoPageView,
    },
    {
      path: '/video/:id',
      name: 'video',
      component: VideoPageView,
    },
  ],
})

export default router
