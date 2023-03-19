<script setup lang="ts">
import { computed, ref } from 'vue';

import type Question from '@/models/question';

import QuizQuestion from '@/components/quiz/QuizQuestion.vue';
import QuizResult from '@/components/quiz/QuizResult.vue';

const props = defineProps<{
  questions: Question[];
}>();

const quiz = ref<InstanceType<typeof QuizQuestion> | null>(null);
const questionIndex = ref(0);
const showAnswer = ref(false);
const showResult = ref(false);

const currentQuestion = computed(() => {
  return props.questions[questionIndex.value];
});

const canGoNext = computed(() => {
  return questionIndex.value + 1 < props.questions.length;
});

const quizIsCompleted = computed(() => {
  return questionIndex.value + 1 === props.questions.length && showAnswer.value;
});

const handleNext = () => {
  if (canGoNext.value) {
    showAnswer.value = false;
    questionIndex.value++;
  } else {
    showResult.value = true;
  }
};

const handleResult = () => {
  // Add result to feed bar
  currentQuestion.value.success = currentQuestion.value.answers.every(
    (answer) =>
      answer.is_correct === (answer.selected == undefined ? false : true)
  );
  // Show question answer(s)
  showAnswer.value = true;
};
</script>

<template>
  <div>
    <!-- Quiz -->
    <QuizResult v-if="showResult" :questions="questions" />
    <div v-else class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900">
          Question {{ questionIndex + 1 }} / {{ questions.length }}
        </h2>

        <div class="flex space-x-2">
          <div
            v-for="question in (questions as Question[])"
            :key="question.id"
            class="w-8 h-1 rounded-sm"
            :class="[
              question.success == undefined
                ? currentQuestion === question
                  ? 'bg-gray-400'
                  : 'bg-gray-200'
                : question.success
                ? 'bg-green-500'
                : 'bg-red-500',
            ]"
          />
        </div>
      </div>

      <QuizQuestion
        ref="quiz"
        :question="currentQuestion"
        :show-answer="showAnswer"
      />

      <div class="flex justify-end items-center">
        <button
          @click="showAnswer ? handleNext() : handleResult()"
          class="btn-primary py-4 md:px-8 w-full md:w-auto"
        >
          {{ quizIsCompleted ? 'Finish' : showAnswer ? 'Next' : 'Check' }}
        </button>
      </div>
    </div>
  </div>
</template>
