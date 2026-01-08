import { createRouter, createWebHistory } from 'vue-router';
import ProgressView from '../views/ProgressView.vue';

import { animatePages } from './animatePages';

//
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'progress',
      component: ProgressView,
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/TimelineView.vue'),
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('../views/ActivitiesView.vue'),
    },
  ],
});

// Анимация
const { скрытие, показ } = animatePages();
let nun = 0;

router.beforeEach(async (to, from) => {
  if (nun === 0) {
    скрытие();
    nun = 1;
    return true;
  }

  if (nun === 1) {
    await показ();
    скрытие();
    return true;
  }
});

// /Анимация

export default router;
