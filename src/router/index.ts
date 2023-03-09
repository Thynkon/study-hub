import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

import HomeView from '@/views/HomeView.vue';
const LoginView = () => import('@/views/auth/LoginView.vue');
const RegisterView = () => import('@/views/auth/RegisterView.vue');

const SubjectsView = () => import('@/views/SubjectsView.vue');
const SubjectView = () => import('@/views/SubjectView.vue');
const ExercisesView = () => import('@/views/ExercisesView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: SubjectsView,
      meta: {
        inNavbar: true,
      },
    },
    {
      path: '/subjects/:id',
      name: 'subject',
      component: SubjectView,
      props: true,
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: ExercisesView,
      meta: {
        inNavbar: true,
      }
    },
  ],
});

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: '/login',
        force: true,
        query: {
          // we keep the current path in the query so we can redirect to it after login
          // with `router.push(route.query.redirectTo || '/')`
          redirectTo: to.fullPath,
        },
      };
    }
  }
});

export default router;
