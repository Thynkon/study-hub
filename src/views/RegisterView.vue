<script setup lang="ts">
import ErrorAlert from '@/components/ErrorAlert.vue';

import router from '@/router';
import useVuelidate from '@vuelidate/core';
import {
  email,
  maxLength,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators';
import { computed, reactive } from 'vue';
import { RouterLink } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import AuthProvider from '@/providers/authentication/manual';

const auth = useAuthStore();

const handleRegister = async () => {
  const result = await v$.value.$validate();
  if (!result) return;

  await auth
    .register(
      await AuthProvider.register(
        formData.name,
        formData.email,
        formData.password
      )
    )
    .then(() => {
      router.push('/');
    })
    .catch((error) => {
      console.log(error);
    });
};

const formData = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});

const rules = computed(() => ({
  name: { required, maxLength: maxLength(20) },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  passwordConfirmation: { required, sameAsPassword: sameAs(formData.password) },
}));

const v$ = useVuelidate(rules, formData);
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div
      class="py-16 w-full flex items-center justify-center flex-col space-y-4"
    >
      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Register</h2>
      </div>

      <form
        @submit.prevent="handleRegister()"
        class="max-w-lg w-full flex flex-col space-y-6"
      >
        <ErrorAlert :errors="auth.registerErrors" />

        <div class="space-y-4">
          <ErrorAlert :errors="v$.name.$errors" />

          <div class="space-y-4">
            <label>Name</label>
            <input
              type="text"
              v-model="formData.name"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
            />
          </div>
        </div>

        <div class="space-y-4">
          <ErrorAlert :errors="v$.email.$errors" />

          <div class="space-y-4">
            <label>Email</label>
            <input
              type="email"
              v-model="formData.email"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
            />
          </div>
        </div>

        <div class="space-y-4">
          <ErrorAlert :errors="v$.password.$errors" />

          <div class="space-y-4">
            <label>Password</label>
            <input
              type="password"
              name="password"
              v-model="formData.password"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
            />
          </div>
        </div>

        <div class="space-y-4">
          <ErrorAlert :errors="v$.passwordConfirmation.$errors" />

          <div class="space-y-4">
            <label>Password Confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              v-model="formData.passwordConfirmation"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button
            class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg"
          >
            Register
          </button>
        </div>
      </form>

      <router-link to="/login" class="text-gray-600 hover:text-gray-800">
        Already registered ?
      </router-link>
    </div>
  </main>
</template>
