<script setup lang="ts">
import type Question from '@/models/question';

defineProps<{
  questions: Question[];
  currentQuestion?: Question;
}>();
</script>

<template>
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
</template>
