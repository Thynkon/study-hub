<script setup lang="ts">
import type Exercise from '@/models/exercise';

import SuccessAlert from '@/components/SuccessAlert.vue';

defineProps<{
  exercise: Exercise;
}>();
</script>

<template>
  <div
    class="p-4 bg-white rounded-lg shadow-md shadow-gray-300 space-y-8 cursor-pointer hover:scale-105 transition-transform"
  >
    <h2 class="text-xl font-bold">{{ exercise.title }}</h2>
    <p v-if="exercise?.theory?.length > 50">
      {{ exercise?.theory.substring(0, 50) }} ...
    </p>
    <p v-else>{{ exercise?.theory }}</p>
  </div>
</template>
