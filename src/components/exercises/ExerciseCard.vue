<script setup lang="ts">
import type Exercise from '@/models/exercise';
import ExercisesProvider from '@/providers/exercises';
import router from '@/router';
import { useRoute } from 'vue-router';
import DeleteButton from '../buttons/DeleteButton.vue';

defineProps<{
  exercise: Exercise;
}>();

const route = useRoute();

const handleDelete = async (exercise) => {
  const subjectId = exercise.subject.id;
  await ExercisesProvider.delete(exercise);

  router.push({ name: 'subject', params: { id: subjectId } });
};
</script>

<template>
  <div
    class="flex items-center p-4 bg-white rounded-lg shadow-md shadow-gray-300 space-y-8 cursor-pointer hover:scale-105 transition-transform"
  >
    <div class="grow">
      <h2 class="text-xl font-bold">{{ exercise.title }}</h2>
      <p v-if="exercise?.theory?.length > 50">
        {{ exercise?.theory.substring(0, 50) }} ...
      </p>
      <p v-else>{{ exercise?.theory }}</p>
    </div>
    <DeleteButton @onClick="handleDelete(exercise)" />
  </div>
</template>
