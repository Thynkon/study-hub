<script setup lang="ts">
import router from '@/router';

import { useCurrentUser, useFirebaseAuth } from 'vuefire';

import Dropdown from './components/Dropdown.vue';
import ProfileIcon from './components/icons/ProfileIcon.vue';

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
            <ul class="flex items-center gap-2">
              <li>
                <RouterLink
                  to="/"
                  class="py-2 px-4 text-gray-700 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/"
                  class="py-2 px-4 text-gray-700 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Other
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- User Actions -->
          <Dropdown v-if="user" class="relative">
            <template #trigger>
              <ProfileIcon />
            </template>
            <template #content>
              <div
                class="absolute w-44 right-0 mt-2 p-2 bg-white rounded-lg border border-gray-200 shadow-md"
              >
                <div class="space-y-4">
                  <h4 class="text-lg">{{ user.displayName }}</h4>
                  <button
                    @click="handleLogout()"
                    type="button"
                    class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </template>
          </Dropdown>
          <RouterLink
            v-else
            to="/login"
            class="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            Login
          </RouterLink>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
