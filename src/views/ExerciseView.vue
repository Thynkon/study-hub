<script setup lang="ts">
import { computed, ref } from 'vue';
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

import ExerciseQuiz from '@/components/exercises/ExerciseQuiz.vue';

const props = defineProps<{
  id: string;
}>();

const questionIndex = ref(0);

const exercise = useDocument(doc(db, 'exercises', props.id));

const currentQuestion = computed(() => {
  return exercise.value?.questions[questionIndex.value];
});
</script>

<template>
  <div>
    <div class="py-8 space-y-4">
      <!-- Title -->
      <div class="flex space-x-4 items-center text-4xl font-bold text-gray-900">
        <RouterLink
          :to="{
            name: 'subjects.show',
            params: { id: exercise?.subject?.id ?? 0 },
          }"
          class="hover:bg-gray-200 rounded px-2 -mx-2"
        >
          <h2>
            {{ exercise?.subject.name }}
          </h2>
        </RouterLink>

        <span class="text-gray-400">/</span>

        <h2 class="">
          {{ exercise?.title }}
        </h2>
      </div>

      <p>{{ exercise?.theory }}</p>
    </div>

    <!-- Exercises -->
    <div class="space-y-8">
      <h2 class="text-2xl font-bold text-gray-900">
        Question {{ questionIndex + 1 }} / {{ exercise?.questions.length }}
      </h2>

      <ExerciseQuiz :question="currentQuestion" />

      <div class="flex justify-end items-center">
        <button class="btn-primary py-4 md:px-8 w-full md:w-auto">Next</button>
      </div>
    </div>
  </div>
</template>
