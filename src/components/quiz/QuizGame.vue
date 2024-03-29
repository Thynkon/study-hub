<script setup lang="ts">
import { computed, ref } from 'vue';

import type Question from '@/models/question';
import type Exercise from '@/models/exercise';

import ExercisesProvider from '@/providers/exercises';

import QuizQuestion from '@/components/quiz/QuizQuestion.vue';
import QuizQuestionFeed from '@/components/quiz/QuizQuestionFeed.vue';
import QuizResult from '@/components/quiz/QuizResult.vue';

const props = defineProps<{
  exercise: Exercise;
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

const handleNext = async () => {
  if (canGoNext.value) {
    showAnswer.value = false;
    questionIndex.value++;
  } else {
    await ExercisesProvider.answer(props.exercise, props.questions);

    showResult.value = true;
  }
};

const handleAnswer = async () => {
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
        <h3>Question {{ questionIndex + 1 }} / {{ questions.length }}</h3>

        <QuizQuestionFeed
          :questions="questions"
          :current-question="currentQuestion"
        />
      </div>

      <QuizQuestion
        ref="quiz"
        :question="currentQuestion"
        :show-answer="showAnswer"
      />

      <div class="flex justify-end items-center">
        <button
          @click="showAnswer ? handleNext() : handleAnswer()"
          class="btn-primary py-4 md:px-8 w-full md:w-auto"
        >
          {{ quizIsCompleted ? 'Finish' : showAnswer ? 'Next' : 'Check' }}
        </button>
      </div>
    </div>
  </div>
</template>
