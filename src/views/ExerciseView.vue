<script setup lang="ts">
import { computed, ref } from 'vue';
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

import type Question from '@/models/question';

import ExerciseQuiz from '@/components/exercises/ExerciseQuiz.vue';
import ExerciseResult from '@/components/exercises/ExerciseResult.vue';

const props = defineProps<{
  id: string;
}>();

const quiz = ref<InstanceType<typeof ExerciseQuiz> | null>(null);
const questionIndex = ref(0);
const showAnswer = ref(false);
const showResult = ref(false);

const exercise = useDocument(doc(db, 'exercises', props.id));

const currentQuestion = computed(() => {
  return exercise.value?.questions[questionIndex.value] as Question;
});

const canGoNext = computed(() => {
  return questionIndex.value + 1 < exercise.value?.questions.length;
});

const quizIsCompleted = computed(() => {
  return (
    questionIndex.value + 1 === exercise.value?.questions.length &&
    showAnswer.value
  );
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
  exercise.value!.questions[questionIndex.value].success =
    currentQuestion.value.answers.every(
      (answer) =>
        answer.is_correct === (answer.selected == undefined ? false : true)
    );

  // Show question answer(s)
  showAnswer.value = true;
};
</script>

<template>
  <div class="py-8 space-y-8">
    <!-- Exercise -->
    <div class="space-y-4">
      <!-- Title -->
      <div
        class="flex flex-col md:flex-row gap-12 md:gap-4 text-4xl font-bold text-gray-900"
      >
        <RouterLink
          :to="{
            name: 'subjects.show',
            params: { id: exercise?.subject?.id ?? 0 },
          }"
          class="hover:bg-gray-200 rounded md:px-2 md:-mx-2"
        >
          <h2>
            {{ exercise?.subject.name }}
          </h2>
        </RouterLink>

        <span class="hidden md:block text-gray-400">/</span>

        <h2 class="text-center w-full md:w-auto">
          {{ exercise?.title }}
        </h2>
      </div>

      <p>{{ exercise?.theory }}</p>
    </div>

    <!-- Quiz -->
    <ExerciseResult v-if="showResult" :questions="exercise?.questions" />

    <div v-else class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900">
          Question {{ questionIndex + 1 }} / {{ exercise?.questions.length }}
        </h2>

        <div class="flex space-x-2">
          <div
            v-for="question in (exercise?.questions as Question[])"
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

      <ExerciseQuiz
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
