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
  <div class="w-full pt-16">
    <div class="mx-auto w-full rounded-2xl bg-white space-y-4">
      <SuccessAlert position="top right" group="subjects" />

      <div class="py-8 space-y-4">
        <!-- Action bar -->
        <div class="flex justify-end items-center">
          <div class="grow">
            <h2 class="text-2xl font-bold text-gray-900">Subjects</h2>
          </div>

          <button class="primary-button" @click="isCreationModalOpen = true">
            New
          </button>

          <SubjectCreationModal
            :isOpen="isCreationModalOpen"
            :closeModal="() => (isCreationModalOpen = false)"
          />
        </div>

        <!-- Subjects list -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <SubjectCard
            v-for="subject in subjects"
            :key="subject.id"
            :subject="(subject as Subject)"
            @click="
              router.push({ name: 'subject', params: { id: subject.id } })
            "
          >
          </SubjectCard>
        </div>
      </div>
    </div>
  </div>
</template>
