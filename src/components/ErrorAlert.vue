<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import type { Error } from '@/stores/auth';

defineProps<{
  errors: ErrorObject[] | Error[];
}>();
</script>

<template>
  <div
    v-for="(error, index) in errors"
    :key="index"
    class="flex p-4 text-red-600 rounded-lg bg-red-50"
    role="alert"
  >
    <svg
      aria-hidden="true"
      class="flex-shrink-0 w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span class="sr-only">Info</span>
    <!-- when performing nested validation, errors message is an array containing other messages -->
    <div class="ml-3 text-sm font-medium">
      <span
        v-if="Array.isArray(error.$message)"
        v-for="message in error.$message"
      >
        {{ message[0] }}
      </span>
      <span v-else>
        {{ error.$message }}
      </span>
    </div>
  </div>
</template>
