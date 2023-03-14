<script setup lang="ts">
import { computed, ref } from 'vue';
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

import ExerciseQuiz from '@/components/exercises/ExerciseQuiz.vue';

const props = defineProps<{
  id: string;
  // subject: string;
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
      <h2 class="text-4xl font-bold text-gray-900">
        {{ exercise?.title }}
      </h2>
      <p>{{ exercise?.theory }}</p>
    </div>

    <!-- Exercises -->
    <div class="space-y-8">
      <h2 class="text-2xl font-bold text-gray-900">
        Question {{ questionIndex + 1 }} / {{ exercise?.questions.length }}
      </h2>

      <ExerciseQuiz :question="currentQuestion" />

      <div class="flex justify-end items-center">
        <button class="btn-primary w-full md:w-auto md:px-8">Next</button>
      </div>
    </div>
  </div>
</template>
