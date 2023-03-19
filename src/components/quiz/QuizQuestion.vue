<script setup lang="ts">
import { computed } from 'vue';

import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid';

import Shuffle from '@/helpers/array';

import type Question from '@/models/question';
import type Answer from '@/models/answer';

const props = defineProps<{
  question: Question;
  showAnswer?: boolean;
}>();

const shuffled = computed(() => {
  return Shuffle(props.question?.answers) as Answer[];
});

const selectAnswer = (answer: Answer) => {
  answer.selected = !answer.selected;
};
</script>

<template>
  <div class="space-y-8">
    <h4 class="text-lg">
      {{ question?.caption }}
    </h4>

    <div class="space-y-4">
      <div
        v-for="answer in shuffled"
        :key="answer.id"
        @click="selectAnswer(answer)"
        class="group p-4 flex justify-between items-center text-gray-600 rounded-xl border-2"
        :class="[
          showAnswer
            ? answer.is_correct
              ? 'bg-green-50 border-green-500 text-green-500'
              : 'bg-red-50 border-red-500 text-red-500'
            : [
                'hover:text-gray-700 cursor-pointer',
                answer.selected
                  ? 'border-blue-500'
                  : 'border-gray-300 hover:border-gray-500',
              ],
        ]"
      >
        <span class="first-letter:capitalize">
          {{ answer.value }}
        </span>

        <CheckCircleIcon
          v-if="showAnswer && answer.is_correct"
          class="-mr-1 -my-2 w-8 h-8 text-green-500"
        />
        <XCircleIcon
          v-else-if="showAnswer && !answer.is_correct"
          class="-mr-1 -my-2 w-8 h-8 text-red-500"
        />
        <span
          v-else
          class="w-6 h-6 rounded-full"
          :class="[
            answer.selected
              ? 'bg-blue-500'
              : 'border-2 border-gray-300 group-hover:border-gray-500',
          ]"
        />
      </div>
    </div>
  </div>
</template>
