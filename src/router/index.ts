import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

const NotFoundViewVue = () => import('@/views/NotFoundView.vue');

const LoginView = () => import('@/views/auth/LoginView.vue');
const RegisterView = () => import('@/views/auth/RegisterView.vue');

const SubjectsView = () => import('@/views/SubjectsView.vue');
const SubjectView = () => import('@/views/SubjectView.vue');

const ExercisesCreateView = () => import('@/views/ExercisesCreateView.vue');
const ExerciseView = () => import('@/views/ExerciseView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundViewVue,
    },
    {
      path: '/',
      name: 'home',
      component: SubjectsView,
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
      path: '/subjects/:id',
      name: 'subjects.show',
      component: SubjectView,
      props: true,
    },
    {
      path: '/subjects/:id/create-exercises',
      name: 'exercises.create',
      component: ExercisesCreateView,
      props: true,
    },
    {
      path: '/exercise/:id',
      name: 'exercise',
      component: ExerciseView,
      props: true,
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
