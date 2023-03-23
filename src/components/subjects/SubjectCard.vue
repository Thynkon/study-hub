<script setup lang="ts">
import { ref } from 'vue';

import type Subject from '@/models/subject';

import SubjectsProvider from '@/providers/subjects';

import SubjectEditModal from '@/components/subjects/EditModal.vue';
import EditButton from '@/components/buttons/EditButton.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import DeleteModal from '@/components/DeleteModal.vue';

defineProps<{
  subject: Subject;
}>();

const handleDelete = async () => {
  isDeleteModalOpen.value = true;
};

const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
</script>

<template>
  <div class="p-4 flex items-center card">
    <div class="grow">
      <h2 class="text-xl">{{ subject.name }}</h2>
      <p>{{ subject.description }}</p>
    </div>

    <div class="flex space-x-2">
      <EditButton @click.stop="() => (isEditModalOpen = true)" />
      <DeleteButton @click.stop="handleDelete()" />
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
