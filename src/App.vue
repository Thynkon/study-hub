<script setup lang="ts">
import router from '@/router';

import { useCurrentUser, useFirebaseAuth } from 'vuefire';

const user = useCurrentUser();

const handleLogout = async () => {
  await useFirebaseAuth()?.signOut();

  router.push({ name: 'home' });
};
</script>

<template>
  <div class="mx-8 xl:mx-auto max-w-7xl">
    <header>
      <nav class="my-4 bg-white border-gray-200 rounded">
        <div class="flex flex-wrap items-center justify-between mx-auto">
          <RouterLink to="/" class="flex items-center">
            <span class="text-xl font-semibold whitespace-nowrap">
              Study Hub
            </span>
          </RouterLink>

          <!-- Links -->
          <div>
            <ul class="flex gap-2">
              <li>
                <RouterLink to="/" class="py-2 px-4 text-gray-700 rounded bg-gray-100 hover:bg-gray-200">
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/" class="py-2 px-4 text-gray-700 rounded bg-gray-100 hover:bg-gray-200">
                  Other
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/subjects" class="py-2 px-4 text-gray-700 rounded bg-gray-100 hover:bg-gray-200">
                  Subjects
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Action -->
          <div class="flex">
            <RouterLink v-if="!user" to="/login" class="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded">
              Login
            </RouterLink>
            <button v-else @click="handleLogout()" type="button"
              class="py-2 px-4 text-white bg-gray-800 hover:bg-gray-900 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
