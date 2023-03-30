<script setup lang="ts">
import { db } from '@/firebase';
import router from '@/router';
import { collection } from 'firebase/firestore';
import { ref } from 'vue';
import { useCollection } from 'vuefire';

import type Subject from '@/models/subject';

import ErrorAlert from '@/components/notifications/ErrorAlert.vue';
import SuccessAlert from '@/components/notifications/SuccessAlert.vue';
import SubjectCreationModal from '@/components/subjects/CreationModal.vue';
import SubjectCard from '@/components/subjects/SubjectCard.vue';

const subjects = useCollection(collection(db, 'subjects'));

const isCreationModalOpen = ref(false);
</script>

<template>
  <div>
    <SuccessAlert position="top right" group="subjects" />
    <ErrorAlert position="top right" group="subjects" />

    <div class="py-8 space-y-4">
      <!-- Action bar -->
      <div class="flex justify-end items-center">
        <div class="grow">
          <h2>Subjects</h2>
        </div>

        <button @click="isCreationModalOpen = true" class="btn-secondary">
          New
        </button>
      </div>

      <!-- Subjects list -->
      <div
        v-if="subjects?.length > 0"
        class="pt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
      >
        <SubjectCard
          v-for="subject in subjects"
          :key="subject.id"
          :subject="(subject as Subject)"
          @click="
            router.push({ name: 'subjects.show', params: { id: subject.id } })
          "
          class="clickable-card"
        >
        </SubjectCard>
      </div>
      <div v-else>
        <p class="text-gray-500">No subjects yet.</p>
      </div>
    </div>

    <SubjectCreationModal
      :isOpen="isCreationModalOpen"
      :closeModal="() => (isCreationModalOpen = false)"
    />
  </div>
</template>
