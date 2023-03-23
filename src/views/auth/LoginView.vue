<script setup lang="ts">
import ErrorAlert from '@/components/ErrorAlert.vue';

import AuthProvider from '@/providers/authentication/manual';
import GithubProvider from '@/providers/authentication/github';
import GoogleProvider from '@/providers/authentication/google';

import router from '@/router';
import { onMounted, reactive } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const auth = useAuthStore();

const AuthWithGithub = async () => {
  await handleLogin(GithubProvider.auth);
};

const AuthWithGoogle = async () => {
  await handleLogin(GoogleProvider.auth);
};

const LoginWithForm = async () => {
  const result = await v$.value.$validate();
  if (!result) return;

  await handleLogin(() => AuthProvider.login(formData.email, formData.password))
    .then(() => {
      router.push('/');
    })
    .catch(() => {});
};

const handleLogin = async (fn: () => Promise<any>) => {
  await auth.login(await fn());
};

const formData = reactive({
  email: '',
  password: '',
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, formData);

onMounted(async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    const to =
      route.query.redirectTo && typeof route.query.redirectTo === 'string'
        ? route.query.redirectTo
        : '/';

    router.push(to);
  }
});
</script>

<template>
  <div class="py-40 max-w-lg flex flex-col items-center space-y-4">
    <h2 class="uppercase text-center">Login</h2>

    <!-- OAuth -->
    <div class="py-4 w-full flex space-x-2 font-semibold">
      <button
        @click="AuthWithGithub()"
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-gray-800 hover:bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        Github
      </button>
      <button
        @click="AuthWithGoogle()"
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        Google
      </button>
    </div>

    <!-- Manual -->
    <form
      @submit.prevent="LoginWithForm()"
      class="w-full flex flex-col space-y-6"
    >
      <ErrorAlert :errors="auth.loginErrors" />

      <div class="space-y-4">
        <ErrorAlert :errors="v$.email.$errors" />

        <div class="space-y-4">
          <label>Email</label>
          <input type="email" v-model="formData.email" />
        </div>
      </div>

      <div class="space-y-4">
        <ErrorAlert :errors="v$.password.$errors" />

        <div class="space-y-4">
          <label>Password</label>
          <input type="password" v-model="formData.password" />
        </div>
      </div>

      <button
        type="submit"
        class="w-full btn-primary flex items-center justify-center"
      >
        <SpinnerIcon v-if="auth.isLoading" class="text-white" />
        <span>Login</span>
      </button>
    </form>

    <router-link
      to="/register"
      class="block text-gray-600 hover:text-gray-800 text-center"
    >
      Not already register ?
    </router-link>
  </div>
</template>
