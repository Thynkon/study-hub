<script setup lang="ts">
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

const props = defineProps<{
  id: string;
}>();

const exercise = useDocument(doc(db, 'exercises', props.id));
</script>

<template>
  <div>
    <div class="py-8 space-y-4">
      <h2 class="text-4xl font-bold text-gray-900">{{ exercise?.title }}</h2>
      <p>{{ exercise?.theory }}</p>
    </div>

    <!-- Exercises -->
    <div class="flex flex-col space-y-4">
      <!-- Actions -->
      <div class="flex justify-end items-center">
        <div class="grow">
          <h2 class="text-2xl font-bold text-gray-900">Exercises</h2>
        </div>

        <button class="btn-primary">New</button>
      </div>

      <!-- List -->
    </div>
  </div>
</template>
