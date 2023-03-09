<script setup lang="ts">
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDocument } from 'vuefire';

import type Subject from '@/models/subject';

import SuccessAlert from '@/components/SuccessAlert.vue';

const props = defineProps<{
  id: string;
}>();

const subject = useDocument(doc(db, 'subjects', props.id));
</script>

<template>
  <div class="w-full pt-16">
    <div class="mx-auto w-full rounded-2xl bg-white space-y-4">
      <SuccessAlert position="top right" group="subjects" />

      <div>
        <h2 class="text-2xl font-bold text-gray-900">Subject</h2>
        <p>{{ subject?.name }}</p>
      </div>
    </div>
  </div>
</template>
