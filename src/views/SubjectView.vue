<script setup lang="ts">
import router from '@/router';

import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

import type Subject from '@/models/subject';
import type Exercise from '@/models/exercise';

import SuccessAlert from '@/components/SuccessAlert.vue';
import ExerciseCard from '@/components/exercises/ExerciseCard.vue';

const props = defineProps<{
  id: string;
}>();

const subject = useDocument(doc(db, 'subjects', props.id));

const handleCreate = (subject: Subject) => {
  router.push({ name: 'exercises.create', params: { id: subject.id } });
};
</script>

<template>
  <div>
    <SuccessAlert position="top right" group="subjects" />
    <SuccessAlert position="top right" group="exercises" />
    <notifications position="bottom right" />

    <div class="space-y-4">
      <div class="py-8 space-y-4">
        <h2 class="text-4xl font-bold text-gray-900">{{ subject?.name }}</h2>
        <p>{{ subject?.description }}</p>
      </div>

      <!-- Exercises -->
      <div class="flex flex-col space-y-4">
        <!-- Actions -->
        <div class="flex justify-end items-center">
          <div class="grow">
            <h2 class="text-2xl font-bold text-gray-900">Exercises</h2>
          </div>

          <button
            @click.prevent="handleCreate(subject as Subject)"
            class="btn-primary"
          >
            New
          </button>
        </div>

        <!-- List -->
        <div
          v-if="subject?.exercises?.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
        >
          <ExerciseCard
            v-for="exercise in subject?.exercises"
            :key="exercise.id"
            :exercise="(exercise as Exercise)"
            :subject="(subject as Subject)"
            @click="
              router.push({
                name: 'exercise',
                params: { id: exercise.id },
              })
            "
          >
          </ExerciseCard>
        </div>
        <div v-else>
          <p class="text-gray-500">No exercises yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>
