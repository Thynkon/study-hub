<script setup lang="ts">

import GithubProvider from '@/providers/authentication/github';
import router from '@/router';
import { exit } from 'process';
import { onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getCurrentUser, useFirebaseAuth } from 'vuefire';

const route = useRoute();
const AuthWithGithub = async () => {
  console.log("Clicked on AuthWithGithub");
  await GithubProvider.signIn();
  console.log("got the user: ");
}

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
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">

      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Login</h2>

        <!-- OAuth -->
        <div class="w-full flex space-x-2 font-semibold">
          <button @click="AuthWithGithub"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-gray-800 hover:bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Github
          </button>
        </div>

        <!-- Manual -->
        <form class="w-full flex flex-col space-y-6">
          <div>
            <label class="block">Email</label>
            <input type="email" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>
          <div>
            <label class="block">Password</label>
            <input type="password" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <button type="submit"
            class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">Login</button>
        </form>

        <router-link to="/register" class="block text-gray-600 hover:text-gray-800 text-center">
          Not already register ?
        </router-link>
      </div>
    </div>
  </main>
</template>
