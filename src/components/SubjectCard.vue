<script setup lang="ts">
import router from '@/router';

import type Subject from '@/models/subject';

import SubjectsProvider from '@/providers/subjects';

import DeleteButton from '@/components/buttons/DeleteButton.vue';

defineProps<{
  subject: Subject;
}>();

const handleDelete = async (subject: Subject) => {
  await SubjectsProvider.delete(subject);
};
</script>

<template>
  <div
    class="flex items-center p-4 bg-white rounded-lg shadow-md shadow-gray-300 space-y-8 cursor-pointer hover:scale-105 transition-transform"
  >
    <div class="grow">
      <h2 class="text-xl font-bold">{{ subject.name }}</h2>
      <p>{{ subject.description }}</p>
    </div>

    <DeleteButton @click.stop="handleDelete(subject)" />
  </div>
</template>
