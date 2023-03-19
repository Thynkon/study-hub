<script setup lang="ts">
import type Exercise from '@/models/exercise';
import type Subject from '@/models/subject';

import ExercisesProvider from '@/providers/exercises';

import DeleteButton from '@/components/buttons/DeleteButton.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import { ref } from 'vue';

defineProps<{
  exercise: Exercise;
  subject: Subject;
}>();

const handleDelete = async (exercise: Exercise) => {
  isDeleteModalOpen.value = true;
};

const isDeleteModalOpen = ref(false);
</script>

<template>
  <div
    class="p-4 flex items-center space-y-8 bg-white rounded-lg shadow-md shadow-gray-300 cursor-pointer hover:scale-105 transition-transform"
  >
    <div class="grow">
      <h2 class="text-xl font-bold">{{ exercise.title }}</h2>
      <p v-if="exercise?.theory?.length > 50">
        {{ exercise?.theory.substring(0, 50) }} ...
      </p>
      <p v-else>
        {{ exercise?.theory }}
      </p>
    </div>

    <DeleteButton @click.stop="handleDelete(exercise)" />
    <DeleteModal
      :isOpen="isDeleteModalOpen"
      :closeModal="() => (isDeleteModalOpen = false)"
      :onConfirm="async () => await ExercisesProvider.delete(exercise)"
    />
  </div>
</template>
