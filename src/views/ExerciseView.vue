<script setup lang="ts">
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

import type Exercise from '@/models/exercise';

import QuizGame from '@/components/quiz/QuizGame.vue';

const props = defineProps<{
  id: string;
}>();

const exercise = useDocument(doc(db, 'exercises', props.id));
</script>

<template>
  <div class="py-8 space-y-8">
    <!-- Exercise -->
    <div class="space-y-4">
      <!-- Title -->
      <div class="flex flex-col md:flex-row gap-12 md:gap-4">
        <RouterLink
          :to="{
            name: 'subjects.show',
            params: { id: exercise?.subject?.id ?? 0 },
          }"
          class="hover:bg-gray-200 rounded md:px-2 md:-mx-2"
        >
          <h2>{{ exercise?.subject.name }}</h2>
        </RouterLink>

        <span class="hidden md:block text-4xl text-gray-400">/</span>

        <h2 class="text-center w-full md:w-auto">{{ exercise?.title }}</h2>
      </div>

      <p>{{ exercise?.theory }}</p>
    </div>

    <QuizGame
      v-if="exercise?.questions"
      :questions="exercise?.questions"
      :exercise="(exercise as Exercise)"
    />
  </div>
</template>
