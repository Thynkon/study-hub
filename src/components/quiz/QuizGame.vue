<script setup lang="ts">
import { computed, ref } from 'vue';

import type Answer from '@/models/answer';
import type Question from '@/models/question';

import QuizQuestion from '@/components/quiz/QuizQuestion.vue';
import QuizQuestionFeed from '@/components/quiz/QuizQuestionFeed.vue';
import QuizResult from '@/components/quiz/QuizResult.vue';
import type Exercise from '@/models/exercise';

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

const answers = ref<Answer[]>([]);

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

const handleResult = async () => {
  console.log('handleResult');
  // Add result to feed bar
  currentQuestion.value.success = currentQuestion.value.answers.every(
    (answer) =>
      answer.is_correct === (answer.selected == undefined ? false : true)
  );

  // Add result to answers
  currentQuestion.value.answers.forEach((answer) => {
    if (answer.selected) {
      answers.value.push(answer as Answer);
    }
  });

  // Show question answer(s)
  showAnswer.value = true;
};
</script>

<template>
  <div>
    <!-- Quiz -->
    <QuizResult
      v-if="showResult"
      :questions="questions"
      :answers="answers"
      :exercise="exercise"
    />
    <div v-else class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900">
          Question {{ questionIndex + 1 }} / {{ questions.length }}
        </h2>

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
          @click="showAnswer ? handleNext() : handleResult()"
          class="btn-primary py-4 md:px-8 w-full md:w-auto"
        >
          {{ quizIsCompleted ? 'Finish' : showAnswer ? 'Next' : 'Check' }}
        </button>
      </div>
    </div>
  </div>
</template>
