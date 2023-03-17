<script setup lang="ts">
import type Subject from '@/models/subject';

import DeleteModal from '@/components/DeleteModal.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import SubjectsProvider from '@/providers/subjects';
import { ref } from 'vue';

defineProps<{
  subject: Subject;
}>();

const handleDelete = async (subject: Subject) => {
  isDeleteModalOpen.value = true;
};

const isDeleteModalOpen = ref(false);
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
    <DeleteModal
      :isOpen="isDeleteModalOpen"
      :closeModal="() => (isDeleteModalOpen = false)"
      :onConfirm="() => SubjectsProvider.delete(subject)"
    />
  </div>
</template>
