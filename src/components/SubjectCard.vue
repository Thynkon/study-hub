<script setup lang="ts">
import type Subject from '@/models/subject';

import DeleteModal from '@/components/DeleteModal.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import SubjectsProvider from '@/providers/subjects';
import { ref } from 'vue';
import EditButton from './buttons/EditButton.vue';
import SubjectEditModal from './subjects/SubjectEditModal.vue';

defineProps<{
  subject: Subject;
}>();

const handleDelete = async (subject: Subject) => {
  isDeleteModalOpen.value = true;
};

const isEditModalOpen = ref(false);
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

    <div class="flex space-x-2">
      <EditButton @click.stop="() => (isEditModalOpen = true)" />
      <DeleteButton @click.stop="handleDelete(subject)" />
    </div>

    <SubjectEditModal
      :subject="subject"
      :isOpen="isEditModalOpen"
      :closeModal="() => (isEditModalOpen = false)"
    />

    <DeleteModal
      :isOpen="isDeleteModalOpen"
      :closeModal="() => (isDeleteModalOpen = false)"
      :onConfirm="async () => await SubjectsProvider.delete(subject)"
    />
  </div>
</template>
