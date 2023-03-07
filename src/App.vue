<script setup lang="ts">
import router from '@/router';

import { useCurrentUser, useFirebaseAuth } from 'vuefire';

import Dropdown from '@/components/Dropdown.vue';
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import HamburgerIcon from '@/components/icons/HamburgerIcon.vue';

const Route = (name: string, path: string) => ({ name, path });
const routes = router.getRoutes().filter((route) => route.meta?.inNavbar);

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
        <div class="flex flex-wrap items-center justify-between space-x-4">
          <RouterLink to="/" class="flex items-center">
            <span class="text-xl font-semibold whitespace-nowrap">
              Study Hub
            </span>
          </RouterLink>

          <!-- Links -->
          <div class="grow">
            <!-- Big Menu -->
            <div class="hidden md:flex justify-center items-center">
              <ul class="grow flex items-center gap-4">
                <li v-for="route in routes" :key="route.name">
                  <RouterLink :to="route.path" class="py-2 px-4 text-gray-700 hover:border-b-4 border-blue-500"
                    active-class="bg-blue-100 text-blue-500 rounded">
                    {{ route.name }}
                  </RouterLink>
                </li>
              </ul>

              <!-- User Actions -->
              <Dropdown v-if="user" class="relative">
                <template #trigger>
                  <ProfileIcon />
                </template>
                <template #content>
                  <div class="absolute w-44 right-0 mt-2 p-2 bg-white rounded-lg border border-gray-200 shadow-md">
                    <div class="space-y-4">
                      <h4 class="text-lg">{{ user.displayName }}</h4>
                      <button @click="handleLogout()" type="button"
                        class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Logout
                      </button>
                    </div>
                  </div>
                </template>
              </Dropdown>
              <RouterLink v-else to="/login" class="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded">
                Login
              </RouterLink>
            </div>
          </div>

          <!-- Small Menu -->
          <div class="md:hidden">
            <Dropdown>
              <template #trigger>
                <HamburgerIcon />
              </template>
              <template #content>
                <div
                  class="absolute top-[var(--h-navbar)] left-0 py-8 inset-x-0 bg-white border border-gray-200 shadow-md">
                  <div class="space-y-8">
                    <div class="mx-2 flex flex-col gap-4">
                      <RouterLink v-for="route in routes" :key="route.name" :to="route.path" class="px-4 py-3 text-lg"
                        active-class="bg-blue-100 text-blue-500">
                        {{ route.name }}
                      </RouterLink>
                    </div>

                    <!-- User Actions -->
                    <div class="mx-2 py-4 flex flex-col gap-8 border-t-2 border-gray-600">
                      <div v-if="user" class="flex flex-col space-y-4">
                        <div class="space-x-2">
                          <span class="py-4">Logged as</span>
                          <span class="font-semibold">{{
                            user.displayName
                          }}</span>
                        </div>
                        <button @click="handleLogout()"
                          class="bg-red-500 hover:bg-red-600 text-white font-bold p-4 rounded">
                          Logout
                        </button>
                      </div>
                      <RouterLink v-else to="/login">Login</RouterLink>
                    </div>
                  </div>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
