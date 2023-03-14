<script setup lang="ts">
import { computed } from 'vue';

import Shuffle from '@/helpers/array';

import type Question from '@/models/question';

const props = defineProps<{
  question: Question;
}>();

const shuffled = computed(() => {
  return Shuffle(props.question?.answers);
});

const selectAnswer = (answer: any) => {
  answer.selected = !answer.selected;
};
</script>

<template>
  <div class="space-y-4">
    <h4>
      {{ question?.caption }}
    </h4>

    <div
      v-for="answer in shuffled"
      :key="answer.id"
      @click="selectAnswer(answer)"
      class="p-4 flex justify-between items-center rounded-xl border-2 cursor-pointer"
      :class="{
        'border-blue-500': answer.selected,
        'border-gray-300 group-hover:border-gray-400': !answer.selected,
      }"
    >
      <span
        class="text-gray-600 group-hover:text-gray-700 first-letter:capitalize"
      >
        {{ answer.value }}
      </span>
      <span
        class="p-3 rounded-full border-2"
        :class="{
          'bg-blue-500 border-blue-500': answer.selected,
          'border-gray-300 group-hover:border-gray-400': !answer.selected,
        }"
      />
    </div>
  </div>
</template>
