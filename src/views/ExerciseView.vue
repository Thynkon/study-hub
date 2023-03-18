<script setup lang="ts">
import { computed, ref } from 'vue';
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

import type Question from '@/models/question';

import ExerciseQuiz from '@/components/exercises/ExerciseQuiz.vue';

const props = defineProps<{
  id: string;
}>();

const questionIndex = ref(0);

const exercise = useDocument(doc(db, 'exercises', props.id));

const currentQuestion = computed(() => {
  return exercise.value?.questions[questionIndex.value] as Question;
});

const handleResult = (result: boolean) => {
  exercise.value!.questions[questionIndex.value].success = result;
};

const handleNext = () => {
  if (questionIndex.value + 1 >= exercise.value?.questions.length)
    console.log('Quiz finished');
  else questionIndex.value++;
};
</script>

<template>
  <div class="py-8 space-y-8">
    <!-- Exercise -->
    <div class="space-y-4">
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

    <!-- Quiz -->
    <div class="space-y-8">
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
        :question="currentQuestion"
        @handleResult="(result) => handleResult(result)"
        @handleNext="handleNext()"
      />
    </div>
  </div>
</template>
