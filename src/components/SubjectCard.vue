<script setup lang="ts">
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import type Subject from '@/models/subject';
import SubjectsProvider from '@/providers/subjects';
import router from '@/router';

defineProps<{
  subject: Subject;
}>();

const handleDelete = (subject: Subject) => {
  SubjectsProvider.delete(subject);

  router.push('/subjects');
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
    <DeleteButton @onClick="handleDelete(subject)" />
  </div>
</template>
