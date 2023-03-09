<script setup lang="ts">
import SuccessAlert from '@/components/SuccessAlert.vue';
import Edit from '@/components/exercises/Edit.vue';
import { db } from '@/firebase';
import { useExercisesStore } from '@/stores/exercises';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import { ChevronDownIcon, PencilIcon, TrashIcon } from '@heroicons/vue/20/solid';
import { collection } from 'firebase/firestore';
import { ref } from 'vue';
import { useCollection } from 'vuefire';
import ExercisesProvider from '@/providers/exercises';

type Author = {
  name: string;
  email: string;
}

type Exercise = {
  title: string;
  author: Author;
  subjects: string[];
}

function closeCreateForm() {
  isCreateForm.value = false;
}

function closeEditForm() {
  isEditForm.value = false;
}

const exercisesStore = useExercisesStore();

const handleCreate = () => {
  isCreateForm.value = true;
};

const handleEdit = (item) => {
  console.log("Setting subject to ==> ");
  console.log(item);
  exercise.value = item;
  isEditForm.value = true;
  //openModal();
};

const handleDelete = (exercise) => {
  // Delete subject from subjects collection
  ExercisesProvider.delete(exercise);
};

const exercises = ExercisesProvider.all();
const exercise = ref({} as Exercise);

const isCreateForm = ref(false);
const isEditForm = ref(false);
</script>

<template>
  <div class="w-full pt-16">
    <div class="mx-auto w-full rounded-2xl bg-white space-y-4">

      <SuccessAlert position="top right" group="subjects" />

      <div class="flex justify-end">
        <button class="primary-button" @click.prevent="handleCreate">
          Add Exercise
        </button>

        <New :isOpen="isCreateForm" :closeModal="closeCreateForm" />
      </div>

      <Disclosure v-slot="{ open }" v-for="exercise in exercises" :key="exercise.id">
        <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-black-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-black-500 focus-visible:ring-opacity-75">
          <span>{{ exercise.title }}</span>
          <ChevronDownIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-gray-500" />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-col space-y-2">
          <textarea class="border border-gray-200 p-2 rounded-lg" readonly></textarea>
          <div class="flex justify-end space-x-2">
            <PencilIcon class="h-5 w-5 cursor-pointer" @click="handleEdit(exercise)" />
            <TrashIcon class="h-5 w-5 cursor-pointer" @click="handleDelete(exercise)" />
          </div>
        </DisclosurePanel>
      </Disclosure>
      <Edit :isOpen="isEditForm" :closeModal="closeEditForm" :exercise="exercise" :key="exercise.title" />
    </div>
  </div>
</template>
