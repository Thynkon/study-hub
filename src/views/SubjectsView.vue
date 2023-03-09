<script setup lang="ts">
import { db } from '@/firebase';
import { collection } from 'firebase/firestore';
import { ref } from 'vue';
import { useCollection } from 'vuefire';

import type Subject from '@/models/subject';

import SuccessAlert from '@/components/SuccessAlert.vue';

import SubjectCard from '@/components/SubjectCard.vue';
import New from '@/components/subjects/New.vue';
import router from '@/router';

const subjects = useCollection(collection(db, 'subjects'));

const isCreationModalOpen = ref(false);

const handleCreate = () => {
  isCreationModalOpen.value = true;
};

function closeCreateForm() {
  isCreationModalOpen.value = false;
}
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

          <button class="primary-button" @click.prevent="handleCreate">
            New
          </button>

          <New :isOpen="isCreationModalOpen" :closeModal="closeCreateForm" />
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
