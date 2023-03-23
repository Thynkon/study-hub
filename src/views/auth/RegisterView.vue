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
    .catch(() => {});
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
  <div class="py-40 max-w-lg flex flex-col items-center space-y-4">
    <h2 class="uppercase text-center">Register</h2>

    <form
      @submit.prevent="handleRegister()"
      class="w-full flex flex-col space-y-6"
    >
      <ErrorAlert :errors="auth.registerErrors" />

      <div class="space-y-4">
        <ErrorAlert :errors="v$.name.$errors" />

        <div class="space-y-4">
          <label>Name</label>
          <input type="text" v-model="formData.name" />
        </div>
      </div>

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
          <input type="password" name="password" v-model="formData.password" />
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
</template>
