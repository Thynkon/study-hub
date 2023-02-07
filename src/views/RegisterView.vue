<script setup lang="ts"></script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div
      class="py-16 w-full flex items-center justify-center flex-col space-y-4"
    >
      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Register</h2>
      </div>

      <!-- Multi-Step form -->
      <form class="max-w-lg w-full flex flex-col space-y-6">
        <div class="h-64">
          <!-- Step 1 -->
          <div>
            <label class="block py-2">Username</label>
            <input
              type="text"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
            />
          </div>

          <div>
            <label class="block py-2">Email</label>
            <input
              type="email"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
            />
          </div>

          <div>
            <label class="block py-2">Password</label>
            <input
              type="password"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
            />
          </div>
          <div>
            <label class="block py-2">Password Confirmation</label>
            <input
              type="password"
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
