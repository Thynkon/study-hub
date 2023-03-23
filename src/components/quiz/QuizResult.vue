<script setup lang="ts">
import { computed, onMounted } from 'vue';

import type Question from '@/models/question';

import QuizQuestion from '@/components/quiz/QuizQuestion.vue';
import QuizQuestionFeed from '@/components/quiz/QuizQuestionFeed.vue';
import type Answer from '@/models/answer';
import type Exercise from '@/models/exercise';
import ExercisesProvider from '@/providers/exercises';

const props = defineProps<{
  exercise: Exercise;
  questions: Question[];
  answers: Answer[];
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

onMounted(async () => {
  await ExercisesProvider.answer(
    props.exercise,
    props.questions,
    props.answers
  );
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

    <div class="space-y-4">
      <QuizQuestionFeed :questions="props.questions" />

      <div class="space-y-12">
        <div v-for="(question, index) in props.questions" :key="question.id">
          <span class="text-xl italic text-gray-700">
            Question {{ index + 1 }}
          </span>

          <QuizQuestion :question="question" :show-answer="true" />
        </div>
      </div>
    </div>
  </div>
</template>
