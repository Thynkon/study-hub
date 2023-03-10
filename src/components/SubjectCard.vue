<script setup lang="ts">
import type Subject from '@/models/subject';

defineProps<{
  subject: Subject;
}>();
</script>

<template>
  <div
    class="p-4 bg-white rounded-lg shadow-md shadow-gray-300 space-y-8 cursor-pointer hover:scale-105 transition-transform"
  >
    <h2 class="text-xl font-bold">{{ subject.name }}</h2>
    <p>{{ subject.description }}</p>
  </div>
</template>
