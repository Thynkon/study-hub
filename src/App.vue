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
  <header class="mx-auto max-w-6xl">
    <div class="py-4 flex">
      <div class="grow">
        <RouterLink to="/" class="">Home</RouterLink>
      </div>

      <RouterLink v-if="!user" to="/login" class="">Login</RouterLink>
      <button
        v-else
        @click="handleLogout()"
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  </header>

  <RouterView />
</template>
