<script setup lang="ts">
import type Subject from '@/models/subject';

import SuccessAlert from '@/components/SuccessAlert.vue';

defineProps<{
  subject: Subject;
}>();
</script>

<template>
  <div
    class="p-4 bg-gray-100 rounded shadow-md shadow-gray-300 space-y-8 cursor-pointer hover:scale-105 transition-transform"
  >
    <h2 class="text-xl font-bold">{{ subject.name }}</h2>
    <p>{{ subject.description }}</p>
  </div>
</template>
