<script setup lang="ts">
import { computed } from 'vue';

import type Question from '@/models/question';

import ExerciseQuiz from '@/components/exercises/ExerciseQuiz.vue';

const props = defineProps<{
  questions: Question[];
}>();

const score = computed(() => {
  return props.questions.filter((question) => question.success).length;
});

const stats = computed(() => {
  return Math.round((score.value / props.questions.length) * 100);
});

const isSuccessful = computed(() => {
  return stats.value >= 50;
});
</script>

<template>
  <div class="space-y-12">
    <div class="text-center space-y-8">
      <h3 class="font-bold text-4xl">Result</h3>

      <h3 class="text-2xl">
        {{ isSuccessful ? 'Congratulations!' : 'The next time will be better' }}
      </h3>

      <div class="space-y-2">
        <span class="text-2xl text-gray-600 uppercase tracking-widest">
          Your score
        </span>
        <h4 class="font-bold text-6xl space-x-2">
          <span :class="[isSuccessful ? 'text-green-500' : 'text-red-500']">
            {{ score }}
          </span>
          <span class="text-gray-800">/</span>
          <span class="text-gray-800">{{ props.questions.length }}</span>
        </h4>
      </div>
    </div>

    <div v-for="(question, index) in props.questions" :key="question.id">
      <span class="text-xl italic text-gray-700">
        Question {{ index + 1 }}
      </span>

      <ExerciseQuiz :question="question" :show-answer="true" />
    </div>
  </div>
</template>
