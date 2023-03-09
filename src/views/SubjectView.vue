<script setup lang="ts">
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

import type Subject from '@/models/subject';

import SuccessAlert from '@/components/SuccessAlert.vue';
import type Exercise from '@/models/exercise';
import ExerciseCard from '@/components/exercises/Card.vue';
import router from '@/router';

const props = defineProps<{
  id: string;
}>();

const handleCreate = (subject: Subject) => {
  router.push({ name: 'exercises.create', params: { id: subject.id } });
};

const subject = useDocument(doc(db, 'subjects', props.id));
</script>

<template>
  <div class="w-full pt-16">
    <div class="mx-auto w-full rounded-2xl bg-white space-y-4">
      <SuccessAlert position="top right" group="subjects" />
      <SuccessAlert position="top right" group="exercises" />

      <div>
        <h2 class="text-2xl font-bold text-gray-900">{{ subject?.name }}</h2>
        <p>{{ subject?.description }}</p>
      </div>

      <!-- Exercises -->
      <div>
        <!-- Actions -->
        <div class="flex justify-end items-center">
          <div class="grow">
            <h2 class="text-2xl font-bold text-gray-900">Exercises</h2>
          </div>

          <button class="primary-button" @click.prevent="handleCreate(subject)">
            New
          </button>
        </div>

        <!-- List -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <ExerciseCard
            v-for="exercise in subject?.exercises"
            :key="exercise.id"
            :exercise="(exercise as Exercise)"
          >
          </ExerciseCard>
        </div>
      </div>
    </div>
  </div>
</template>
