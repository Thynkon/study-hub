<script setup lang="ts">
import { email, required, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import ErrorAlert from '@/components/ErrorAlert.vue';
import AuthProvider from '@/providers/authentication/manual';

const onSubmit = async (e) => {
  const result = await v$.value.$validate();
  if (result) {
    await AuthProvider.register(formData.email, formData.password);
    console.log("Registered");
  } else {
    alert('Form is invalid');
    console.log(v$);
  }
}

const formData = reactive({
  email: '',
  password: '',
  passwordConfirmation: '',
});

const rules = {
  email: { required, email },
  password: { required },
  passwordConfirmation: { required },
};

const v$ = useVuelidate(rules, formData);

</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">
      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Register</h2>
      </div>

      <!-- Multi-Step form -->
      <form @submit.prevent="onSubmit" class="max-w-lg w-full flex flex-col space-y-6">
        <div class="">
          <div>
            <ErrorAlert :errors="v$.email.$errors" />
            <label class="block py-2">Email</label>
            <input type="email" v-model="formData.email"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <div>
            <ErrorAlert :errors="v$.password.$errors" />
              <label class="block py-2">Password</label>
              <input type="password" name="password" v-model="formData.password"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>
          <div>
            <ErrorAlert :errors="v$.passwordConfirmation.$errors" />
            <label class="block py-2">Password Confirmation</label>
            <input type="password" name="password_confirmation" v-model="formData.passwordConfirmation"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">
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
