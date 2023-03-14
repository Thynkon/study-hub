<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { db } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'vuefire';

import type Subject from '@/models/subject';

import SuccessAlert from '@/components/SuccessAlert.vue';

import SubjectCard from '@/components/SubjectCard.vue';
import SubjectCreationModal from '@/components/subjects/CreationModal.vue';

const subjects = useCollection(collection(db, 'subjects'));

const isCreationModalOpen = ref(false);
</script>

<template>
  <div>
    <SuccessAlert position="top right" group="subjects" />

    <div class="py-8 space-y-4">
      <!-- Action bar -->
      <div class="flex justify-end items-center">
        <div class="grow">
          <h2 class="text-4xl font-bold text-gray-900">Subjects</h2>
        </div>

        <button @click="isCreationModalOpen = true" class="btn-primary">
          New
        </button>

        <SubjectCreationModal
          :isOpen="isCreationModalOpen"
          :closeModal="() => (isCreationModalOpen = false)"
        />
      </div>

      <!-- Subjects list -->
      <div class="pt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <SubjectCard
          v-for="subject in subjects"
          :key="subject.id"
          :subject="(subject as Subject)"
          @click="router.push({ name: 'subject', params: { id: subject.id } })"
        >
        </SubjectCard>
      </div>
    </div>
  </div>
</template>
