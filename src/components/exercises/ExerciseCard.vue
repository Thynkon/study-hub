<script setup lang="ts">
import type Exercise from '@/models/exercise';
import type Subject from '@/models/subject';
import ExercisesProvider from '@/providers/exercises';
import router from '@/router';
import DeleteButton from '../buttons/DeleteButton.vue';

const props = defineProps<{
  exercise: Exercise;
  subject: Subject;
}>();

const handleDelete = async (exercise) => {
  const subjectId = exercise.subject.id;
  await ExercisesProvider.delete(exercise);

  if (props.subject.exercises.length > 0) {
    props.subject.exercises = props.subject.exercises.filter((e) => {
      e.id !== exercise.id;
    });
  }

  router.push({ name: 'subject', params: { id: subjectId } });
};
</script>

<template>
  <div
    class="flex items-center p-4 bg-white rounded-lg shadow-md shadow-gray-300 space-y-8 cursor-pointer hover:scale-105 transition-transform"
  >
    <div class="grow">
      <h2 class="text-xl font-bold">{{ props.exercise.title }}</h2>
      <p v-if="props.exercise?.theory?.length > 50">
        {{ props.exercise?.theory.substring(0, 50) }} ...
      </p>
      <p v-else>{{ props.exercise?.theory }}</p>
    </div>
    <DeleteButton @onClick="handleDelete(props.exercise)" />
  </div>
</template>
